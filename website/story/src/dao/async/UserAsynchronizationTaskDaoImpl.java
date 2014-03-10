package dao.async;

import org.glaze.framework.exception.AsynchronizationException;
import org.glaze.framework.jobqueue.AsynchronizationTaskDaoImpl;
import org.glaze.framework.jobqueue.ExecuteState;

import pojo.User;
import dao.UserDao;

/**
 * UserDaoImpl实现下的异步任务接口
 * 
 * @author liuyan
 */
public class UserAsynchronizationTaskDaoImpl extends
		AsynchronizationTaskDaoImpl<UserDao> {
	
	

	@Override
	public ExecuteState execute()
			throws AsynchronizationException {
		
		boolean result = this.dao.save((User)parameterMap.get("user"));
		
		if(result){
			return new ExecuteState(0,"ok");
		}
		
		return new ExecuteState(1,"error");
	}

}
