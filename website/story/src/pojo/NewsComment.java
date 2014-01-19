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
 * 新闻评论
 * 
 * @author liuyan
 */
@Entity
@Table(name = "newscomment")
public class NewsComment implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NewsComment() {
		
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

	@Column(name = "newsId")
	private int newsId;

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

	public int getNewsId() {
		return newsId;
	}

	public void setNewsId(int newsId) {
		this.newsId = newsId;
	}

	@Override
	public String toString() {
		return "NewsComment [commentMessage=" + commentMessage
				+ ", commentUserId=" + commentUserId + ", date=" + date
				+ ", id=" + id + ", newsId=" + newsId + "]";
	}

}
