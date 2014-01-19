package dao;

import java.util.List;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.NewsType;

public interface NewsTypeDao extends BaseDao<NewsType, Integer> {
	/**
	 * 为首页展示论坛板块
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<NewsType> selectNewsTypeByIndex(final int... rowStartIdxAndCount);
	
	/**
	 * 删除论坛版块
	 * @param id
	 * @return
	 */
	public boolean deleteNewsType(int id);
}
