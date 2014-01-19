package org.glaze.framework.util.orm;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.persistence.Table;

import org.apache.log4j.Logger;
import org.glaze.framework.util.StringUtil;
import org.glaze.framework.util.orm.reflect.Setter;
import org.glaze.framework.util.vo.BaseVo;

import constants.SystemConstants;

/**
 * 分析JDBC的resultset的类
 * 
 * @author 刘岩
 */
public class InvokerAnalystResultSet {

	private final static Logger logger = Logger
			.getLogger(InvokerAnalystResultSet.class);

	// 表名称
	private final static int tableNamesSize = 32;

	// 同一个sql缓存的字段数组
	private final static int cacheColumnNamesSize = 32;

	// 字段转换后的setXXX方法名
	private final static int translatecolumnName = cacheColumnNamesSize * 6;

	/**
	 * 缓存实体表名
	 */
	private final static Map<String, String> tableNameMap = new ConcurrentHashMap<String, String>(
			tableNamesSize, 0.75F);

	/**
	 * 缓存已经反射过的字段信息
	 * <p>
	 * key：sql中select和from之间的行列 value：字段描述数组
	 */
	private final static Map<String, String[]> cacheColumnNamesMap = new ConcurrentHashMap<String, String[]>(
			cacheColumnNamesSize, 0.75F);

	private final static Map<String, String> translatecolumnNameMap = new ConcurrentHashMap<String, String>(
			translatecolumnName, 0.75F);

	final static Map<String, BaseVo> cloneInstanceMap = new ConcurrentHashMap<String, BaseVo>(
			tableNamesSize, 0.75F);

	final static Map<String, Setter> setterInstanceMap = new ConcurrentHashMap<String, Setter>(
			translatecolumnName, 0.75F);

	/**
	 * 获取实体的表名，实体具有JPA的Table注解
	 * 
	 * @param po
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static String getTableName(Class entityClass) {

		// 类名
		String className = entityClass.getName();
		logger.info("className:" + className);
		// 使用缓存
		if (tableNameMap.containsKey(className)) {
			logger.info("使用缓存中的表名分析结果:" + className);
			return (String) tableNameMap.get(className);
		} else {

			// 分析注解
			Annotation[] classAnnotations = entityClass.getAnnotations();
			String tableName = null;
			int classAnnotationsLength = classAnnotations.length;
			Annotation annotation = null;
			for (int i = 0; i < classAnnotationsLength; i++) {
				annotation = classAnnotations[i];
				if (annotation instanceof javax.persistence.Table) {
					Table entity = (Table) annotation;
					tableName = entity.name();
					break;
				}
			}
			logger.debug("分析表名结果:" + tableName);
			tableNameMap.put(className, tableName);

			return tableName;
		}
	}

	/**
	 * 根据结果集构建结果元素集合元素
	 * 
	 * @param resultSet
	 * @return
	 * @throws SQLException
	 * @throws RuntimeException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * @throws ClassNotFoundException
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws CloneNotSupportedException
	 */
	@SuppressWarnings("unchecked")
	public static List getBeans(String sql, Class clazz, ResultSet resultSet)
			throws RuntimeException, SQLException, ClassNotFoundException,
			InstantiationException, IllegalAccessException,
			InvocationTargetException, NoSuchMethodException
			 {

		long start1 = System.currentTimeMillis();

		String[] columnNames = analystColumnNames(sql, resultSet);
		List instences;
		try {
			instences = buildResultBeanInstence(clazz, columnNames, resultSet);
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			return null;
		}

		long end1 = System.currentTimeMillis();

		System.out.println("invoker.getBeans方法执行耗时：" + (end1 - start1) + "ms");

		return instences;
	}

