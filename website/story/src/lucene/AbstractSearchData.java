package lucene;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lucene.quartzjob.CreateAllDataIndexJobAction;

import org.apache.log4j.Logger;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.TopScoreDocCollector;
import org.apache.lucene.search.highlight.Formatter;
import org.apache.lucene.search.highlight.Fragmenter;
import org.apache.lucene.search.highlight.Highlighter;
import org.apache.lucene.search.highlight.InvalidTokenOffsetsException;
import org.apache.lucene.search.highlight.QueryScorer;
import org.apache.lucene.search.highlight.Scorer;
import org.apache.lucene.search.highlight.SimpleHTMLFormatter;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.LockObtainFailedException;
import org.apache.lucene.util.Version;

/**
 * 抽象的搜索模板类
 * 
 * @author liuyan
 */
public abstract class AbstractSearchData {

	public Logger logger = Logger.getLogger(AbstractSearchData.class);

	// 创建高亮器,使搜索的关键词突出显示
	protected final Formatter formatter = new SimpleHTMLFormatter(
			"<font color='red'>", "</font>");

	// 只显示前多少条记录
	protected int topMaxDataSize;

	// 每页记录数
	private int searchPageSize;

	// 索引存放目录
	protected Directory directory;

	protected IndexReader indexReader;

	protected IndexSearcher indexSearcher;

	// 同一所使用的分词器
	protected Analyzer analyzer;

	// 搜索摘要，显示摘要，100代表摘要附近的多少个字节
	protected Fragmenter fragmenter;

	// 在多个字段域（元字段）中搜索，(如域title和content)
	protected String[] fields;

	public int getSearchPageSize() {
		return searchPageSize;
	}

	public void setSearchPageSize(int searchPageSize) {
		this.searchPageSize = searchPageSize;
	}

	public Fragmenter getFragmenter() {
		return fragmenter;
	}

	public void setFragmenter(Fragmenter fragmenter) {
		this.fragmenter = fragmenter;
	}

	public Analyzer getAnalyzer() {
		return analyzer;
	}

	public void setAnalyzer(Analyzer analyzer) {
		this.analyzer = analyzer;
	}

	public int getTopMaxDataSize() {
		return topMaxDataSize;
	}

	public void setTopMaxDataSize(int topMaxDataSize) {
		this.topMaxDataSize = topMaxDataSize;
	}

	/**
	 * 初始化
	 */
	protected abstract void init();
	
	protected void initDetail(String indexPath){
		logger.info("初始化....");

		try {

			// 创建索引目录
			if (directory == null) {
				// 在当前路径下建立一个目录叫indexDir
				File indexDir = new File(indexPath);
				directory = FSDirectory.open(indexDir);
			}

			if (indexReader == null) {
				indexReader = IndexReader.open(directory);
			}

			if (indexSearcher == null) {
				indexSearcher = new IndexSearcher(indexReader);
			}

		} catch (CorruptIndexException e) {
			e.printStackTrace();
			logger.error("初始化失败", e);
		} catch (LockObtainFailedException e) {
			e.printStackTrace();
			logger.error("初始化失败", e);
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("初始化失败", e);
		}

		logger.info("初始化完成!");
	}

