package org.glaze.framework.util.orm;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
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
import org.glaze.framework.util.vo.BaseVo;

import constants.SystemConstants;

/**
 * 分析JDBC的resultset的类
 * 
 * @author 刘岩
 */
public class AnalystResultSet {

	private final static Logger logger = Logger
			.getLogger(AnalystResultSet.class);

	/**
	 * 表名称大小
	 */
	private final static int initCacheTableNamesSize = 32;

	/**
	 * 同一个sql缓存的字段数组大小
	 */
	private final static int initCacheColumnNamesSize = 32;

	/**
	 * 字段转换后的setXXX方法名
	 */
	private final static int initTranslatecolumnName = initCacheColumnNamesSize * 6;

	/**
	 * 缓存实体表名
	 */
	private final static Map<String, String> tableNameMap = new ConcurrentHashMap<String, String>(
			initCacheTableNamesSize, 0.75F, 4);

	/**
	 * 利用浅度克隆对象的实例对象,key：类名+方法名，value：方法对象
	 * <p>
	 * key：sql中select和from之间的行列 value：字段描述数组
	 */
	private final static Map<String, BaseVo> instenceCloneVoMap = new ConcurrentHashMap<String, BaseVo>(
			initCacheTableNamesSize, 0.75F, 4);

	/**
	 * 缓存已经分析过的字段信息
	 * <p>
	 * key：sql中select和from之间的行列 value：字段描述数组
	 */
	private final static Map<String, String[]> cacheColumnNamesMap = new ConcurrentHashMap<String, String[]>(
			initCacheColumnNamesSize, 0.75F, 4);

	/**
	 * 转义后的字段名称缓存
	 */
	private final static Map<String, String> translatecolumnNameMap = new ConcurrentHashMap<String, String>(
			initTranslatecolumnName, 0.75F, 4);

