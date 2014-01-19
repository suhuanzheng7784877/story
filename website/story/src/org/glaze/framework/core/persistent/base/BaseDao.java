package org.glaze.framework.core.persistent.base;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

/**
 * 所有dao接口的基楚类
 * 
 * @author 刘岩
 * @version 1.0
 * @param <T>泛型，指定具体vo实体的类型
 * @param <PK>
 *            主键
 */
public interface BaseDao<T extends Serializable, PK extends Serializable> {
	
	/**
	 * 获得数据源
	 * @return
	 */
	public DataSource getDataSource();
	
	/**
	 * 设置数据源
	 * @param dataSource
	 */
	public void setDataSource(DataSource dataSource);

	/**
	 * 函数说明：保存实体 增加记录
	 * 
	 * @param T
	 *            :实体
	 * @return 是否添加成功
	 */
	public abstract boolean save(T entity);

	/**
	 * 函数说明：修改实体 修改记录
	 * 
	 * @param T
	 *            :实体
	 * @return 是否更新成功
	 */
	public abstract boolean update(T entity);

	/**
	 * 按字段更新
	 * 
	 * @return
	 */
	public abstract boolean update(final Map<String, Object> map)
			throws Exception;

	/**
	 * [通过] 按实体删除
	 * 
	 * @param 主键
	 *            ：id
	 * @throws Exception
	 */
	public abstract boolean delete(PK id);

	/**
	 * 按主键加载一个实体对象
	 * 
	 * @param 主键
	 *            ：id
	 * @return 实体对象
	 */
	public abstract T findById(PK id);

	/**
	 * 按照多条件进行查询
	 */
	public List<T> findByProperty(final Map<String, Object> conditionMap);

	/**
	 * 
	 * 函数说明：分页查询所有的实体记录
	 * 
	 * @param orderBy
	 *            ：排序字段
	 * @param orderType
	 *            ：排序类型
	 * 
	 * @return 实体集合
	 */
	public abstract List<T> findAll(String orderBy, String orderType,
			final int... rowStartIdxAndCount);

	/**
	 * 强制立即更新缓冲数据到数据库（否则仅在事务提交时才更新）
	 */
	public abstract void flush();

	/**
	 * 按主键多条删除
	 * 
	 * @param ids
	 * @throws Exception
	 */
	public boolean deleteByKeys(PK[] ids) throws Exception;

	/**
	 * 函数说明：有条件条件获得实体集合
	 * 
	 * @param serchType
	 *            ：查找类型serchType[eq,LIKE]
	 * @param orderBy
	 *            :排序字段
	 * @param orderType
	 *            :排序类型
	 * @param conditionMap
	 *            :条件的HashMap
	 * @param rowStartIdxAndCount
	 *            :分页信息
	 * @return
	 */
	public List<T> findByProperty(final String serchType, final String orderBy,
			final String orderType, final Map<String, Object> conditionMap,
			final int... rowStartIdxAndCount);

	/**
	 * 利用JPQL删除记录
	 * 
	 * @param 主键
	 *            ：id
	 */
	public boolean deleteOneObjectByJPQL(final PK id);

	/**
	 * 查找所有记录
	 * 
	 * @param rowStartIdxAndCount
	 *            :分页参数
	 */
	public List<T> findAll(final int... rowStartIdxAndCount);

	/**
	 * 按照主键集合查找实体集合
	 * 
	 * @param ids
	 * @return
	 */
	public List<T> findByIds(PK[] ids);

	/**
	 * 按照主键集合查找实体集合，通过JPQL的形式 IN函数
	 * 
	 * @param ids
	 * @return
	 */
	public List<T> findByIdsForJPQL(String ids);

	/**
	 * [通过] 按实体删除
	 * 
	 * @param 主键
	 *            ：id
	 * @throws Exception
	 */
	public boolean deleteByObject(T object);

	/**
	 * 执行JPQL语句
	 * 
	 * @param jpql
	 * @return 执行结果
	 */
	public int executeUpdateJPQL(final String jpql) throws Exception;

	/**
	 * 按条件查询记录总数
	 * 
	 * @param serchType
	 * @param conditionMap
	 * @return
	 */
	public long countNumJPQL(final String serchType,
			final HashMap<String, Object> conditionMap) throws Exception;

