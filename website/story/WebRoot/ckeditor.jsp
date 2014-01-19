<!DOCTYPE unspecified PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor"%>
<script type="text/javascript" src="ckeditor/ckeditor.js">
</script>
<html>
	<body>
		<form action="sample_posteddata.jsp" method="get">
			<p>
				<label for="editor1">
					Editor 1:
				</label>
				<textarea cols="80" id="editor1" name="editor1" rows="10"></textarea>


			</p>
			<p>
				<input type="submit" value="Submit" />
			</p>	
		</form>

		<script type="text/javascript">
			<!--编辑图片上传-->
			CKEDITOR.replace('editor1',{
				filebrowserUploadUrl : '/ckeditor/ckeditor/uploader?Type=File',
				filebrowserImageUploadUrl : '/ckeditor/ckeditor/uploader?Type=Image',
				filebrowserFlashUploadUrl : '/ckeditor/ckeditor/uploader?Type=Flash'
			});
		</script>

	</body>



</html>
