package lucene.controller;

import java.util.HashMap;
import java.util.Map;

import lucene.AbstractSearchData;
import lucene.search.ArticleSearchData;
import lucene.search.InvitationSearchData;
import lucene.search.NewsSearchData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import constants.SystemConstants;

/**
 * 全文检索搜索
 * @author liuyan
 */
@Controller
@RequestMapping("/search")
public class SearchController {

	@Autowired
	private ArticleSearchData articleSearchData;

	@Autowired
	private InvitationSearchData invitationSearchData;

	@Autowired
	private NewsSearchData newsSearchData;

	/**
	 * 搜索新闻
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/search.action", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> search(
			@RequestParam(required = false, defaultValue = "invitation") String searchtype,
			@RequestParam(required = false, defaultValue = "") String queryKeyWord,
			@RequestParam(required = false, defaultValue = "1") int page) {

		AbstractSearchData abstractSearchData = null;

		if ("invitation".equals(searchtype)) {
			abstractSearchData = invitationSearchData;
		} else if ("article".equals(searchtype)) {
			abstractSearchData = articleSearchData;
		} else if ("news".equals(searchtype)) {
			abstractSearchData = newsSearchData;
		}

		int startNum = (page - 1) * SystemConstants.searchPageSize;

		try {
			return abstractSearchData.search(queryKeyWord, startNum);
		} catch (Exception e) {
			e.printStackTrace();
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("error", "error");
			return resultMap;
		}
	}

}
