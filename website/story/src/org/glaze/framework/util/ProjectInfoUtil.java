package org.glaze.framework.util;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * 项目相关信息
 * 
 * @author liuyan
 */
public class ProjectInfoUtil {

	private final static Logger logger = Logger
			.getLogger(ProjectInfoUtil.class);

	private final static String WEB_INF = "WEB-INF";

	// 操作系统类型
	private final static String osType = System.getProperty("os.name");

	volatile static String projectPath = null;

	volatile static String templatePath = null;

	volatile static String projectPathFromClass = null;

	public static void main(String[] args) {
		System.out.println(getProjectRealPath());
	}

	/**
	 * 判断操作系统的类型
	 * 
	 * @return
	 * @throws Exception
	 */
	public static boolean OSisLinux() throws RuntimeException {

		if (StringUtils.isBlank(osType)) {
			RuntimeException exception = new RuntimeException("osType is null");
			logger.error("error", exception);
			throw exception;
		}

		if (osType.startsWith("Windows")) {
			// 按照windows
			logger.info("服务器是windows系统");
			return false;
		} else {
			// 按照linux进行
			logger.info("服务器是linux系统");
			return true;
		}
	}

	/**
	 * 获取项目的绝对路径,从Java类中获取
	 * 
	 * @return
	 */
	public final static String getProjectRealPath() {

		if (null == projectPath) {
			synchronized (ProjectInfoUtil.class) {
				logger.info("第一次加载项目绝对路径，后面就缓存该信息了");

				String path = ProjectInfoUtil.class.getResource("/").getPath();

				int indexNum = path.indexOf(WEB_INF);
				// 截取即可

				if (OSisLinux()) {
					// linux系统
					projectPath = path.substring(0, indexNum);
				} else {
					// win系统
					projectPath = path.substring(1, indexNum);
				}

			}
		}

		logger.info("项目绝对路径是:" + projectPath);

		return projectPath;

	}

	/**
	 * 获取项目的绝对路径[无文件上传]
	 * 
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public final static String getProjectRealPath(HttpServletRequest request) {

		if (null == projectPath) {
			synchronized (ProjectInfoUtil.class) {
				logger.info("第一次加载项目绝对路径，后面就缓存该信息了");
				projectPath = request.getRealPath("/");
			}
		}

		logger.info("项目绝对路径是:" + projectPath);

		return projectPath;
	}

	/**
	 * 获取项目的绝对路径[有文件上传]
	 * 
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public final static String getProjectRealPath(
			MultipartHttpServletRequest request) {

		if (null == projectPath) {
			synchronized (ProjectInfoUtil.class) {
				logger.info("第一次加载项目绝对路径，后面就缓存该信息了");
				projectPath = request.getRealPath("/");
			}
		}

		logger.info("项目绝对路径是:" + projectPath);

		return projectPath;
	}

	/**
	 * 获取ftl模板的路径
	 * 
	 * @return
	 */
	public final static String getTemplatePath(String projectRealPath) {

		if (null == templatePath) {
			synchronized (ProjectInfoUtil.class) {
				logger.info("第一次加载freemaker模板路径:");

				templatePath = projectRealPath + "WEB-INF/ftl";

			}
		}

		logger.info("freemaker模板路径:" + templatePath);

		return templatePath;
	}

}
