package controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.glaze.framework.util.ProjectInfoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import util.cache.ContentPageWriter;

@Controller
@RequestMapping("/staticpage")
public class StaticPageController {

	private static Logger logger = Logger.getLogger(StaticPageController.class);

	@Autowired
	private ContentPageWriter contentPageWriter;

	public ContentPageWriter getContentPageWriter() {
		return contentPageWriter;
	}

	public void setContentPageWriter(ContentPageWriter contentPageWriter) {
		this.contentPageWriter = contentPageWriter;
	}

	@RequestMapping(value = "/updateIndex.action")
	@ResponseBody
	public boolean updateIndex(HttpServletRequest request) {

		// 1-获取静态页面相关路径
		// 项目的绝对路径
		String projectRealPath = ProjectInfoUtil.getProjectRealPath(request);

		// ftl模板的绝对路径
		String templatePath = ProjectInfoUtil.getTemplatePath(projectRealPath);

		// 生成静态页面后的文件路径以及名字
		String staticFileName = projectRealPath + "index.html";

		logger.info("Generate staticFileName path:" + staticFileName);

		// 2-获取主页的动态数据
		Map<String, Object> pageData = contentPageWriter.refreshIndexData();
		
		// 结果
		
		// 3-调用方法，生成静态页面
		boolean result = ContentPageWriter.analysisAndGenerateTemplate(templatePath,
				ContentPageWriter.templateName, staticFileName, pageData);

		return result;
	}
}
