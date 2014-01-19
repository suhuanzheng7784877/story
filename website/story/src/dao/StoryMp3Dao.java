package dao;

import java.util.List;

import org.glaze.framework.core.persistent.base.BaseDao;


import pojo.StoryMp3;

public interface StoryMp3Dao extends BaseDao<StoryMp3, Integer> {

	/**
	 * 增加下载用户
	 * 
	 * @param id
	 * @param experience
	 * @return
	 */
	public boolean addDownloadMp3Count(int mp3id);

	/**
	 * 记录用户下载mp3的历史
	 * 
	 * @param mp3id
	 * @param userid
	 * @return
	 */
	public boolean recordDownloadMp3(int mp3id, int userid);

	/**
	 * 该用户是否下载过该mp3
	 * 
	 * @param id
	 * @param experience
	 * @return
	 */
	public boolean isUserDownloadMp3(int mp3id, int userid);
	
	/**
	 * 为首页展现最新的查询mp3
	 * @param rowStartIdxAndCount
	 * @return
	 */
	public List<StoryMp3> selectStoryMp3ByIndex(final int... rowStartIdxAndCount);
	
	/**
	 * 删除mp3实体
	 * @param id
	 * @return
	 */
	public boolean deleteStoryMp3(int id);
}
