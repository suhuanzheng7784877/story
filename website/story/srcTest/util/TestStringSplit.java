package util;

import org.junit.Test;

public class TestStringSplit {

	int allNum = 10000;

	@Test
	public void test01() {

		// SQL语句
		String sql = "SELECT * FROM user WHERE a=1";
		
		long start1 = System.currentTimeMillis();
		String sqlToUpperCase = sql.toUpperCase();
		for (int i = 0; i < allNum; i++) {
			int indexWhere = sqlToUpperCase.indexOf("WHERE");
			String fieldString = null;
			if (indexWhere > 0) {
				fieldString = sql.substring(0, indexWhere).trim();
			} else {
				int indexFrom = sqlToUpperCase.indexOf("ORDER BY");
				fieldString = sql.substring(0, indexFrom).trim();
			}
		}

		long end1 = System.currentTimeMillis();
		System.out.println("split耗时:" + (end1 - start1) + "ms");

	}

}
