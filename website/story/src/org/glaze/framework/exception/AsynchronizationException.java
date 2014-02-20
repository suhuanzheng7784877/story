package org.glaze.framework.exception;

import java.io.IOException;
import java.sql.SQLException;

public class AsynchronizationException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Exception exception;

	public AsynchronizationException(Exception exception) {
		this.exception = exception;
	}

	public AsynchronizationException(InterruptedException interruptedException) {
		this.exception = interruptedException;
	}

	public AsynchronizationException(IOException ioException) {
		this.exception = ioException;
	}
	
	public AsynchronizationException(SQLException exception) {
		this.exception = exception;
	}

	@Override
	public void printStackTrace() {
		super.printStackTrace();
		System.err.print(exception);
	}


}
