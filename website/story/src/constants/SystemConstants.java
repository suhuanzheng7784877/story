package constants;

import org.glaze.framework.util.PropertiesUtil;

/**
 * 常量表信息
 * @author 刘岩
 */
public class SystemConstants {
	
	public static final String projectAbsolutePath = "";
	
	//系统编码
	public static final String echo = "UTF-8";
	
	public static final int searchPageSize = Integer.parseInt(PropertiesUtil
			.getValue("story.lucene.search.pagesize"));

	/**
	 * stringbuilder的初始大小
	 */
	public static final int StringBuilderInitSize = Integer.parseInt(PropertiesUtil
			.getValue("core.StringBuilder.InitSize"));
	
	/**
	 * stringbuilder的初始大小
	 */
	public static final int BigArrayInitSize = Integer.parseInt(PropertiesUtil
			.getValue("core.BigArray.InitSize"));

}
