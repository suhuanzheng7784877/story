package lucene;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import lucene.index.NewsRefreshIndex;
import lucene.search.NewsSearchData;

import org.junit.Test;

import pojo.News;
import testfather.FatherTest;

public class TestNews extends FatherTest {

	@Test
	public void testCreate() throws SQLException {
		NewsRefreshIndex newsRefreshIndex = springAppContent.getBean(
				"newsRefreshIndex", NewsRefreshIndex.class);

		newsRefreshIndex.executiveRefreshIndex();
	}

	@Test
	public void testSearch() throws Exception {
		NewsSearchData newsSearchData = springAppContent.getBean(
				"newsSearchData", NewsSearchData.class);

		String queryKeyWord = "开发模式";

		int page = 2;

		Map<String, Object> resultMap = (Map<String, Object>) newsSearchData
				.search(queryKeyWord, (page - 1) * 20);

		Integer totalCount = (Integer) resultMap.get("totalCount");
		

		System.out.println("总记录数：" + totalCount);

		Integer pageNum = (Integer) resultMap.get("pageNum");
		System.out.println("总页数：" + pageNum);

		Long spendTime = (Long) resultMap.get("spendTime");

		System.out.println("花费时间：" + spendTime + "ms");
		
		List<News> list = (List<News>) resultMap.get("resultData");

		for (News news : list) {
			System.out.println(news);
		}

		System.out.println("第二次查询");

		String queryKeyWord2 = "MySQL";

		int page2 = 3;

		Map<String, Object> resultMap2 = (Map<String, Object>) newsSearchData
				.search(queryKeyWord2, (page2 - 1) * 20);

		Integer totalCount2 = (Integer) resultMap2.get("totalCount");
		List<News> list2 = (List<News>) resultMap2.get("resultData");

		System.out.println("总记录数：" + totalCount2);

		Integer pageNum2 = (Integer) resultMap2.get("pageNum");
		System.out.println("总页数：" + pageNum2);

		Long spendTime2 = (Long) resultMap2.get("spendTime");

		System.out.println("花费时间：" + spendTime2 + "ms");

		for (News news : list2) {
			System.out.println(news);
		}

	}

}
