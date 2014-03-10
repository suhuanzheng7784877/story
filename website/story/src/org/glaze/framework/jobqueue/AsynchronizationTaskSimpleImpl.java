package org.glaze.framework.jobqueue;

import org.glaze.framework.exception.AsynchronizationException;

public class AsynchronizationTaskSimpleImpl implements AsynchronizationTask {

	@Override
	public ExecuteState execute() throws AsynchronizationException {
		return new ExecuteState();
	}

}
