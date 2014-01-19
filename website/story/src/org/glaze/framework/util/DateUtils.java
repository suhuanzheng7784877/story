package org.glaze.framework.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;

/**
 * 与日期相关的辅助类
 * 
 * @author liuyan
 */
public class DateUtils {

	private final static Logger logger = Logger.getLogger(DateUtils.class);
	final static SimpleDateFormat compactSimpleDateFormat = new SimpleDateFormat(
			"yyyyMMddHHmmssSSS");

	/**
	 * Date转成日期，格式为"年月日时分秒"
	 * 
	 * @return
	 */
	public final static String DateToString() {

		String dateString = compactSimpleDateFormat.format(new Date());
		logger.info("日期字符串是:" + dateString);
		return dateString;
	}

	/**
	 * Date转成日期，格式为"年月日时分秒"
	 * @param 日期对象:date
	 * @return 转换后的字符串
	 * @throws RuntimeException
	 */
	public final static String DateToString(Date date) throws RuntimeException {
		if (date == null) {
			logger.error("日期为空 is null");
			throw new RuntimeException("日期为空 is null");
		}
		String dateString = compactSimpleDateFormat.format(date);
		logger.info("日期字符串是:" + dateString);
		return dateString;
	}

}
