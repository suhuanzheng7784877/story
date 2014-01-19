package dao;

import java.util.List;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.Topic;

/**
 * 论坛版块操作
 * @author liuyan
 */
public interface TopicDao extends BaseDao<Topic, Integer> {
	
	/**
	 * 为首页展示论坛板块
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<Topic> selectTopicByIndex(final int... rowStartIdxAndCount);
	
	/**
	 * 删除论坛版块
	 * @param id
	 * @return
	 */
	public boolean deleteTopic(int id);

}
