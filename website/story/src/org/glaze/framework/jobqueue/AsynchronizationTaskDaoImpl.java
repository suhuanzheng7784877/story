package org.glaze.framework.jobqueue;

import java.util.Map;

import org.glaze.framework.core.persistent.base.BaseDao;
import org.glaze.framework.exception.AsynchronizationException;

/**
 * dao实现下的异步任务接口
 * 
 * @author liuyan
 */
@SuppressWarnings("unchecked")
public abstract class AsynchronizationTaskDaoImpl implements AsynchronizationTask {

	private BaseDao dao;

	public BaseDao getDao() {
		return dao;
	}

	public void setDao(BaseDao dao) {
		this.dao = dao;
	}
	
	/**
	 * dao执行业务逻辑
	 */
	@Override
	public abstract ExecuteState execute(Object... parameters)
			throws AsynchronizationException ;
	
	/**
	 * dao执行业务逻辑
	 */
	@Override
	public abstract ExecuteState execute(Map<String, Object> parameterMap)
			throws AsynchronizationException ;

}
