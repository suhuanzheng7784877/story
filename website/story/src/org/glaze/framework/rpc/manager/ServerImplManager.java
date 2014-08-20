package org.glaze.framework.rpc.manager;

import java.util.Map;

import org.glaze.framework.rpc.annotation.ServerImpl;
import org.springframework.context.ApplicationContext;

/**
 * 
 * @Title: ServerImplScanner.java
 * @Package org.glaze.framework.rpc
 * @Description: 实现类服务管理
 * @author 刘岩
 * @date 2014-8-20 下午04:27:10
 * @version V 1.0
 */
public class ServerImplManager {

	private ApplicationContext springApplicationContext = null;

	private volatile Map<String, Object> serverImplMap = null;

	public ServerImplManager(ApplicationContext springApplicationContext) {
		this.springApplicationContext = springApplicationContext;

		serverImplMap = springApplicationContext
				.getBeansWithAnnotation(ServerImpl.class);
	}

	public ApplicationContext getSpringApplicationContext() {
		return springApplicationContext;
	}

	public void setSpringApplicationContext(
			ApplicationContext springApplicationContext) {
		this.springApplicationContext = springApplicationContext;
	}

	public Map<String, Object> getServerImplMap() {
		return serverImplMap;
	}

}
