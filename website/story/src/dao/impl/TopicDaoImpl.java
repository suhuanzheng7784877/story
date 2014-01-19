package dao.impl;

import java.util.List;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import pojo.Topic;
import dao.TopicDao;

public class TopicDaoImpl extends BaseDaoImpl<Topic, Integer> implements
		TopicDao {

	@Override
	public List<Topic> selectTopicByIndex(int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.Topic model ORDER BY model.id DESC";

		List<Topic> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@Override
	public boolean deleteTopic(int id) {

		String sql = "DELETE FROM topic WHERE id=" + id;
		return executiveSQLUpdate(sql);
	}

}
