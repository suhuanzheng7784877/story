<%@ page language="java"
	import="org.glaze.framework.util.ImageUtils,org.glaze.framework.util.StringUtil,java.util.Properties,java.io.IOException"
	pageEncoding="UTF-8"%>
<%! 
	private final static Properties properties = new Properties();
%>	
	
<%
	long start = System.currentTimeMillis();
	properties.setProperty("kaptcha.image.width", "110");
	properties.setProperty("kaptcha.image.height", "36");
	properties.setProperty("kaptcha.textproducer.font.size", "28");

	response.reset();
	response.setContentType("image/jpeg");

	//不缓存
	response.addHeader("pragma", "NO-cache");
	response.addHeader("Cache-Control", "no-cache");
	StringBuilder sb = new StringBuilder(4);
	byte[] bytes = ImageUtils.generateSecretKey(properties, sb);
	session.setAttribute("random4Number",sb.toString());
	response.setBufferSize(2*1024);
	try {
		response.getOutputStream().write(bytes, 0, bytes.length);
		response.getOutputStream().flush();
	} catch (IOException e) {
		//e.printStackTrace();
	} catch (Exception e) {
		//e.printStackTrace();
	} finally {
		out.clear();
		out = pageContext.pushBody();
		long end = System.currentTimeMillis();
		
		System.out.println("消耗："+(end-start));
	}
%>