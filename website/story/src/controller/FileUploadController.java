package controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.glaze.framework.util.DateUtils;
import org.glaze.framework.util.FileAndIOUtils;
import org.glaze.framework.util.PropertiesUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@Controller
@RequestMapping("/fileupload")
public class FileUploadController {

	private static Logger logger = Logger.getLogger(FileUploadController.class);

	static final String fileRoot = PropertiesUtil
			.getValue("story.mp3store.ckeditoruploadpic");

	// 项目的绝对路径
	String projectRealPath = null;

	// http访问ip地址
	String requestContextPath = null;

	/**
	 * 登录
	 * 
	 * @param user
	 * @return
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping(value = "/uploadpic.action")
	public void upload(@RequestParam("type") String type,
			@RequestParam("upload") MultipartFile multipartFile,
			MultipartHttpServletRequest request, HttpServletResponse response) {

		if (projectRealPath == null) {
			projectRealPath = request.getRealPath("/");
		}

		if (requestContextPath == null) {
			requestContextPath = request.getContextPath();
		}

		// 文件名
		String fileName = type + "_" + DateUtils.DateToString() + ".jpg";

		String targetDir = "";
		StringBuilder responseString = new StringBuilder(250);
		try {
			if (!multipartFile.isEmpty()) {

				// 文件相对路径
				targetDir = fileRoot + fileName;

				String httpDownloadUrl = requestContextPath + "/" + targetDir;

				// 上传的物理绝对路径
				String targetDirPIC = projectRealPath + targetDir;

				// 上传
				FileAndIOUtils.springMultipartFileUpload(multipartFile,
						targetDirPIC);

				// 拼接FCK图片反馈信息
				responseString
						.append("<script type=\"text/javascript\">")
						.append(
								"window.parent.CKEDITOR.tools.callFunction(2, '");
				responseString.append(httpDownloadUrl);
				responseString.append("');</script>");

				response.getWriter().write(responseString.toString());
			}

		} catch (IOException e) {
			e.printStackTrace();
			logger.error("error", e);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
		}

	}
}