	/**
	 * 按条件查询记录总数
	 * 
	 * @param serchType
	 * @param conditionMap
	 * @return
	 */
	@Deprecated
	public long countNumJPQL() throws Exception;

	/**
	 * 直接执行原生sql语句,update操作
	 * 
	 * @param sql
	 * @return 执行是否成功
	 */
	public boolean executiveSQLUpdate(final String sql);

	/**
	 * 直接执行原生sql语句,select操作
	 * 
	 * @param sql
	 * @return 查询结果集合
	 */
	public List<Object[]> executiveSQLSelectResultSet(final String sql);

	/**
	 * 专门查询Sum、Count语句的sql
	 * 
	 * @param sql
	 * @return
	 */
	public long executiveSQLSelectCount(final String sql);
	
	/**
	 * 专门查询Sum、Count语句的sql,预编译
	 * @param sql
	 * @param parms
	 * @return
	 */
	public long executiveSQLSelectCount(final String sql,final Object... parms);

	/**
	 * 按照JPQL语句进行查询
	 */
	public List<T> findByJPQL(final String jpql,
			final int... rowStartIdxAndCount);

	/**
	 * 无条件进行分页查询
	 */
	public List<T> findByProperty(final String orderBy, final String orderType,
			final int... rowStartIdxAndCount);

	/**
	 * 函数说明：利用jpql计算实体记录总数
	 * 
	 * @return 记录数目
	 */
	public long countNumJPQLQuick();

	/**
	 * 带有条件的count统计语句
	 * 
	 * @param serchType
	 * @param conditionMap
	 * @return
	 */
	public long countNumJPQLQuick(final String serchType,
			final Map<String, Object> conditionMap);

	/**
	 * JPA批量插入
	 * 
	 * @param list
	 * @return
	 */
	public boolean saveBatchJPA(List<T> list);

	/**
	 * SQL语句批量插入
	 */
	public boolean saveBatchSQL(final StringBuilder[] sqlBatch);

	/**
	 * 有关联的，显示在grid上的bean
	 * 
	 * @param sql
	 *            :查询关联的sql文
	 * @param sord
	 * @param sidx
	 * @param rowStartIdxAndCount
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List selectGridBean(String sql, String sord, String sidx,
			int... rowStartIdxAndCount) throws SQLException;

	/**
	 * 为了在grid中显示关联对象的记录，将进行resultset到formbean的转换
	 * 
	 * @param sql
	 * @return
	 * @throws SQLException
	 */
	public Serializable selectOneGridBean(String sql,Object id) throws SQLException;

	/**
	 * 函数说明：利用sql计算实体记录总数
	 * 
	 * @return 记录数目
	 */
	public long countNumSQLQuick(String sql);

	/**
	 * 按表名和条件删除记录
	 * 
	 * @param tableName
	 * @param conditionMap
	 * @return
	 */
	public boolean deleteData(String tableName, Map<String, Object> conditionMap);
	
	/**
	 * 使用预编译查询grid记录
	 * @param sql
	 * @param sord
	 * @param sidx
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List selectGridBeanPrepare(String sql, String sord, String sidx,
			int... rowStartIdxAndCount);
	
	/**
	 * 使用预编译查询数据
	 * @param sql语句
	 * @param 不定参数:parms
	 * @return 结果集合
	 */
	public List selectGridBeanPrepare(String sql, Object... parms);
	
	/**
	 * 构建序列化类对象
	 * 
	 * @param resultSet
	 * @return
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * @throws ClassNotFoundException
	 * @throws RuntimeException
	 */
	public List quaryGridListPrepare(String sql, Class clazz,Object... parms);
	
	/**
	 * 单独查询记录的id集合
	 * @param sql
	 * @return
	 */
	public int[] selectIntIds(final String sql);
	
	/**
	 * 函数说明：利用sql计算实体记录总数
	 * 
	 * @return 记录数目
	 */
	public long countNumSQLQuick();
	
	/**
	 * 函数说明：利用初始化后，以及定时任务更新后的表记录总数
	 * 
	 * @return 记录数目
	 */
	public long countNumCache();

}
