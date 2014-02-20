package org.glaze.framework.jobqueue;

import org.junit.Test;

public class TestAsynchronizationTaskEngine {
	
	@Test
	public void test001(){

		
		System.out.println("1");
		AsynchronizationTaskEngine asynchronizationTaskEngine = AsynchronizationTaskEngine
				.getInstence();
		System.out.println("2");
		
		
		AsynchronizationTaskEngine.getInstence().initAsynchronizationTaskEngineThread();
		System.out.println("3");
		R r1 = new R(AsynchronizationTaskEngine.getInstence());
		R r2 = new R(AsynchronizationTaskEngine.getInstence());
		R r3 = new R(AsynchronizationTaskEngine.getInstence());
		
		r1.start();
		r2.start();
		r3.start();
		

		while (true) {
			try {
				Thread.currentThread().sleep(Integer.MAX_VALUE);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	
	}

}
class R extends Thread {

	private AsynchronizationTaskEngine asynchronizationTaskEngine;

	public R(AsynchronizationTaskEngine asynchronizationTaskEngine) {
		this.asynchronizationTaskEngine = asynchronizationTaskEngine;
	}

	@Override
	public void run() {
		AsynchronizationTask asynchronizationTask = new AsynchronizationTaskSimpleImpl();
		try {
			asynchronizationTaskEngine.submitTask(asynchronizationTask);
			Thread.sleep(6000L);
			asynchronizationTaskEngine.submitTask(asynchronizationTask);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}