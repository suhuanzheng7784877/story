package org.glaze.framework.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

/**
 * 读取Properties文件的内容
 * 
 * @author liuyan
 */
public class PropertiesUtil {

	private final static Properties properties = new Properties();

	private final static Logger logger = Logger.getLogger(PropertiesUtil.class);

	// 配置文件的位置
	static String propertiesRelativelyPath = "/config/story.properties";

	static {
		InputStream in = PropertiesUtil.class
				.getResourceAsStream(propertiesRelativelyPath);
		try {
			logger.info("加载配置文件"+propertiesRelativelyPath);
			properties.load(in);
		} catch (IOException e) {
			logger.error("error", e);
			e.printStackTrace();
		} catch (Exception e) {
			logger.error("error", e);
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					logger.error("error", e);
					e.printStackTrace();
				}
				in = null;
				logger.info("加载配置文件["+propertiesRelativelyPath+"]完毕");
			}
		}
	}

	/**
	 * 读取配置文件内容
	 * 
	 * @param key
	 * @return
	 */
	public static String getValue(String key) {

		if (StringUtils.isBlank(key)) {
			logger.error("key is null");
			return null;
		}

		String value = properties.getProperty(key, null);
		return value;
	}

}
