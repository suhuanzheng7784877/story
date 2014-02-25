package org.glaze.framework.jobqueue;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

import org.glaze.framework.exception.AsynchronizationException;

/**
 * 异步任务执行引擎
 * 
 * @author liuyan
 */
public class AsynchronizationTaskEngine implements Runnable {

	/**
	 * 任务队列
	 */
	protected final BlockingQueue<AsynchronizationTask> taskBlockingQueue = new LinkedBlockingQueue<AsynchronizationTask>();

	/**
	 * 单例
	 */
	private final static AsynchronizationTaskEngine asynchronizationTaskEngine = new AsynchronizationTaskEngine();
	
	/**
	 * 线程池
	 */
	private final ExecutorService pool = Executors.newFixedThreadPool(1);
	
	/**
	 * 获取单例实例
	 * 
	 * @return AsynchronizationTaskEngine
	 */
	public static AsynchronizationTaskEngine getInstence() {
		return asynchronizationTaskEngine;
	}
	
	/**
	 * 启动异步消费线程
	 */
	public void initAsynchronizationTaskEngineThread(){
		pool.execute(this);
		
	}

	@Override
	public void run() {
		try {

			// 开始消费异步任务,整个任务处理的入口
			startAsynchronizationTaskReciver();
		} catch (AsynchronizationException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 提交异步任务
	 * 
	 * @param asynchronizationTask
	 * @return boolean
	 * @throws InterruptedException
	 */
	public void submitTask(AsynchronizationTask asynchronizationTask) throws InterruptedException {
		taskBlockingQueue.put(asynchronizationTask);
	}

	/**
	 * 开始消费异步任务,整个任务处理的入口
	 * 
	 * @throws AsynchronizationException
	 */
	private void startAsynchronizationTaskReciver()
			throws AsynchronizationException {
		AsynchronizationTask asynchronizationTask = null;
		ExecuteState executeState = null;
		while (true) {
			try {
				
				// 若没有任何元素则发生阻塞
				asynchronizationTask = taskBlockingQueue.take();
				
				System.out.println("--------"+asynchronizationTask);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			//进行执行逻辑
			executeState = this.execute(asynchronizationTask);
			
			//对执行结果进行最后的处理，成功失败与否.
			handleExecuteState(executeState);
		}
	}

	/**
	 * 处理最后的执行结果
	 * 
	 * @param executeState
	 * @return
	 */
	private boolean handleExecuteState(ExecuteState executeState) {
		return executeState.handle();
	}

	/**
	 * 任务执行逻辑
	 * 
	 * @return ExecuteState
	 * @throws AsynchronizationException
	 */
	private ExecuteState execute(AsynchronizationTask asynchronizationTask,Object... parameters)
			throws AsynchronizationException {
		return asynchronizationTask.execute(parameters);
	}

}
