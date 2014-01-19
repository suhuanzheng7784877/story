package util;

import java.lang.management.ManagementFactory;

import org.apache.log4j.Logger;
import org.glaze.framework.util.StringUtil;
import org.junit.Test;

import com.sun.management.OperatingSystemMXBean;

import testfather.FatherTest;

public class TestStringUtil extends FatherTest {

	private final static Logger logger = Logger.getLogger(TestStringUtil.class);

	@Test
	public void test1() {
		String sql = "SELECT newscomment.*,user.name,news.title FROM newscomment newscomment,user user,news news WHERE newscomment.commentUserId = user.id AND newscomment.newsId=news.id ORDER BY";

		String result = StringUtil.analystSqlField(sql);
		System.out.println(result);

	}

	@Test
	public void test2() {

		OperatingSystemMXBean osMxbean = (OperatingSystemMXBean) ManagementFactory
				.getOperatingSystemMXBean();

		long memTotalSize = osMxbean.getTotalPhysicalMemorySize();

		logger.info("The total memory is " + memTotalSize);

		long memFreeSize = osMxbean.getFreePhysicalMemorySize();

		logger.info("The total free memory is " + memFreeSize);

	}

}
