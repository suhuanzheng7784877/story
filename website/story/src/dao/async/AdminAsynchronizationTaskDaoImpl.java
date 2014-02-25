package dao.async;

import java.util.Map;

import org.glaze.framework.exception.AsynchronizationException;
import org.glaze.framework.jobqueue.AsynchronizationTaskDaoImpl;
import org.glaze.framework.jobqueue.ExecuteState;

import pojo.Admin;
import dao.AdminDao;

public class AdminAsynchronizationTaskDaoImpl extends
		AsynchronizationTaskDaoImpl<AdminDao> {
	
	
	@Override
	public ExecuteState execute(Object... parameters)
			throws AsynchronizationException {
		
		boolean result = this.dao.save((Admin)parameters[0]);
		
		if(result){
			return new ExecuteState(0,"ok");
		}
		
		return new ExecuteState(1,"error");
	}

	@Override
	public ExecuteState execute(Map<String, Object> parameterMap)
			throws AsynchronizationException {
		return null;
	}

}