	/**
	 * 搜索主入口方法
	 * 
	 * @param queryKeyWord
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> search(String queryKeyWord, int startNum)
			throws Exception {

		if (!CreateAllDataIndexJobAction.IsCanSearch()) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("error", "index is creating");
			logger.error("正在创建索引，不能进行搜索");
			return resultMap;
		}

		if (null == queryKeyWord || "".equals(queryKeyWord)) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("error", "error queryKeyWord");
			logger.error("搜索关键字非法");
			return resultMap;
		}

		try {

			// 0-当前时间
			long startTime = System.currentTimeMillis();

			// 1-初始化，主要是初始索引文档的位置
			init();

			// 2-在多个字段域（元字段）中搜索，(如域title和content)
			if (fields == null) {
				fields = buildSearchFields();
			}

			// 3-根据元数据、关键词，创建lucene查询会话对象
			Query query = createQuery(fields, queryKeyWord);

			// 最多显示1000条数据
			TopScoreDocCollector topScoreDocCollectorResults = TopScoreDocCollector
					.create(topMaxDataSize, false);

			// 分页
			indexSearcher.search(query, topScoreDocCollectorResults);

			// 将查询结果分页
			TopDocs topDocs = topScoreDocCollectorResults.topDocs(startNum,
					searchPageSize);

			// 获取命中的搜索结果总数量
			int totalCount = topDocs.totalHits;

			// 4-构建高亮渲染显示器
			Highlighter highlighter = buildHighlighter(query);

			// 5-获取搜索的结果列表
			ScoreDoc[] scoreDocArray = topDocs.scoreDocs;

			return buildDataListByScoreDocArray(totalCount, highlighter,
					scoreDocArray, startTime);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} finally {
			// 关闭资源
			/*
			 * if (indexReader != null) { indexReader.close(); indexReader =
			 * null; }
			 * 
			 * if (indexSearcher != null) { indexSearcher.close(); indexSearcher
			 * = null; }
			 */
		}

	}

	/**
	 * 在多个字段域（元字段）中搜索，(如域title和content)
	 * 
	 * @return
	 */
	protected abstract String[] buildSearchFields();

	/**
	 * 根据元数据、关键词，创建lucene查询会话对象
	 * 
	 * @param fields
	 * @param queryKeyWord
	 * @return
	 * @throws ParseException
	 */
	protected Query createQuery(String[] fields, String queryKeyWord)
			throws ParseException {
		// 复杂型字段分析器
		QueryParser queryParser = new MultiFieldQueryParser(Version.LUCENE_36,
				fields, analyzer);

		// 设置关键词的相互关系(AND：有关联，必须同时存在|OR：交集存在)
		queryParser.setDefaultOperator(QueryParser.AND_OPERATOR);

		// 分析关键字
		Query query = queryParser.parse(queryKeyWord);

		return query;
	}

	/**
	 * 构建高亮显示器
	 * 
	 * @param query
	 * @return
	 */
	protected Highlighter buildHighlighter(Query query) {
		// 为了显示摘要
		Scorer fragmentScore = new QueryScorer(query);

		// 高亮显示关键词
		Highlighter highlighter = new Highlighter(formatter, fragmentScore);

		highlighter.setTextFragmenter(fragmenter);

		return highlighter;
	}

	/**
	 * 构建数据结果集合
	 * 
	 * @param query
	 * @return
	 */
	protected Map<String, Object> buildDataListByScoreDocArray(int totalCount,
			Highlighter highlighter, ScoreDoc[] scoreDocArray, long startTime) {

		Map<String, Object> resultMap = new HashMap<String, Object>(8);

		totalCount = Math.min(totalCount, topMaxDataSize);

		// 总记录数
		resultMap.put("totalCount", totalCount);

		// 算出记录页数
		int pageNum = totalCount % searchPageSize == 0 ? totalCount
				/ searchPageSize : totalCount / searchPageSize + 1;

		// 总页数
		resultMap.put("pageNum", pageNum);

		List<Serializable> resultList = new ArrayList<Serializable>();
		Document document = null;
		Serializable object = null;

		// --------------遍历结果-----------------------
		try {
			logger.info("解析Document为news JavaBean");
			for (ScoreDoc scoreDoc : scoreDocArray) {
				// 当前结果的文档编号
				int docID = scoreDoc.doc;

				// 当前结果的相关度得分
				// float score = scoreDoc.score;
				// System.out.println("score is : " + score);

				// 获取Lucene文档对象
				document = indexSearcher.doc(docID);

				// 解析document文档，解析出一个JavaBean对象
				object = extract(highlighter, document);

				resultList.add(object);
			}

			// 数据
			resultMap.put("resultData", resultList);

			// 1-当前时间
			long endTime = System.currentTimeMillis();

			long spendTime = endTime - startTime;

			resultMap.put("spendTime", spendTime);

			logger.info("查询结果完毕:耗时：" + spendTime + " ms");

			return resultMap;
		} catch (CorruptIndexException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		} catch (InvalidTokenOffsetsException e) {
			e.printStackTrace();
			logger.error("error", e);
			return null;
		}

	}

	/**
	 * 解析Lucene 的Document转换为Java 的实体vo
	 * 
	 * @param document
	 * @return
	 * @throws InvalidTokenOffsetsException
	 */
	protected abstract Serializable extract(Highlighter highlighter,
			Document document) throws InvalidTokenOffsetsException, IOException;

}
