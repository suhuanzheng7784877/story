<%@ page language="java"
	import="org.glaze.framework.util.ImageUtils,org.glaze.framework.util.StringUtil,java.util.Properties,java.io.IOException"
	pageEncoding="UTF-8"%>
<%
	Properties properties = new Properties();
	properties.setProperty("kaptcha.image.width", "110");
	properties.setProperty("kaptcha.image.height", "36");
	properties.setProperty("kaptcha.textproducer.font.size", "28");

	response.reset();
	response.setContentType("image/jpeg");

	//不缓存
	response.addHeader("pragma", "NO-cache");
	response.addHeader("Cache-Control", "no-cache");
	StringBuilder sb = new StringBuilder();
	byte[] bytes = ImageUtils.generateSecretKey(properties, sb);
	System.out.println("sb=" + sb);
	session.setAttribute("random4Number",sb.toString());
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
		System.out.println("调用输出图片流");
	}
%>