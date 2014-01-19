package org.glaze.framework.util.vo;

import java.io.Serializable;

/**
 * view object基类，显示在grid的数据javabean
 * @author liuyan
 */
public class BaseVo implements Serializable,Cloneable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public BaseVo(){
		
	}
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

}
