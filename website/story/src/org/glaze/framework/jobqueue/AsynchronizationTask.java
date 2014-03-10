package org.glaze.framework.jobqueue;

import org.glaze.framework.exception.AsynchronizationException;

/**
 * 异步任务接口
 * 
 * @author liuyan
 */
public interface AsynchronizationTask {
	
	/**
	 * 任务执行逻辑
	 * @param parameters
	 * @return
	 * @throws AsynchronizationException
	 */
	public ExecuteState execute() throws AsynchronizationException;

}
