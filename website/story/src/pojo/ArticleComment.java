package pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 文章评论
 * 
 * @author liuyan
 */
@Entity
@Table(name = "articlecomment")
public class ArticleComment implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ArticleComment() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "commentMessage", length = 200)
	private String commentMessage;

	@Column(name = "commentUserId")
	private int commentUserId;

	@Column(name = "date")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date date;

	@Column(name = "articleId")
	private int articleId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCommentMessage() {
		return commentMessage;
	}

	public void setCommentMessage(String commentMessage) {
		this.commentMessage = commentMessage;
	}

	public int getCommentUserId() {
		return commentUserId;
	}

	public void setCommentUserId(int commentUserId) {
		this.commentUserId = commentUserId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}

	@Override
	public String toString() {
		return "NewsComment [commentMessage=" + commentMessage
				+ ", commentUserId=" + commentUserId + ", date=" + date
				+ ", id=" + id + ", articleId=" + articleId + "]";
	}

}
