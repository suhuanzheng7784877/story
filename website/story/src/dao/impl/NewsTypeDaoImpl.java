package dao.impl;

import java.util.List;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;

import pojo.NewsType;
import dao.NewsTypeDao;

public class NewsTypeDaoImpl extends BaseDaoImpl<NewsType, Integer> implements
		NewsTypeDao {

	@Override
	public List<NewsType> selectNewsTypeByIndex(int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.NewsType model ORDER BY model.id DESC";

		List<NewsType> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@Override
	public boolean deleteNewsType(int id) {

		String sql = "DELETE FROM newstype WHERE id=" + id;
		return executiveSQLUpdate(sql);
	}

}
