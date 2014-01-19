package freemaker;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

public class CreateHTML {

	@Test
	public void test01() {
		Map<String, Object> root = new HashMap<String, Object>();
		root.put("name", "叶小钗");
		String templatesPath = "E:/IDE/Genuitec/cssws/story/WebRoot/WEB-INF/ftl";
		String templateFile = "/index.ftl";
		String htmlFile = templatesPath + "/indexFM.html";
		long now1 = System.currentTimeMillis();
		FreeMarkerUtil.analysisTemplate(templatesPath, templateFile, htmlFile,
				root);
		long now2 = System.currentTimeMillis();
		System.out.println("耗时:" + (now2 - now1) + " ms");
		
		
		long now3 = System.currentTimeMillis();
		FreeMarkerUtil.analysisTemplate(templatesPath, templateFile, htmlFile,
				root);
		long now4 = System.currentTimeMillis();
		System.out.println("耗时:" + (now4 - now3) + " ms");
	}

}
