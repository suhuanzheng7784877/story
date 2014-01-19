package vo;

import org.glaze.framework.util.vo.BaseVo;

public class ArticleCommentBean extends BaseVo {

	private static final long serialVersionUID = 1L;
	
	public ArticleCommentBean(){
		
	}

	private int commentId;

	private String title;

	private String commentUserName;

	private String commentMessage;

	private String commentDate;

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getCommentUserName() {
		return commentUserName;
	}

	public void setCommentUserName(String commentUserName) {
		this.commentUserName = commentUserName;
	}

	public String getCommentMessage() {
		return commentMessage;
	}

	public void setCommentMessage(String commentMessage) {
		this.commentMessage = commentMessage;
	}

	public String getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(String commentDate) {
		this.commentDate = commentDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "ArticleCommentBean [commentDate=" + commentDate
				+ ", commentId=" + commentId + ", commentMessage="
				+ commentMessage + ", commentUserName=" + commentUserName
				+ ", title=" + title + "]";
	}

}
