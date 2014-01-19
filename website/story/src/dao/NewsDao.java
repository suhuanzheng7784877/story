package dao;

import java.util.List;

import org.glaze.framework.core.persistent.base.BaseDao;

import pojo.News;
import vo.NewsBean;

public interface NewsDao extends BaseDao<News, Integer> {
	
	/**
	 * 为首页展现最新的查询新闻
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<News> selectNewsByIndex(final int... rowStartIdxAndCount);
	
	/**
	 * 删除新闻实体
	 * @param id
	 * @return
	 */
	public boolean deleteNews(int id);
	
	/**
	 * 列出新闻实体
	 * @param sord
	 * @param sidx
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<NewsBean> listNewsBean(String sord, String sidx,
			int... rowStartIdxAndCount);

}
