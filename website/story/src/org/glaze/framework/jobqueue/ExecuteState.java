package org.glaze.framework.jobqueue;

import java.io.Serializable;

/**
 * 状态执行
 * 
 * @author liuyan
 */
public class ExecuteState implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ExecuteState() {
		super();
	}

	public ExecuteState(int resultCode, String resultBody) {
		super();
		this.resultCode = resultCode;
		this.resultBody = resultBody;
	}

	private int resultCode;

	private String resultBody;

	public int getResultCode() {
		return resultCode;
	}

	public void setResultCode(int resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultBody() {
		return resultBody;
	}

	public void setResultBody(String resultBody) {
		this.resultBody = resultBody;
	}
	
	public boolean handle(){
		return true;
	}
	

	@Override
	public String toString() {
		return "ExecuteState [resultBody=" + resultBody + ", resultCode="
				+ resultCode + "]";
	}

}
