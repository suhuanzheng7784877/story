package lucene.index;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;
import org.glaze.framework.util.PropertiesUtil;


import lucene.AbstractRefreshIndex;

public class InvitationRefreshIndex extends AbstractRefreshIndex {
	
	public Logger logger = Logger.getLogger(InvitationRefreshIndex.class);
	
	// 索引所在的
	protected String indexPath = PropertiesUtil
			.getValue("story.lucene.index.invitation");

	/**
	 * 初始化
	 */
	@Override
	protected void init() {

		this.sql = "select * from invitation";

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
		String content = "";
		String title = "";

		try {
			id = resultSet.getString("id");
			content = resultSet.getString("content");
			title = resultSet.getString("title");
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("建立文档失败", e);
		}

		Document document = new Document();

		Field titleField = new Field("title", title, Store.YES, Index.ANALYZED);
		titleField.setBoost(1.0f);

		Field contentField = new Field("content", content,
				Store.YES, Index.ANALYZED);
		contentField.setBoost(1.1f);

		// Store指定Field是否需要存储,Index指定Field是否需要分词索引
		document.add(new Field("id", id, Store.YES, Index.NOT_ANALYZED));
		document.add(titleField);
		document.add(contentField);

		return document;
	}

}
