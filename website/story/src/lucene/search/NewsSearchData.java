package lucene.search;

import java.io.IOException;
import java.io.Serializable;

import lucene.AbstractSearchData;

import org.apache.log4j.Logger;
import org.apache.lucene.document.Document;
import org.apache.lucene.search.highlight.Highlighter;
import org.apache.lucene.search.highlight.InvalidTokenOffsetsException;
import org.glaze.framework.util.PropertiesUtil;

import pojo.News;

/**
 * 从索引文件中搜索记录
 * @author liuyan
 */
public class NewsSearchData extends AbstractSearchData {

	public Logger logger = Logger.getLogger(NewsSearchData.class);

	// 索引所在的
	public final String indexPath = PropertiesUtil
			.getValue("story.lucene.index.news");

	@Override
	protected void init() {
		initDetail(indexPath);
	}

	@Override
	protected String[] buildSearchFields() {

		// 在多个字段域中搜索，如域title和content
		String[] fields = { "title", "newscontent" };
		return fields;
	}

	@Override
	protected Serializable extract(Highlighter highlighter, Document document)
			throws InvalidTokenOffsetsException, IOException {

		News news = new News();

		String id = document.get("id");

		// 高亮显示title
		String title = document.get("title");
		String highlighterTitle = highlighter.getBestFragment(analyzer,
				"title", title);

		// 如果title中没有找到关键词
		if (highlighterTitle == null) {
			highlighterTitle = title;
		}

		// 高亮显示content
		String newscontent = document.get("newscontent");

		String highlighterNewscontent = highlighter.getBestFragment(analyzer,
				"newscontent", newscontent);
		// 如果newscontent中没有找到关键词
		if (highlighterNewscontent == null) {
			highlighterNewscontent = newscontent;
		}

		news.setId(Integer.parseInt(id));
		news.setTitle(highlighterTitle);
		news.setNewsContent(highlighterNewscontent + " ...");

		return news;
	}

}
