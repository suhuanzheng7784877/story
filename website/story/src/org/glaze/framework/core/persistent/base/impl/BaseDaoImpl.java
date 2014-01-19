package org.glaze.framework.core.persistent.base.impl;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.sql.DataSource;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.log4j.Logger;
import org.glaze.framework.core.dto.TableInfo;
import org.glaze.framework.core.persistent.base.BaseDao;
import org.glaze.framework.util.GlazeArrayUtils;
import org.glaze.framework.util.PropertiesUtil;
import org.glaze.framework.util.orm.AnalystResultSet;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.orm.jpa.support.JpaDaoSupport;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import quartzjob.TableInfoCacheJobAction;
import constants.SystemConstants;

/**
 * 
 * 所有dao接口的基楚类的实现类
 * 
 * @author 刘岩
 * @version 1.0
 * @param <T>泛型，指定具体vo实体的类型
 * @param <PK>
 *            主键
 */
@SuppressWarnings("deprecation")
@Transactional(isolation = Isolation.DEFAULT)
public class BaseDaoImpl<T extends Serializable, PK extends Serializable>
		extends JpaDaoSupport implements BaseDao<T, PK> {

	/**
	 * 类型
	 */
	private Class<T> entityClass;

	private String entityClassName;

	protected DataSource dataSource;

	protected String tableName;

	public Logger logger = null;

	private final int batchSize = Integer.parseInt(PropertiesUtil
			.getValue("core.batch.size"));

	/**
	 * [通过] 无参数构造方法 根据实例类自动获取实体类类型
	 */
	@SuppressWarnings("unchecked")
	public BaseDaoImpl() {
		this.entityClass = null;
		Class c = getClass();
		Type t = c.getGenericSuperclass();
		if (t instanceof ParameterizedType) {
			Type[] p = ((ParameterizedType) t).getActualTypeArguments();
			this.entityClass = (Class<T>) p[0];
			logger = Logger.getLogger(entityClass);
			entityClassName = entityClass.getName();
			tableName = AnalystResultSet.getTableName(entityClass);
		}
	}

	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	/**
	 * [通过] 按主键延迟加载一个实体对象
	 * 
	 * @param 主键
	 *            ：id
	 * @return 实体对象
	 */
	public T findById(PK id) {

		try {

			if (id == null) {
				logger.error("PK id is null");
				return null;
			}
			T object = (T) getJpaTemplate().find(entityClass, id);
			return object;
		} catch (RuntimeException re) {
			logger.error("find failed", re);
			return null;
		}
	}

	/**
	 * 按照主键集合查找实体集合，通过JPQL的形式 IN函数
	 * 
	 * @param ids
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByIdsForJPQL(String ids) {
		try {

			if (ids == null || "".equals(ids)) {
				logger.error("ids is null");
				throw null;
			}

			// jpql 语句
			final StringBuilder queryString = new StringBuilder(100);
			queryString.append("select model from ").append(entityClassName)
					.append(" model WHERE model.id IN (").append(ids).append(
							")");

			List<T> list = getJpaTemplate().executeFind(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					Query query = em.createQuery(queryString.toString());
					return query.getResultList();
				}
			});

			logger.info("findByIdsForJPQL success");
			return list;

		} catch (RuntimeException re) {
			logger.error("find all failed", re);
			re.printStackTrace();
			throw re;
		}
	}

	/**
	 * 按照主键集合查找实体集合
	 * 
	 * @param ids
	 * @return
	 */
	public List<T> findByIds(PK[] ids) {

		if (ids == null || ids.length == 0) {
			logger.error("ids is null");
			return null;
		}

		List<T> objects = new ArrayList<T>();

		T object = null;

		for (PK id : ids) {

			object = findById(id);

			objects.add(object);

			object = null;
		}

		logger.info("findByIds success");

		return objects;
	}

	/**
	 * [通过] 按实体删除
	 * 
	 * @param 主键
	 *            ：id
	 * @throws Exception
	 */
	@Override
	public boolean delete(PK id) {

		try {

			if (id == null) {
				return false;
			}

			// 加载一个实体
			T entity = getJpaTemplate().getReference(entityClass, id);

			if (null != entity) {
				// 删除
				getJpaTemplate().remove(entity);
				logger.info("delete successful");
				return true;
			} else {
				logger.info("entity not exist");
				return false;
			}
		} catch (RuntimeException re) {
			logger.error("delete failed", re);
			re.printStackTrace();
			return false;
		}
	}

	/**
	 * [通过] 按实体删除
	 * 
	 * @param 主键
	 *            ：id
	 * @throws Exception
	 */
	@Override
	public boolean deleteByObject(T object) {

		try {

			if (object == null) {
				return false;
			}

			// 删除
			getJpaTemplate().remove(object);
			logger.info("delete successful");
			return true;
		} catch (RuntimeException re) {
			re.printStackTrace();
			logger.error("delete failed", re);
			return false;

		}
	}

	/**
	 * [通过] 按主键删除,无级联关系
	 * 
	 * @param 主键
	 *            ：id
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public boolean deleteOneObjectByJPQL(final PK id) {

		if (id == null) {
			logger.error("id is null");
			return false;
		}

		final String jpql = "DELETE " + entityClassName
				+ " model WHERE model.id = ?";
		try {
			getJpaTemplate().execute(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					Query query = em.createQuery(jpql);
					query.setParameter(1, id);
					return query.executeUpdate();
				}
			});
			logger.info("deleteOneObjectByJPQL success");

			return true;

		} catch (RuntimeException re) {
			re.printStackTrace();
			logger.error("error", re);
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	public boolean deleteOneObjectByPKsJPQL(final String ids) {

		if (ids == null) {
			logger.error("ids is null");
			return false;
		}

		final String jpql = "DELETE " + entityClassName
				+ " model WHERE model.id in (" + ids + ")";
		try {
			getJpaTemplate().execute(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					Query query = em.createQuery(jpql);
					return query.executeUpdate();
				}
			});
			logger.info("deleteOneObjectByPKsJPQL success");
			return true;
		} catch (RuntimeException re) {
			re.printStackTrace();
			logger.error("error", re);
			return false;
		}
	}

	/**
	 * [通过] 按主键多条删除
	 * 
	 * @param ids
	 * @throws Exception
	 */
	public boolean deleteByKeys(PK[] ids) throws Exception {

		if (ids == null || ids.length == 0) {
			logger.error("ids is null");
			return false;
		}
		int idsLength = ids.length;
		List<Object> entities = new ArrayList<Object>(idsLength);

		for (int i = 0; i < idsLength; i++) {
			entities.add(this.findById(ids[i]));
		}

		this.getJpaTemplate().remove(entities);

		flush();

		logger.info("deleteByKeys success");

		return true;
	}

	/**
	 * 强制立即更新缓冲数据到数据库（否则仅在事务提交时才更新）
	 */
	@Override
	public void flush() {
		getJpaTemplate().flush();

	}

	/**
	 * [通过] 函数说明：保存实体 增加记录
	 * 
	 * @param T
	 *            :实体
	 * @return 是否添加成功
	 */
	@Override
	public boolean save(T entity) {
		try {
			if (entity == null) {
				logger.error("entity is null");
				return false;
			}

			getJpaTemplate().persist(entity);

			return true;
		} catch (RuntimeException re) {
			logger.error("save failed", re);
			re.printStackTrace();
			return false;
		}
	}

	/**
	 * 批量插入
	 */
	public boolean saveBatchJPA(List<T> list) {
		try {
			if (list == null) {
				logger.error("entity list is null");
				return false;
			}

			int listSize = list.size();

			for (int i = 1; i <= listSize; i++) {
				T entity = list.get(i - 1);
				getJpaTemplate().persist(entity);
				if (0 == i % batchSize) {
					// 每满25条记录就提交到数据库
					flush();
				}
			}

			// 最后在提交一下剩下的记录
			flush();
			return true;
		} catch (RuntimeException re) {
			logger.error("save failed", re);
			re.printStackTrace();
			return false;
		}
	}

	/**
	 * 批量执行
	 */
	public boolean saveBatchSQL(final String preparedSql,
			final List<Object[]> parameterlist) {
		Connection connection = null;
		PreparedStatement pstmt = null;
		logger.info("sql:" + preparedSql);
		try {
			int resultTemp = 0;
			Object[] parameters = null;
			int parameterlistSize = parameterlist.size();
			
			connection = dataSource.getConnection();
			connection.setAutoCommit(false);
			pstmt = connection.prepareStatement(preparedSql);
			
			for (int i = 0; i < parameterlistSize; i++) {
				parameters = parameterlist.get(i);
				int parametersLength = parameters.length;
				for (int j = 0; j < parametersLength; j++) {
					pstmt.setObject(j + 1, parameters[j]);
				}
				pstmt.addBatch();
				resultTemp++;
				if (0 == resultTemp % batchSize) {
					pstmt.executeBatch();
					pstmt.clearParameters();
					pstmt.clearBatch();
				}
			}

			// 执行批处理
			pstmt.executeBatch();
			pstmt.clearParameters();
			pstmt.clearBatch();

			// 提交事务
			connection.commit();

			// 还原现场
			connection.setAutoCommit(true);
			return true;

		} catch (SQLException e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
				logger.error("sql error", e1);
			}
			e.printStackTrace();
			logger.error("sql error", e);
			return false;
		} finally {

			// 回收资源
			try {

				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}

				if (connection != null) {

					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				logger.error("sql error", e);
				return false;
			}
		}
	}

	/**
	 * 批量执行
	 */
	public boolean saveBatchSQL(final StringBuilder[] sqlBatch) {

		int sqlBatchSize = sqlBatch.length;
		Connection connection = null;
		Statement statement = null;
		try {
			int resultTemp = 0;
			String sql = null;
			connection = dataSource.getConnection();
			connection.setAutoCommit(false);
			statement = connection.createStatement();
			for (int i = 1; i <= sqlBatchSize; i++) {
				sql = sqlBatch[i - 1].toString();
				logger.info("sql:" + sql);
				statement.addBatch(sql);
				resultTemp++;
				if (0 == i % batchSize) {
					statement.executeBatch();
				}

			}

			// 执行批处理
			statement.executeBatch();
			statement.clearBatch();

			// 提交事务
			connection.commit();

			// 还原现场
			connection.setAutoCommit(true);
			if (resultTemp == sqlBatchSize) {

				return true;
			}
			return false;

		} catch (SQLException e) {

			try {
				connection.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
				logger.error("sql error", e1);
			}

			e.printStackTrace();
			logger.error("sql error", e);
			return false;
		} finally {

			// 回收资源
			try {

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {

					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				logger.error("sql error", e);
				return false;
			}
		}
	}

	/**
	 * [通过] 函数说明：修改实体 修改记录
	 * 
	 * @param T
	 *            :实体
	 * @return 是否更新成功
	 */
	@Override
	public boolean update(T entity) {
		try {

			if (entity == null) {
				logger.error("entity is null");
				return false;
			}

			getJpaTemplate().merge(entity);
			return true;
		} catch (DataAccessException dae) {
			dae.printStackTrace();
			logger.error("update failed", dae);
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("update failed", e);
			return false;
		}
	}

	/**
	 * 函数说明：利用sql计算实体记录总数
	 * 
	 * @return 记录数目
	 */
	public long countNumSQLQuick(String sql) {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		logger.info("sql:" + sql);
		try {
			connection = dataSource.getConnection();
			statement = connection.createStatement();
			resultSet = statement.executeQuery(sql);
			resultSet.next();
			long dataSum = resultSet.getLong(1);

			return dataSum;
		} catch (SQLException e) {

			e.printStackTrace();
			logger.error("sql error", e);
			return 0;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
			return 0;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				logger.error("sql error", e);
				return 0;
			}
		}

	}

	/**
	 * 函数说明：利用sql计算实体记录总数
	 * 
	 * @return 记录数目
	 */
	public long countNumSQLQuick() {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		StringBuilder sqlSB = new StringBuilder(50);
		sqlSB.append("SELECT COUNT(id) FROM ").append(tableName);
		logger.info("sql:" + sqlSB.toString());
		try {
			connection = getDataSource().getConnection();
			statement = connection.createStatement();
			resultSet = statement.executeQuery(sqlSB.toString());
			resultSet.next();
			long dataSum = resultSet.getLong(1);

			return dataSum;
		} catch (SQLException e) {

			e.printStackTrace();
			logger.error("sql error", e);
			return 0;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
			return 0;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				logger.error("sql error", e);
				return 0;
			}
		}

	}

	/**
	 * 函数说明：利用jpql计算实体记录总数
	 * 
	 * @return 记录数目
	 */
	@Override
	public long countNumJPQLQuick() {
		try {

			final String queryString = "SELECT COUNT(id) FROM "
					+ entityClassName + " model";
			long resultNum = (Long) getJpaTemplate().find(queryString).get(0);
			return resultNum;
		} catch (RuntimeException re) {
			logger.error("find all failed", re);
			throw re;
		}
	}

	/**
	 * 带有条件的count统计语句
	 * 
	 * @param serchType
	 * @param conditionMap
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public long countNumJPQLQuick(final String serchType,
			final Map<String, Object> conditionMap) {

		final StringBuilder jpql = new StringBuilder(100);
		jpql.append("select COUNT(id) from ").append(entityClassName).append(
				" model WHERE 1=1 ");

		final String serchTypeHandler;

		// 遍历hashmap
		final Set<String> keySet = conditionMap.keySet();

		// 查询类型
		if (serchType == null || "eq".equalsIgnoreCase(serchType)) {
			serchTypeHandler = "=";
		} else {
			serchTypeHandler = "LIKE";
		}

		// value的值
		Object valueObject = null;

		Iterator<String> iterators = keySet.iterator();
		String key = null;
		while (iterators.hasNext()) {

			key = iterators.next();

			jpql.append(" AND model.").append(key);

			if ("=".equalsIgnoreCase(serchTypeHandler)) {
				jpql.append(" =:").append(key);
			} else {

				valueObject = conditionMap.get(key);

				if (valueObject instanceof String && null != valueObject
						&& !"".equals(valueObject)) {
					jpql.append(" LIKE '%").append(valueObject).append("%'");
				} else if (valueObject instanceof Integer
						|| valueObject instanceof Long) {
					jpql.append(" LIKE %").append(valueObject).append("%");
				} else {
					jpql.append(" =:").append(key);
				}

				valueObject = null;

			}

		}
		try {
			long result = (Long) getJpaTemplate().executeFind(
					new JpaCallback() {
						public Object doInJpa(EntityManager em)
								throws PersistenceException {
							Query query = em.createQuery(jpql.toString());

							for (String key : keySet) {

								Object valueObject = conditionMap.get(key);

								if ("=".equalsIgnoreCase(serchTypeHandler)) {
									query.setParameter(key, valueObject);
								} else {

									continue;
								}

							}

							return query.getResultList();
						}
					}).get(0);

			return result;
		} catch (RuntimeException re) {
			logger.error("find all failed", re);
			throw re;
		}
	}

	/**
	 * 函数说明：利用jpql计算实体记录总数
	 * 
	 * @return 记录数目
	 */
	@SuppressWarnings("unchecked")
	@Override
	public long countNumJPQL() {
		try {

			final String queryString = "SELECT COUNT(model) from "
					+ entityClassName + " model";
			long result = (Long) getJpaTemplate().executeFind(
					new JpaCallback() {
						public Object doInJpa(EntityManager em)
								throws PersistenceException {
							Query query = em.createQuery(queryString);

							return query.getResultList();
						}
					}).get(0);

			return result;
		} catch (RuntimeException re) {
			logger.error("find all failed", re);
			throw re;
		}
	}

	/**
	 * 查找所有记录
	 * 
	 * @param rowStartIdxAndCount
	 *            :分页参数
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> findAll(final int... rowStartIdxAndCount) {
		try {

			// jpql 语句
			final StringBuilder queryString = new StringBuilder(100);
			queryString.append("select model from ").append(entityClassName)
					.append(" model ");
			List<T> result = getJpaTemplate().executeFind(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					Query query = em.createQuery(queryString.toString());
					if (rowStartIdxAndCount != null
							&& rowStartIdxAndCount.length > 0) {
						int rowStartIdx = Math.max(0, rowStartIdxAndCount[0]);
						if (rowStartIdx > 0) {
							query.setFirstResult(rowStartIdx);
						}

						if (rowStartIdxAndCount.length > 1) {
							int rowCount = Math.max(0, rowStartIdxAndCount[1]);
							if (rowCount > 0) {
								query.setMaxResults(rowCount);
							}
						}
					}
					return query.getResultList();
				}
			});
			return result;
		} catch (RuntimeException re) {
			logger.error("find all failed", re);
			re.printStackTrace();
			return null;
		}
	}

	/**
	 * 按字段更新
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Override
	public boolean update(final Map<String, Object> conditionMap)
			throws Exception {

		try {

			// jpql 语句
			StringBuilder jpqlTemp = new StringBuilder("UPDATE "
					+ entityClassName + " as model SET ");

			// 遍历hashmap
			final Set<String> keySet = conditionMap.keySet();

			for (String key : keySet) {

				if ("PKkey".equals(key) || "PKValue".equals(key)) {
					continue;
				}

				jpqlTemp.append(key).append("=").append(":").append(key)
						.append(",");
			}
			final StringBuilder jpql = new StringBuilder(jpqlTemp.subSequence(
					0, jpqlTemp.length() - 1));

			Object PKkey = conditionMap.get("PKkey");
			Object PKValue = conditionMap.get("PKValue");
			jpql.append(" WHERE ").append(PKkey).append("=").append(PKValue);

			return getJpaTemplate().execute(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {

					String updateSql = jpql.toString();

					logger.info("updateSql:" + updateSql);

					Query query = em.createQuery(updateSql);

					for (String key : keySet) {

						if ("PKkey".equals(key) || "PKValue".equals(key)) {
							continue;
						}

						Object valueObject = conditionMap.get(key);

						query.setParameter(key, valueObject);

					}

					int result = query.executeUpdate();

					if (result >= 0) {
						return true;
					}

					return false;
				}
			});
		} catch (RuntimeException re) {
			logger.error("find all failed", re);
			re.printStackTrace();
			return false;
		}

	}

	/**
	 * 查找所有记录
	 * 
	 * @param orderBy
	 *            :排序字段
	 * @param orderType
	 *            :排序类型
	 * 
	 * @param rowStartIdxAndCount
	 *            :分页参数
	 * 
	 *            orderBy和orderType可以为空
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> findAll(String orderBy, String orderType,
			final int... rowStartIdxAndCount) {

		final StringBuilder queryStringBuffer = new StringBuilder(150);

		if (orderBy != null && orderType != null
				&& !"".equalsIgnoreCase(orderBy)
				&& !"".equalsIgnoreCase(orderType)) {

			// jpql 语句
			queryStringBuffer.append("select model from ").append(
					entityClassName).append(" model ORDER BY model.").append(
					orderBy).append(" ").append(orderType);

		} else {

			// jpql 语句
			queryStringBuffer.append("select model from ").append(
					entityClass.getName()).append(" model ");
		}
		try {
			List<T> list = getJpaTemplate().executeFind(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					String jpql = queryStringBuffer.toString();
					logger.info("jpql:" + jpql);

					Query query = em.createQuery(jpql);
					if (rowStartIdxAndCount != null
							&& rowStartIdxAndCount.length > 0) {
						int rowStartIdx = Math.max(0, rowStartIdxAndCount[0]);
						if (rowStartIdx > 0) {
							query.setFirstResult(rowStartIdx);
						}

						if (rowStartIdxAndCount.length > 1) {
							int rowCount = Math.max(0, rowStartIdxAndCount[1]);
							if (rowCount > 0) {
								query.setMaxResults(rowCount);
							}
						}
					}
					return query.getResultList();
				}
			});
			return list;
		} catch (RuntimeException re) {
			logger.error("find all failed", re);
			re.printStackTrace();
			return null;
		}
	}

	/**
	 * 按照JPQL语句进行查询
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> findByJPQL(final String jpql,
			final int... rowStartIdxAndCount) {
		try {
			List<T> list = getJpaTemplate().executeFind(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					logger.info("jpql:" + jpql);
					Query query = em.createQuery(jpql);

					if (rowStartIdxAndCount != null
							&& rowStartIdxAndCount.length > 0) {

						// 有分页
						int rowStartIdx = Math.max(0, rowStartIdxAndCount[0]);

						// 开始页
						if (rowStartIdx > 0) {
							query.setFirstResult(rowStartIdx);
						}

						// 一页最大记录数目
						if (rowStartIdxAndCount.length > 1) {
							int rowCount = Math.max(0, rowStartIdxAndCount[1]);
							if (rowCount > 0) {
								query.setMaxResults(rowCount);
							}
						}
					}
					return query.getResultList();
				}
			});
			return list;
		} catch (RuntimeException re) {
			logger.error("find by property name failed", re);
			re.printStackTrace();
			throw null;
		}
	}

	/**
	 * 按照多条件进行查询
	 */
	@Override
	public List<T> findByProperty(final Map<String, Object> conditionMap) {
		return findByProperty(null, null, null, conditionMap, null);
	}

	/**
	 * 无条件进行分页查询
	 */
	@Override
	public List<T> findByProperty(final String orderBy, final String orderType,
			final int... rowStartIdxAndCount) {
		return findByProperty(null, orderBy, orderType, null,
				rowStartIdxAndCount);
	}

	/**
	 * 按照多条件进行查询
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> findByProperty(final String serchType, final String orderBy,
			final String orderType, final Map<String, Object> conditionMap,
			final int... rowStartIdxAndCount) {

		// 初始条件的jpql
		final StringBuilder jpql = new StringBuilder(160);
		jpql.append("SELECT model FROM ").append(entityClassName).append(
				" model ");

		if (null == conditionMap) {// 无条件

			// 无条件

			// 排序
			if (null != orderType && null != orderBy) {
				jpql.append(" ORDER BY model.").append(orderBy).append(" ")
						.append(orderType);
			}

			List<T> list = getJpaTemplate().executeFind(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					String jpqlString = jpql.toString();
					logger.info("jpql:" + jpqlString);

					Query query = em.createQuery(jpqlString);

					if (rowStartIdxAndCount != null
							&& rowStartIdxAndCount.length == 2) {

						// 有分页
						int rowStartIdx = Math.max(0, rowStartIdxAndCount[0]);

						// 一页最大记录数目
						int rowCount = Math.max(0, rowStartIdxAndCount[1]);

						// 开始页
						if (rowStartIdx > 0) {
							query.setFirstResult(rowStartIdx);
						}

						// 一页最大记录数目
						if (rowCount > 0) {
							query.setMaxResults(rowCount);
						}
					}

					// 获取记录
					return query.getResultList();
				}
			});
			return list;
		} else {
			jpql.append(" WHERE 1=1 ");

			final String serchTypeHandler;

			// 遍历map(不一定是hashmap，有可能是treemap)
			final Set<String> keySet = conditionMap.keySet();

			// 查询类型
			if (serchType == null || "eq".equalsIgnoreCase(serchType)) {
				serchTypeHandler = "=";
			} else {
				serchTypeHandler = "LIKE";
			}

			// value的值
			Object valueObject = null;

			Iterator<String> iterators = keySet.iterator();

			String key = null;
			while (iterators.hasNext()) {
				key = iterators.next();
				jpql.append(" AND model.").append(key);

				if ("=".equalsIgnoreCase(serchTypeHandler)) {
					jpql.append(" =:").append(key);
				} else {

					valueObject = conditionMap.get(key);

					if (valueObject instanceof String) {
						jpql.append(" LIKE '%").append(valueObject)
								.append("%'");
					} else if (valueObject instanceof Integer
							|| valueObject instanceof Long) {
						jpql.append(" LIKE %").append(valueObject).append("%");
					} else {
						jpql.append(" =:").append(key);
					}

					valueObject = null;

				}

			}

			// 排序
			if (null != orderType && null != orderBy) {
				jpql.append(" ORDER BY model.").append(orderBy).append(" ")
						.append(orderType);
			}

			try {

				List<T> list = getJpaTemplate().executeFind(new JpaCallback() {
					public Object doInJpa(EntityManager em)
							throws PersistenceException {
						String jpqlString = jpql.toString();
						logger.info("jpql:" + jpqlString);
						Query query = em.createQuery(jpqlString);

						Iterator<String> keyIterators = keySet.iterator();
						String keyIterator = null;
						Object valueObject = null;
						while (keyIterators.hasNext()) {

							keyIterator = keyIterators.next();

							valueObject = conditionMap.get(keyIterator);

							if ("=".equalsIgnoreCase(serchTypeHandler)) {
								query.setParameter(keyIterator, valueObject);
							} else {

								continue;
							}

						}

						if (rowStartIdxAndCount != null
								&& rowStartIdxAndCount.length == 2) {

							// 有分页
							int rowStartIdx = Math.max(0,
									rowStartIdxAndCount[0]);

							// 开始页
							if (rowStartIdx > 0) {
								query.setFirstResult(rowStartIdx);
							}

							// 一页最大记录数目
							int rowCount = Math.max(0, rowStartIdxAndCount[1]);
							if (rowCount > 0) {
								query.setMaxResults(rowCount);
							}

						}
						return query.getResultList();
					}
				});
				return list;
			} catch (RuntimeException re) {
				logger.error("find by property name failed", re);
				re.printStackTrace();
				throw null;
			}

		}

	}

	/**
	 * 执行JPQL语句
	 * 
	 * @param jpql
	 */
	@SuppressWarnings("unchecked")
	public int executeUpdateJPQL(final String jpql) {
		try {

			if (jpql == null || "".equals(jpql)) {
				logger.error("jpql is null");
				return 0;
			}

			logger.info("jpql:" + jpql);

			return (Integer) getJpaTemplate().execute(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {
					Query query = em.createQuery(jpql);
					return query.executeUpdate();
				}
			});
		} catch (RuntimeException re) {
			logger.error("executeUpdateJPQL failed", re);
			re.printStackTrace();
			return 0;
		}
	}

	/**
	 * 不推荐使用
	 */
	@SuppressWarnings("unchecked")
	@Override
	@Deprecated
	public long countNumJPQL(final String serchType,
			final HashMap<String, Object> conditionMap) throws Exception {

		// 初始条件的jpql
		final StringBuilder jpql = new StringBuilder("SELECT model FROM ")
				.append(entityClassName).append(" model WHERE 1=1 ");

		// 遍历hashmap
		final Set<String> keySet = conditionMap.keySet();

		final StringBuffer serchTypeHandler = new StringBuffer("");

		// 查询类型
		if (serchType == null || "eq".equalsIgnoreCase(serchType)) {
			serchTypeHandler.append("=");
		} else {
			serchTypeHandler.append("LIKE");
		}

		// value的值
		Object valueObject = null;

		for (String key : keySet) {

			jpql.append(" AND model.").append(key);

			if ("=".equalsIgnoreCase(serchTypeHandler.toString())) {
				jpql.append(" =:").append(key);
			} else {

				valueObject = conditionMap.get(key);

				if (valueObject instanceof String) {
					jpql.append(" LIKE '%").append(valueObject).append("%'");
				} else if (valueObject instanceof Integer
						|| valueObject instanceof Long) {
					jpql.append(" LIKE %").append(valueObject).append("%");
				} else {
					jpql.append(" =:").append(key);
				}

				valueObject = null;

			}

		}

		try {

			return (Long) getJpaTemplate().execute(new JpaCallback() {
				public Object doInJpa(EntityManager em)
						throws PersistenceException {

					Query query = em.createQuery(jpql.toString());

					for (String key : keySet) {

						Object valueObject = conditionMap.get(key);

						if ("=".equalsIgnoreCase(serchTypeHandler.toString())) {
							query.setParameter(key, valueObject);
						} else {

							// query.setParameter(key, "'%"+valueObject+"%'");
							continue;
						}

					}

					return query.getResultList().get(0);
				}
			});
		} catch (RuntimeException re) {
			logger.error("find by property name failed", re);
			throw re;
		}
	}

	public boolean executiveSQLUpdate(final String sql) {
		logger.info("sql:" + sql);

		Connection connection = null;
		Statement statement = null;
		int result = 0;

		try {
			connection = dataSource.getConnection();
			statement = connection.createStatement();
			result = statement.executeUpdate(sql);

			if (result >= 0) {
				return true;
			}
			return false;

		} catch (SQLException e) {

			try {
				connection.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
				logger.error("sql error", e1);
			}

			e.printStackTrace();
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			try {

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		}

	}

	@SuppressWarnings("unchecked")
	public List<Object[]> executiveSQLSelectResultSet(final String sql) {

		List<Object[]> result = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				logger.info("sql:" + sql);
				Query query = em.createNativeQuery(sql);
				List<Object[]> result = query.getResultList();
				return result;
			}
		});

		return result;
	}

	/**
	 * 单独查询记录的id集合
	 * 
	 * @param sql
	 * @return
	 */
	public int[] selectIntIds(final String sql) {
		logger.info("sql:" + sql);

		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;

		int[] ids = new int[SystemConstants.BigArrayInitSize];

		try {
			connection = dataSource.getConnection();
			statement = connection.createStatement();
			resultSet = statement.executeQuery(sql);
			int i = 0;
			while (resultSet.next()) {

				// 原始数组是否要扩容
				ids = GlazeArrayUtils.ensureCapacity(ids, i);
				ids[i] = resultSet.getInt(1);
				i++;

			}

			return ArrayUtils.subarray(ids, 0, i);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
		}

	}

	public long executiveSQLSelectCount(final String sql, final Object... parms) {

		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		logger.info("sql:" + sql);
		int length = parms.length;
		try {
			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);
			
			for (int i = 0; i < length; i++) {
				statement.setObject(i + 1, parms[i]);
			}

			resultSet = statement.executeQuery();
			if (resultSet.next()) {
				return resultSet.getLong(1);
			}

			return 0L;
		} catch (SQLException e) {

			e.printStackTrace();
			return 0L;
		} catch (Exception e) {
			e.printStackTrace();
			return 0L;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return 0L;
			}
		}
	}

	public long executiveSQLSelectCount(final String sql) {

		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		logger.info("sql:" + sql);
		try {
			connection = dataSource.getConnection();
			statement = connection.createStatement();
			resultSet = statement.executeQuery(sql);
			if (resultSet.next()) {
				return resultSet.getLong(1);
			}

			return 0L;
		} catch (SQLException e) {

			e.printStackTrace();
			return 0L;
		} catch (Exception e) {
			e.printStackTrace();
			return 0L;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return 0L;
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List selectGridBeanPrepare(String sql, Object... parms) {

		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		logger.info("sql:" + sql);
		int length = parms.length;
		try {

			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);
			for (int i = 0; i < length; i++) {
				statement.setObject(i + 1, parms[i]);
			}

			resultSet = statement.executeQuery();

			List list = new ArrayList();

			buildSerializable(resultSet, list);
			return list;
		} catch (SQLException e) {

			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List selectGridBeanPrepare(String sql, String sord, String sidx,
			int... rowStartIdxAndCount) {
		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		logger.info("sql:" + sql);
		try {

			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);

			statement.setObject(1, rowStartIdxAndCount[0]);
			statement.setObject(2, rowStartIdxAndCount[1]);

			resultSet = statement.executeQuery();

			List list = new ArrayList(rowStartIdxAndCount[1]);

			buildSerializable(resultSet, list);
			return list;
		} catch (SQLException e) {

			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List selectGridBean(String sql, String sord, String sidx,
			int... rowStartIdxAndCount) {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		logger.info("sql:" + sql);
		try {

			connection = dataSource.getConnection();
			statement = connection.createStatement();
			resultSet = statement.executeQuery(sql);

			List list = new ArrayList(rowStartIdxAndCount[1]);

			buildSerializable(resultSet, list);
			return list;
		} catch (SQLException e) {

			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
		}

	}

	@Override
	public Serializable selectOneGridBean(String sql, Object id) {
		Connection connection = null;
		PreparedStatement pstmt = null;
		ResultSet resultSet = null;
		logger.info("sql:" + sql);
		try {
			connection = dataSource.getConnection();
			pstmt = connection.prepareStatement(sql);
			pstmt.setObject(1, id);
			resultSet = pstmt.executeQuery();

			Serializable serializable = buildSerializable(resultSet);
			return serializable;
		} catch (SQLException e) {

			e.printStackTrace();
			logger.error("sqlexception", e);
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("exception", e);
			return null;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				logger.error("sqlexception", e);
				return null;
			}
		}

	}

	/**
	 * 构建序列化类对象
	 * 
	 * @param resultSet
	 * @return
	 */
	@SuppressWarnings("unchecked")
	protected void buildSerializable(ResultSet resultSet, List list)
			throws SQLException {

	}

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
	@SuppressWarnings("unchecked")
	public List quaryGridListPrepare(String sql, Class clazz, Object... parms) {
		logger.info("sql:" + sql);
		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet resultSet = null;
		int length = parms.length;
		try {
			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);
			for (int i = 0; i < length; i=i+2) {
				
				if(i==length-1){
					statement.setObject(i + 1, parms[i]);
				}else{
					statement.setObject(i + 1, parms[i]);
					statement.setObject(i + 2, parms[i+1]);
				}
				
				
			}
			resultSet = statement.executeQuery();
			List list = AnalystResultSet.getBeans(sql, clazz, resultSet);
			return list;
		} catch (SQLException e) {

			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (RuntimeException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (InstantiationException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				logger.error("error", e);
				return null;
			}
		}
	}

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
	@SuppressWarnings("unchecked")
	protected List quaryGridList(String sql, Class clazz) {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		try {
			logger.info("sql:" + sql);
			connection = dataSource.getConnection();
			statement = connection.createStatement();
			resultSet = statement.executeQuery(sql);
			List list = AnalystResultSet.getBeans(sql, clazz, resultSet);
			return list;
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (RuntimeException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (InstantiationException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				logger.error("error", e);
				return null;
			}
		}

	}

	/**
	 * 构建序列化类对象
	 * 
	 * @param resultSet
	 * @return
	 */
	protected Serializable buildSerializable(ResultSet resultSet)
			throws SQLException {
		return null;
	}

	/**
	 * 拼装多关联按条件查询的sql语句
	 */
	protected void buildSearchSQL(String serchType, StringBuilder sql,
			Map<String, Object> conditionMap, String sord, String sidx,
			int... rowStartIdxAndCount) {
		Set<String> keySet = conditionMap.keySet();
		String serchTypeHandler = null;
		if (serchType == null || "eq".equalsIgnoreCase(serchType)) {
			serchTypeHandler = "=";
		} else {
			serchTypeHandler = "LIKE";
		}
		Object valueObject = null;

		Iterator<String> iterators = keySet.iterator();
		String key = null;
		while (iterators.hasNext()) {
			key = iterators.next();
			valueObject = conditionMap.get(key);

			sql.append("AND ").append(key);

			if ("LIKE".equals(serchTypeHandler)) {
				// 模糊查询
				if (valueObject instanceof String && null != valueObject
						&& !"".equals(valueObject)) {
					sql.append(" " + serchTypeHandler + " '%").append(
							valueObject).append("%'");
				} else if (valueObject instanceof Integer
						|| valueObject instanceof Long) {
					sql.append(" " + serchTypeHandler + " %").append(
							valueObject).append("%");
				} else {
					sql.append(valueObject);
				}
			} else {

				// 精确查询
				if (valueObject instanceof String && null != valueObject
						&& !"".equals(valueObject)) {
					sql.append(" " + serchTypeHandler + " '").append(
							valueObject).append("'");
				} else if (valueObject instanceof Integer
						|| valueObject instanceof Long) {
					sql.append(" " + serchTypeHandler).append(valueObject);
				} else {
					sql.append(valueObject);
				}
			}

		}

		sql.append(" ORDER BY ");
		sql.append(sidx).append(" ").append(sord).append(" LIMIT ");
		sql.append(rowStartIdxAndCount[0]).append(",").append(
				rowStartIdxAndCount[1]);

	}

	/**
	 * 拼装多关联按条件查询的sql语句
	 */
	protected void buildSearchCountSQL(String serchType, StringBuilder sql,
			Map<String, Object> conditionMap) {

		Set<String> keySet = conditionMap.keySet();
		String serchTypeHandler = null;
		if (serchType == null || "eq".equalsIgnoreCase(serchType)) {
			serchTypeHandler = "=";
		} else {
			serchTypeHandler = "LIKE";
		}
		Object valueObject = null;
		Iterator<String> iterators = keySet.iterator();
		String key = null;
		while (iterators.hasNext()) {
			key = iterators.next();
			valueObject = conditionMap.get(key);

			sql.append("AND ").append(key);

			if ("LIKE".equals(serchTypeHandler)) {
				// 模糊查询
				if (valueObject instanceof String && null != valueObject
						&& !"".equals(valueObject)) {
					sql.append(" " + serchTypeHandler + " '%").append(
							valueObject).append("%'");
				} else {
					sql.append(" " + serchTypeHandler + " %").append(
							valueObject).append("%");
				}
			} else {

				// 精确查询
				if (valueObject instanceof String && null != valueObject
						&& !"".equals(valueObject)) {
					sql.append(" " + serchTypeHandler + " '").append(
							valueObject).append("'");
				} else {
					sql.append(" " + serchTypeHandler).append(valueObject);
				}
			}

		}
	}

	@Override
	public boolean deleteData(String tableName, Map<String, Object> conditionMap) {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;

		StringBuilder sql = new StringBuilder(128);

		sql.append("DELETE FROM ").append(tableName);

		if (conditionMap != null) {

			sql.append(" WHERE 1=1 ");

			Set<String> keySet = conditionMap.keySet();

			Object valueObject = null;
			Iterator<String> iterators = keySet.iterator();
			String key = null;
			while (iterators.hasNext()) {
				key = iterators.next();
				sql.append(" AND ").append(key);
				valueObject = conditionMap.get(key);
				// 精确查询
				if (valueObject instanceof String && null != valueObject
						&& !"".equals(valueObject)) {
					sql.append(" = '").append(valueObject).append("'");
				} else {
					sql.append(" =").append(valueObject);
				}
			}
		}

		try {
			connection = dataSource.getConnection();
			statement = connection.createStatement();
			logger.info("sql:" + sql.toString());
			int sum = statement.executeUpdate(sql.toString());

			if (sum >= 0) {
				return true;
			}

			return false;
		} catch (SQLException e) {

			try {
				connection.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
				logger.error("sql error", e1);
			}

			e.printStackTrace();
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			try {

				if (resultSet != null) {
					resultSet.close();
					resultSet = null;
				}

				if (statement != null) {
					statement.close();
					statement = null;
				}

				if (connection != null) {
					connection.close();
					connection = null;
				}

			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		}

	}
	
	/**
	 * 函数说明：利用初始化后，以及定时任务更新后的表记录总数
	 * 
	 * @return 记录数目
	 */
	@Override
	public long countNumCache() {
		
		TableInfo tableInfo = TableInfoCacheJobAction.getTableinfocache().get(tableName);
		
		if(null == tableInfo){
			return 0;
		}
		
		return tableInfo.getDatacount();
	}

}