	/**
	 * 反射对象的方法实例对象,key：类名+方法名，value：方法对象
	 * <p>
	 * key：sql中select和from之间的行列 value：字段描述数组
	 */
	private final static Map<String, Method> instenceMethodMap = new ConcurrentHashMap<String, Method>(
			initTranslatecolumnName, 0.75F, 4);

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
			Table entity = null;
			for (int i = 0; i < classAnnotationsLength; i++) {
				annotation = classAnnotations[i];
				if (annotation instanceof javax.persistence.Table) {
					entity = (Table) annotation;
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
			InvocationTargetException, NoSuchMethodException,
			CloneNotSupportedException {
		String[] columnNames = analystColumnNames(sql, resultSet);
		List instences = buildResultBeanInstence(clazz, columnNames, resultSet);
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
		String columnName1 = null;
		String columnName2 = null;
		for (int i = 1; i <= columncount; i = i + 2) {

			if (i != columncount) {
				columnName1 = resultSetMetaData.getColumnLabel(i);
				columnNames[i - 1] = columnName1;
				columnName2 = resultSetMetaData.getColumnLabel(i + 1);
				columnNames[i] = columnName2;
			} else {
				columnName1 = resultSetMetaData.getColumnLabel(i);
				columnNames[i - 1] = columnName1;
			}
			columnName1 = null;
			columnName2 = null;
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
	 * @throws CloneNotSupportedException
	 */
	@SuppressWarnings("unchecked")
	public static Object newInstence(Class clazz)
			throws ClassNotFoundException, InstantiationException,
			IllegalAccessException, CloneNotSupportedException {
		return newInstence(clazz, false);
	}

	/**
	 * 根据反射实例化对象
	 * 
	 * @param Class
	 * @throws ClassNotFoundException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * @throws CloneNotSupportedException
	 */
	@SuppressWarnings("unchecked")
	public static Object newInstence(Class clazz, boolean isCache)
			throws ClassNotFoundException, InstantiationException,
			IllegalAccessException, CloneNotSupportedException {

		if (!isCache) {
			Object instence = clazz.newInstance();
			return instence;
		}
		String className = clazz.getName();
		BaseVo object = instenceCloneVoMap.get(className);
		if (object == null) {
			BaseVo instence = (BaseVo) clazz.newInstance();
			instenceCloneVoMap.put(className, instence);
			return instence;
		} else {
			BaseVo instence = (BaseVo) object.clone();
			return instence;
		}

	}

	/**
	 * 根据反射实例化对象
	 * 
	 * @param Class
	 * @throws ClassNotFoundException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * @throws CloneNotSupportedException
	 */
	@SuppressWarnings("unchecked")
	public static Object newInstence(Class clazz, String className,
			boolean isCache) throws ClassNotFoundException,
			InstantiationException, IllegalAccessException,
			CloneNotSupportedException {

		if (!isCache) {
			Object instence = clazz.newInstance();
			return instence;
		}
		BaseVo object = instenceCloneVoMap.get(className);
		if (object == null) {
			BaseVo instence = (BaseVo) clazz.newInstance();
			instenceCloneVoMap.put(className, instence);
			return instence;
		} else {
			BaseVo instence = (BaseVo) object.clone();
			return instence;
		}

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
	 * @throws ClassNotFoundException
	 */
	@SuppressWarnings("unchecked")
	public static List buildResultBeanInstence(Class clazz,
			String[] columnNames, ResultSet resultSet)
			throws IllegalArgumentException, SecurityException,
			IllegalAccessException, InvocationTargetException, SQLException,
			InstantiationException, NoSuchMethodException,
			ClassNotFoundException, CloneNotSupportedException {

		List instences = new ArrayList(SystemConstants.searchPageSize);
		Object instence = null;
		String className = clazz.getName();
		while (resultSet.next()) {
			instence = newInstence(clazz, className, true);

			int columnNamesLength = columnNames.length;
			String columnName1 = null;
			String columnName2 = null;
			

			// 减少循环次数
			for (int i = 0; i < columnNamesLength; i = i + 2) {

				if (i == columnNamesLength - 1) {
					columnName1 = columnNames[i];
					// 执行pojo中的set方法
					setMethodInvoke(clazz, resultSet, columnName1, className,
							instence);
				} else {
					columnName1 = columnNames[i];
					columnName2 = columnNames[i + 1];
					// 执行pojo中的set方法
					setMethodInvoke(clazz, resultSet, columnName1, className,
							instence);
					setMethodInvoke(clazz, resultSet, columnName2, className,
							instence);
				}

			}
			columnName1 = null;
			columnName2 = null;

			instences.add(instence);
			instence = null;
		}
		return instences;

	}

	/**
	 * 执行pojo中的set方法
	 * 
	 * @param clazz
	 * @param resultSet
	 * @param columnName
	 * @param className
	 * @param instence
	 * @throws SQLException
	 * @throws SecurityException
	 * @throws NoSuchMethodException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 */
	@SuppressWarnings("unchecked")
	private static void setMethodInvoke(Class clazz, ResultSet resultSet,
			String columnName, String className, Object instence)
			throws SQLException, SecurityException, NoSuchMethodException,
			IllegalArgumentException, IllegalAccessException,
			InvocationTargetException {
		// 获得值
		Object value = resultSet.getObject(columnName);

		// 根据javabean属性转换的setXXX方法名
		String methodName = translatecolumnNameToSetMethod(columnName);

		String key = className + ":" + methodName;

		Method method = instenceMethodMap.get(key);

		// 方法实例，没有缓存
		if (method == null) {
			// 反射调用该方法
			if (value instanceof Integer) {
				method = clazz.getMethod(methodName, int.class);
			} else if (value instanceof Date) {
				method = clazz.getMethod(methodName, Date.class);
			} else if (value instanceof String) {
				method = clazz.getMethod(methodName, String.class);
			} else {
				method = clazz.getMethod(methodName, Object.class);
			}
			instenceMethodMap.put(key, method);
		}
		logger.debug("methodName:" + methodName + "#value:" + value);
		method.invoke(instence, value);
		key = null;
		method = null;
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
