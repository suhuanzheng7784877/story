package dao.impl;

import java.util.List;

import org.glaze.framework.core.persistent.base.impl.BaseDaoImpl;
import org.glaze.framework.util.FileAndIOUtils;

import constants.SystemConstants;

import pojo.StoryMp3;
import dao.StoryMp3Dao;

public class StoryMp3DaoImpl extends BaseDaoImpl<StoryMp3, Integer> implements
		StoryMp3Dao {

	@Override
	public boolean recordDownloadMp3(int mp3id, int userid) {

		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql
				.append(
						"INSERT INTO storymp3downloadusers (storymp3id,userid) VALUES (")
				.append(mp3id).append(",").append(userid).append(")");

		return executiveSQLUpdate(sql.toString());
	}

	@Override
	public boolean isUserDownloadMp3(int mp3id, int userid) {

		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql.append("SELECT id FROM storymp3downloadusers WHERE storymp3id=")
				.append(mp3id).append(" AND ").append("userid=").append(userid);

		List<Object[]> result = executiveSQLSelectResultSet(sql.toString());
		if (result != null && result.size() > 0) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean addDownloadMp3Count(int mp3id) {
		StringBuilder sql = new StringBuilder(SystemConstants.StringBuilderInitSize);
		sql
				.append("UPDATE storymp3 SET downloadcount= downloadcount+1 WHERE id=");
		sql.append(mp3id);

		return executiveSQLUpdate(sql.toString());
	}

	@Override
	public List<StoryMp3> selectStoryMp3ByIndex(int... rowStartIdxAndCount) {

		String jpql = "SELECT model FROM pojo.StoryMp3 model ORDER BY model.date DESC";

		List<StoryMp3> list = findByJPQL(jpql, rowStartIdxAndCount);

		return list;

	}

	@Override
	public boolean deleteStoryMp3(int id) {

		boolean result = false;

		// 0-先查出实体
		StoryMp3 storyMp3 = findById(id);

		// mp3相关的图片信息
		String mp3TitleUrl = storyMp3.getTitlePicUrl();

		// mp3本体文件
		String mp3url = storyMp3.getMp3url();

		// 1-删除mp3的相关文件
		FileAndIOUtils.removeFileByRelativePath(mp3TitleUrl);

		FileAndIOUtils.removeFileByRelativePath(mp3url);

		// 2-删除级联信息
		String sql = "DELETE FROM storymp3downloadusers WHERE storymp3id=" + id;

		result = executiveSQLUpdate(sql);

		if (!result) {
			return result;
		}

		result = deleteByObject(storyMp3);

		return result;
	}
}
