package freemaker;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;

//省略包的导入
public class FreeMarkerUtil {

	final static Configuration config = new Configuration();

	static Template template = null;

	// templatePath模板文件存放路径
	// templateName 模板文件名称
	// filename 生成的文件名称
	public static void analysisTemplate(String templatePath,
			String templateName, String fileName, Map<?, ?> root) {
		try {

			// 获取模板,并设置编码方式，这个编码必须要与页面中的编码格式一致
			// 否则会出现乱码
			config.setDirectoryForTemplateLoading(new File(
					"E:/IDE/Genuitec/cssws/story/WebRoot/WEB-INF/ftl"));
			config.setObjectWrapper(new DefaultObjectWrapper());
			template = config.getTemplate("/index.ftl", "UTF-8");

			// 合并数据模型与模板
			OutputStream fos = new FileOutputStream(fileName, true);
			Writer out = new BufferedWriter(
					new OutputStreamWriter(fos, "UTF-8"), 50 * 1024);

			// Writer out =new OutputStreamWriter(fos, "UTF-8");

			template.process(root, out);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}
}
