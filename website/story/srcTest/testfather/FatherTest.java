package testfather;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class FatherTest {

	public static ApplicationContext springAppContent = null;

	static {
		String[] springPath = { "config/applicationContext-dao.xml",
				"config/applicationContext.xml","config/applicationContext-lucene.xml" };
		springAppContent = new ClassPathXmlApplicationContext(springPath);
	}

}
