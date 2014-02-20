package org.glaze.framework.jobqueue;

import java.util.Map;

import org.glaze.framework.exception.AsynchronizationException;

public class AsynchronizationTaskSimpleImpl implements AsynchronizationTask {

	@Override
	public ExecuteState execute(Object... parameters) throws AsynchronizationException {
		return new ExecuteState();
	}

	@Override
	public ExecuteState execute(Map<String, Object> parameterMap)
			throws AsynchronizationException {
		return null;
	}

}
