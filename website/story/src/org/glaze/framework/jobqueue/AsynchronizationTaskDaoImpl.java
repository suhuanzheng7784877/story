package org.glaze.framework.jobqueue;

import java.util.Arrays;
import java.util.Map;

import org.glaze.framework.core.persistent.base.BaseDao;
import org.glaze.framework.exception.AsynchronizationException;

/**
 * dao实现下的异步任务接口
 * 
 * @author liuyan
 */
@SuppressWarnings("unchecked")
public abstract class AsynchronizationTaskDaoImpl<T extends BaseDao> implements AsynchronizationTask {
	
	/**
	 * dao
	 */
	protected T dao;
	
	/**
	 * 需要执行业务的参数[数组模式]
	 */
	protected Object[] parameters;
	
	/**
	 * 需要执行业务的参数[map模式]
	 */
	protected Map<String, Object> parameterMap;

	public Map<String, Object> getParameterMap() {
		return parameterMap;
	}

	public void setParameterMap(Map<String, Object> parameterMap) {
		this.parameterMap = parameterMap;
	}

	public Object[] getParameters() {
		return parameters;
	}

	public void setParameters(Object[] parameters) {
		this.parameters = parameters;
	}

	public T getDao() {
		return dao;
	}

	public void setDao(T dao){
		this.dao = dao;
	}
	
	/**
	 * dao执行业务逻辑
	 */
	@Override
	public abstract ExecuteState execute()
			throws AsynchronizationException ;

	@Override
	public String toString() {
		return "AsynchronizationTaskDaoImpl [dao=" + dao + ", parameterMap="
				+ parameterMap + ", parameters=" + Arrays.toString(parameters)
				+ "]";
	}

}
