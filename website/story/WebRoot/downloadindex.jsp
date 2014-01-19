<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>下载</title>
		<script type="text/javascript">
		function opendownlod() {
			window
					.open(
							'mp3store/Remember.mp3',
							'下载文件',
							'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no')
		}
		</script>
	</head>

	<body>
		<a href="javascript:opendownlod()">[下载]</a>
		<br>
	</body>

</html>
