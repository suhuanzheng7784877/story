package lucene.index;

import java.sql.ResultSet;
import java.sql.SQLException;

import lucene.AbstractRefreshIndex;

import org.apache.log4j.Logger;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;
import org.glaze.framework.util.PropertiesUtil;


/**
 * 新闻实体索引
 * 
 * @author liuyan
 */
public class NewsRefreshIndex extends AbstractRefreshIndex {

	public Logger logger = Logger.getLogger(NewsRefreshIndex.class);

	// 索引所在的
	protected String indexPath = PropertiesUtil
			.getValue("story.lucene.index.news");

	/**
	 * 初始化
	 */
	@Override
	protected void init() {

		this.sql = "select * from news";

		initDetail(indexPath);
	}

	/**
	 * 经过resultSet拼装lucene的Document
	 * 
	 * @param resultSet
	 * @return
	 */
	@Override
	protected Document buildDocument(ResultSet resultSet) {
		String id = "";
		String newscontent = "";
		String title = "";

		try {
			id = resultSet.getString("id");
			newscontent = resultSet.getString("newscontent");
			title = resultSet.getString("title");
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("建立文档失败", e);
		}

		Document document = new Document();

		Field titleField = new Field("title", title, Store.YES, Index.ANALYZED);
		titleField.setBoost(1.0f);

		Field newscontentField = new Field("newscontent", newscontent,
				Store.YES, Index.ANALYZED);
		newscontentField.setBoost(1.1f);

		// Store指定Field是否需要存储,Index指定Field是否需要分词索引
		document.add(new Field("id", id, Store.YES, Index.NOT_ANALYZED));
		document.add(titleField);
		document.add(newscontentField);

		return document;
	}

}
