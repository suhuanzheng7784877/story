package org.glaze.framework.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

/**
 * web端与文件操作相关的辅助工具类
 * 
 * @author liuyan
 */
public class FileAndIOUtils {

	private static Logger logger = Logger.getLogger(FileAndIOUtils.class);

	/**
	 * Spring MVC中的上传文件保存到web端本地
	 * 
	 * @param multipartFile
	 * @param targetDir
	 * @return
	 */
	public final static boolean springMultipartFileUpload(
			MultipartFile multipartFile, String targetDir) {
		InputStream inputStream = null;
		try {
			inputStream = multipartFile.getInputStream();
			logger.info("上传的目标文件夹:" + targetDir);
			File targetFile = new File(targetDir);
			// 文件拷贝，生成本地文件
			FileUtils.copyInputStreamToFile(inputStream, targetFile);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("error", e);
			return false;
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
					logger.error("error", e);
					return false;
				}
				inputStream = null;
			}
		}
	}

	/**
	 * 根据文件相对路径删除文件
	 * 
	 * @param fileRelativePath
	 * @return
	 */
	public static boolean removeFileByRelativePath(String fileRelativePath) {

		// 项目的绝对路径
		String projectRealPath = ProjectInfoUtil.getProjectRealPath();

		String fileAbsolutePath = projectRealPath + fileRelativePath;

		logger.info("删除文件的绝对路径:" + fileAbsolutePath);

		return FileUtils.deleteQuietly(new File(fileAbsolutePath));
	}

}
