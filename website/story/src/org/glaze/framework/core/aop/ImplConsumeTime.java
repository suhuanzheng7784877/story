package org.glaze.framework.core.aop;

import org.apache.log4j.Logger;
import org.aspectj.lang.annotation.Aspect;
import org.glaze.framework.core.aop.base.AbstractAOP;
import org.springframework.stereotype.Component;


/**
 * Controller消耗时间横切方法
 * 
 * @author liuyan
 */
@Component
@Aspect
public class ImplConsumeTime extends AbstractAOP {

	private final static Logger logger = Logger
			.getLogger(ImplConsumeTime.class);

	protected void logger(long time, String classname, String method) {
		StringBuilder sb = new StringBuilder(65);
		sb.append("【持久层:").append(classname).append(".").append(method).append(
				"执行时间为(").append(time).append(")ms】");

		logger.info(sb.toString());
	}

}
