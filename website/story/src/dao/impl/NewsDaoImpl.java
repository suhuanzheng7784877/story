package dao.impl;

import java.util.List;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;
import org.glaze.framework.util.FileAndIOUtils;

import pojo.News;
import vo.NewsBean;
import constants.SystemConstants;
import dao.NewsDao;

public class NewsDaoImpl extends BaseDaoImpl<News, Integer> implements NewsDao {

	@Override
	public List<News> selectNewsByIndex(int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.News model ORDER BY model.date DESC";

		List<News> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@Override
	public boolean deleteNews(int id) {

		// mp3实体
		News news = findById(id);

		// 新闻相关的图片信息
		String newTitlePic = news.getNewTitlePic();

		// 删除mp3的相关文件
		FileAndIOUtils.removeFileByRelativePath(newTitlePic);

		return deleteByObject(news);
	}

	/**
	 * 列出新闻实体
	 * 
	 * @param sord
	 * @param sidx
	 * @param rowStartIdxAndCount
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<NewsBean> listNewsBean(String sord, String sidx,
			int... rowStartIdxAndCount) {

		StringBuilder sql = new StringBuilder(
				SystemConstants.StringBuilderInitSize);
		sql
				.append("SELECT news.id,news.date,news.title,newstype.typeTitle FROM ");
		sql.append("news news LEFT JOIN newstype ON ");
		sql.append("newstype.id = news.newstypeId ORDER BY ");
		sql.append(sidx).append(" ").append(sord).append(" LIMIT ?,?");

		return (List<NewsBean>) quaryGridListPrepare(sql.toString(),
				NewsBean.class, rowStartIdxAndCount[0], rowStartIdxAndCount[1]);

	}

}
