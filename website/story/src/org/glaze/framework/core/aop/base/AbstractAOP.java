package org.glaze.framework.core.aop.base;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

/**
 * 基本aop父类
 * @author liuyan
 */
public abstract class AbstractAOP {

	public void doAfter(JoinPoint jp) {
	}
	
	/**
	 * 只是制定在方法执行过程中的一些活动
	 * @param proceedingJoinPoint
	 * @return
	 * @throws Throwable
	 */
	public Object doAround(ProceedingJoinPoint proceedingJoinPoint)
			throws Throwable {		
		String classname = proceedingJoinPoint.getTarget().getClass().getName();
		String method = proceedingJoinPoint.getSignature().getName();
		long time = System.currentTimeMillis();
		Object retVal = proceedingJoinPoint.proceed();
		time = System.currentTimeMillis() - time;
		logger(time, classname, method);

		return retVal;
	}

	protected void logger(long time, String classname, String method) {

	}

	public void doBefore(JoinPoint jp) {
	}

	public void doThrowing(JoinPoint jp, Throwable ex) {
		System.out.println("[method " + jp.getTarget().getClass().getName()
				+ "." + jp.getSignature().getName() + " throw exception");
		System.out.println(ex.getMessage());
	}

}
