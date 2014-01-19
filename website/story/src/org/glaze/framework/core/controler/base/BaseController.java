package org.glaze.framework.core.controler.base;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.glaze.framework.core.persistent.base.BaseDao;

/**
 * 基控制层
 * @author liuyan
 */
public abstract class BaseController {

	/**
	 * 给界面拼装反馈的数据Map,为了计算分页，将dao的countNumJPQLQuick计算在其中,
	 * 无条件显示所有记录之后进行本地数据库记录结果集分页
	 * 
	 * @param articleList
	 * @param page
	 * @param records
	 * @param total
	 * @return
	 */
	@SuppressWarnings( { "unchecked" })
	protected Map<String, Object> buildResponseMap(BaseDao dao, List list,
			int page, int rows) {

		// 总记录数
		long records = dao.countNumCache();

		// 总页数
		long total = records % rows == 0 ? records / rows : records / rows + 1;

		Map map = new HashMap(8, 0.75F);
		// 数据结果集
		map.put("result", list);

		// 当前页数
		map.put("page", page);

		// 总页数
		map.put("total", total);

		// 总记录数
		map.put("records", records);
		return map;
	}

	/**
	 * 给界面拼装反馈的数据Map,为了计算分页，将dao的countNumJPQLQuick计算在其中,
	 * 有条件条件显示所有记录之后进行本地数据库记录结果集分页
	 * 
	 * @param articleList
	 * @param page
	 * @param records
	 * @param total
	 * @return
	 */
	@SuppressWarnings( { "unchecked" })
	protected Map<String, Object> buildResponseMap(BaseDao dao, List list,
			int page, int rows, String serchType,
			Map<String, Object> conditionMap) {

		// 总记录数
		long records = dao.countNumJPQLQuick(serchType, conditionMap);

		// 总页数
		long total = records % rows == 0 ? records / rows : records / rows + 1;
		
		if (total < page) {
			page = 1;
		}
		Map<String, Object> map = new HashMap<String, Object>(8, 0.75f);

		// 数据结果集
		map.put("result", list);

		// 当前页数
		map.put("page", page);

		// 总页数
		map.put("total", total);

		// 每页记录数
		map.put("records", records);
		return map;
	}

	/**
	 * 构建符合条件的map，用于hibernate的查询条件
	 * 
	 * @param conditionMap
	 */
	protected void buildConditionMap(Map<String, Object> conditionMap) {
		int conditionMapSize = conditionMap.size();
		if (conditionMap == null || 0 == conditionMapSize) {
			return;
		}

		Set<String> keys = conditionMap.keySet();

		Iterator<String> keysIterator = keys.iterator();

		while (keysIterator.hasNext()) {

			String key = keysIterator.next();

			String value = (String) conditionMap.get(key);
			if (value == null || "".equals(value) || "serchType".equals(key)
					|| "sord".equals(key) || "page".equals(key)
					|| "nd".equals(key) || "sidx".equals(key)
					|| "_search".equals(key) || "rows".equals(key)) {
				keysIterator.remove();
			}

		}

	}

	/**
	 * 查询条件过滤后的总记录数
	 * 
	 * @param dao
	 * @param sql
	 * @param list
	 * @param page
	 * @param rows
	 * @param serchType
	 * @param conditionMap
	 * @return
	 */
	@SuppressWarnings( { "unchecked" })
	protected Map<String, Object> buildSearchResponseMap(long allrecords,
			List list, int page, int rows, String serchType,
			Map<String, Object> conditionMap) {

		// 总页数
		long total = allrecords % rows == 0 ? allrecords / rows : allrecords
				/ rows + 1;
		
		if (total < page) {
			page = 1;
		}
		
		Map<String, Object> map = new HashMap<String, Object>(8, 0.75f);

		// 数据结果集
		map.put("result", list);

		// 当前页数
		map.put("page", page);

		// 总页数
		map.put("total", total);

		// 每页记录数
		map.put("records", allrecords);
		return map;
	}

}