	/**
	 * 分析resultset的元数据
	 * 
	 * @param resultSet
	 * @return
	 * @throws RuntimeException
	 * @throws SQLException
	 */
	public static String[] analystColumnNames(String sql, ResultSet resultSet)
			throws RuntimeException, SQLException {

		if (null == resultSet) {
			throw new RuntimeException("resultSet is null");
		}

		// 做切割后的sql
		String selectfromSQL = StringUtil.analystSqlField(sql);

		String[] valueArray = cacheColumnNamesMap.get(selectfromSQL);
		if (valueArray != null) {
			logger.debug("使用缓存中的分析结果");
			return valueArray;
		}
		logger.debug("第一次分析");
		ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
		int columncount = resultSetMetaData.getColumnCount();
		logger.info(columncount);
		if (columncount < 1) {
			throw new RuntimeException("columncount < 1");
		}
		String[] columnNames = new String[columncount];
		for (int i = 1; i <= columncount; i++) {
			String columnName = resultSetMetaData.getColumnLabel(i);
			columnNames[i - 1] = columnName;
		}
		cacheColumnNamesMap.put(selectfromSQL, columnNames);
		return columnNames;
	}

	/**
	 * 根据反射实例化对象
	 * 
	 * @param Class
	 * @throws ClassNotFoundException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	@SuppressWarnings("unchecked")
	public static Object newInstence(Class clazz)
			throws ClassNotFoundException, InstantiationException,
			IllegalAccessException {
		Object instence = clazz.newInstance();
		return instence;
	}

	/**
	 * 构建List里面的对象元素实例
	 * 
	 * @param clazz
	 * @param columnNames
	 * @param instence
	 * @param resultSet
	 * @throws IllegalArgumentException
	 * @throws SecurityException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 * @throws NoSuchMethodException
	 * @throws SQLException
	 * @throws InstantiationException
	 * @throws CloneNotSupportedException
	 */
	@SuppressWarnings("unchecked")
	public static List buildResultBeanInstence(Class clazz,
			String[] columnNames, ResultSet resultSet)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException, SQLException,
			InstantiationException, NoSuchMethodException,
			CloneNotSupportedException {
		String methodName = null;
		Object value = null;

		List instences = new ArrayList(SystemConstants.searchPageSize);

		// 类名
		String className = clazz.getName();
		BaseVo sourceInstence = null;
		while (resultSet.next()) {

			sourceInstence = cloneInstanceMap.get(className);
			if (sourceInstence == null) {

				// 没有的话，则克隆
				BaseVo instence = (BaseVo) clazz.newInstance();
				cloneInstanceMap.put(className, instence);
				sourceInstence = (BaseVo) instence.clone();
			}
			Setter setter = null;
			for (String columnName : columnNames) {

				// 获得值
				value = resultSet.getObject(columnName);

				// 根据javabean属性转换的setXXX方法名
				methodName = translatecolumnNameToSetMethod(columnName);

				String key = className + ":" + methodName;
				setter = setterInstanceMap.get(key);
				if (setter == null) {
					// 反射调用该方法
					if (value instanceof Integer) {
						setter = Invokers.newInvoker(Setter.class, clazz,
								methodName, new Class<?>[] { int.class }, null);
					} else if (value instanceof Date) {
						setter = Invokers
								.newInvoker(Setter.class, clazz, methodName,
										new Class<?>[] { Date.class }, null);

					} else if (value instanceof String) {
						setter = Invokers.newInvoker(Setter.class, clazz,
								methodName, new Class<?>[] { String.class },
								null);
					} else {
						setter = Invokers.newInvoker(Setter.class, clazz,
								methodName, new Class<?>[] { Object.class },
								null);
					}
					setterInstanceMap.put(key, setter);
				}

				logger.debug("setter:" + methodName + "#value:" + value);
				setter.set(sourceInstence, value);
			}
			instences.add(sourceInstence);
			sourceInstence = null;
		}
		return instences;

	}

	/**
	 * sql查询出的属性转换成javabean的方法
	 * 
	 * @param columnName
	 * @return
	 */
	public static String translatecolumnNameToSetMethod(String columnName) {

		if (columnName == null || "".equals(columnName)) {
			throw new RuntimeException("columnName is null;");
		}

		String translateMethod = translatecolumnNameMap.get(columnName);

		if (translateMethod != null) {
			return translateMethod;
		}

		StringBuilder sb = new StringBuilder(20);
		String columnNametranslate = columnName.replaceFirst(columnName
				.substring(0, 1), columnName.substring(0, 1).toUpperCase());
		sb.append("set").append(columnNametranslate);
		translateMethod = sb.toString();
		translatecolumnNameMap.put(columnName, translateMethod);
		return translateMethod;
	}

}
