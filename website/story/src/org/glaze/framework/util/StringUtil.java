package org.glaze.framework.util;

import java.util.Random;

import org.apache.log4j.Logger;

/**
 * 字符串相关的辅助包
 * 
 * @author liuyan
 */
public final class StringUtil {

	private final static Logger logger = Logger.getLogger(StringUtil.class);

	public volatile static String jarPath = null;

	public final static Random random = new Random();

	/**
	 * 获取当前项目的classpath的绝对路径
	 * 
	 * @return
	 */
	public static String getJarPath() {
		try {

			if (jarPath == null || "".equals(jarPath)) {
				jarPath = StringUtil.class.getProtectionDomain()
						.getCodeSource().getLocation().getFile();
				logger.info("获取当前项目的classpath的绝对路径");
			}

			return java.net.URLDecoder.decode(jarPath, "UTF-8");
		} catch (java.io.UnsupportedEncodingException ex) {
			ex.printStackTrace();
			logger.error("error", ex);
		}
		return null;
	}

	/**
	 * 获取Java正确的路径字符串
	 * 
	 * @param path
	 * @return
	 */
	public static String getRightPathPath(String path) {
		if (path != null && !"".equals(path)) {
			String pathRight = path.replaceAll("\\\\", "/");
			return pathRight;
		}
		return path;

	}

	/**
	 * 生成4位随机数
	 * 
	 * @param 生成数字的位数
	 *            number
	 * @return
	 */
	public static String generateRandom4Number() {
		return generateRandom(4);

	}

	/**
	 * 生成6位随机数
	 * 
	 * @param 生成数字的位数
	 *            number
	 * @return
	 */
	public static String generateRandom6Number() {
		return generateRandom(6);

	}

	/**
	 * 生成随机数
	 * 
	 * @param 生成数字的位数
	 *            number
	 * @return
	 */
	public static String generateRandom(int number) {

		StringBuilder sb = new StringBuilder(number);
		for (int i = 0; i < number; i++) {
			int p = random.nextInt(10);
			sb.append(p);
		}
		return sb.toString();

	}

	/**
	 * 分析sql语句中select与from之间的字段
	 * 
	 * @param sql
	 * @return
	 */
	public static String analystSqlField(String sql) {
		logger.info("分析sql语句中select与from之间的字段:" + sql);
		if (sql == null || "".equals(sql)) {
			return "";
		}
		
		int indexWhere = sql.indexOf("WHERE");
		if(indexWhere>0){
			String fieldString = sql.substring(0, indexWhere).trim();
			return fieldString;
		}
		
		int indexFrom = sql.indexOf("ORDER BY");
		String fieldString = sql.substring(0, indexFrom).trim();
		return fieldString;
	}

}
