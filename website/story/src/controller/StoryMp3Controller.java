package controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.glaze.framework.core.controler.base.BaseController;
import org.glaze.framework.util.DateUtils;
import org.glaze.framework.util.FileAndIOUtils;
import org.glaze.framework.util.ProjectInfoUtil;
import org.glaze.framework.util.PropertiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import pojo.StoryMp3;
import pojo.User;
import pojo.UserInfo;
import dao.StoryMp3Dao;
import dao.UserDao;
import dao.UserInfoDao;

/**
 * mp3相关的业务逻辑
 * 
 * @author liuyan
 */
@Controller
@RequestMapping("/storymp3")
public class StoryMp3Controller extends BaseController {

	@Autowired
	private StoryMp3Dao storyMp3Dao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private UserInfoDao userInfoDao;

	final String mp3FileRoot = PropertiesUtil.getValue("story.mp3store.root");

	final String storymp3picRoot = PropertiesUtil
			.getValue("story.mp3store.storymp3pic");

	// 项目的绝对路径
	String projectRealPath = null;

	// http访问ip地址
	String requestContextPath = null;

	/**
	 * 上传mp3
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/addMp3.action")
	@ResponseBody
	public boolean addMp3(@ModelAttribute("storyMp3") StoryMp3 storyMp3,
			@RequestParam("fileMp3") MultipartFile multipartFile1,
			@RequestParam("filePic") MultipartFile multipartFile2,
			MultipartHttpServletRequest request) {

		if (projectRealPath == null) {
			projectRealPath = ProjectInfoUtil.getProjectRealPath(request);
		}

		if (requestContextPath == null) {
			requestContextPath = request.getContextPath();
		}

		// mp3的前缀名称，按时间
		String mp3Name = DateUtils.DateToString();

		String mp3PathName = mp3FileRoot + mp3Name + ".mp3";

		String mp3PathPic = storymp3picRoot + mp3Name + ".jpg";

		// ---存储路径:/storyFile/storymp3/"时间".mp3
		String targetDirMp3 = projectRealPath + mp3PathName;

		// ---存储图片路径:/storyFile/storymp3pic/"时间".jpg
		String targetDirPic = projectRealPath + mp3PathPic;

		// 执行上传mp3
		FileAndIOUtils.springMultipartFileUpload(multipartFile1, targetDirMp3);

		// 执行上传代表图片
		FileAndIOUtils.springMultipartFileUpload(multipartFile2, targetDirPic);

		storyMp3.setDate(new Date());
		storyMp3.setMp3url(mp3PathName);
		storyMp3.setTitlePicUrl(mp3PathPic);
		boolean result = storyMp3Dao.save(storyMp3);

		// session的赋值
		return result;

	}

	/**
	 * 删除单个用户信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/delete.action")
	@ResponseBody
	public Map<String, Boolean> delete(@RequestParam int id) {

		Map<String, Boolean> map = new HashMap<String, Boolean>(4);
		boolean success = storyMp3Dao.deleteStoryMp3(id);
		map.put("result", success);
		return map;
	}

	/**
	 * 查看某一个mp3详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showmp3.action")
	@ResponseBody
	public Map<String, Object> showMp3(@RequestParam int mp3id) {

		Map<String, Object> map = new HashMap<String, Object>();
		// mp3实体
		StoryMp3 storyMp3 = storyMp3Dao.findById(mp3id);
		map.put("result", storyMp3);
		return map;

	}

	/**
	 * 查看多个mp3详细信息
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/showmp3s.action")
	@ResponseBody
	public Map<String, Object> showMp3s(
			@RequestParam(required = false, defaultValue = "1") int page,
			@RequestParam(required = false, defaultValue = "15") int records,
			@RequestParam(required = false, defaultValue = "ASC") String sord,
			@RequestParam(required = false, defaultValue = "id") String sidx) {

		// 起始记录
		int start = (page - 1) * records;

		// mp3实体
		List<StoryMp3> storyMp3List = storyMp3Dao.findByProperty(sidx, sord,
				start, records);
		return buildResponseMap(storyMp3Dao, storyMp3List, page, records);

	}

	/**
	 * 下载某一个mp3
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/downloadmp3.action")
	@ResponseBody
	public Map<String, Object> downloadMp3(@RequestParam int mp3id,
			HttpSession session) {

		Map<String, Object> map = new HashMap<String, Object>();

		// 此信息从session中来
		User user = (User) session.getAttribute("loginUser");

		if (user == null) {
			// 用户未登陆，不能提供下载
			map.put("candownloadType", "nologin");
			map.put("result", false);
			return map;
		}

		int userid = user.getId();

		// 用户是否下载过mp3
		boolean isUserDownloadMp3 = storyMp3Dao
				.isUserDownloadMp3(mp3id, userid);

		// mp3实体
		StoryMp3 storyMp3 = storyMp3Dao.findById(mp3id);

		// mp3需要的积分
		int needscore = storyMp3.getNeedscore();

		// mp3的链接地址
		String mp3url = storyMp3.getMp3url();

		if (!isUserDownloadMp3) {

			if (needscore > 0) {
				// 没下载过，扣积分
				User userTemp = userDao.findById(userid);
				UserInfo userInfo = userTemp.getUserInfo();
				int userinfoId = userInfo.getId();
				int score = userInfo.getScore();

				// 用户积分小于mp3需要的积分
				if (score < needscore) {

					// 积分不够，不能下载
					map.put("candownloadType", "scorenotenough");
					map.put("result", false);
					return map;
				}
				// 扣除用户积分
				userInfoDao.decreaseUserscore(userinfoId, needscore);
			}

			// 记录用户下载历史
			storyMp3Dao.recordDownloadMp3(mp3id, userid);
		}

		// 增加下载次数
		storyMp3Dao.addDownloadMp3Count(mp3id);

		map.put("result", true);
		map.put("mp3url", mp3url);
		return map;

	}

}
