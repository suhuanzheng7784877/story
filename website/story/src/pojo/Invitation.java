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
 * 论坛贴子
 * 
 * @author liuyan
 */
@Entity
@Table(name = "invitation")
public class Invitation implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	

	public Invitation() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "title", length = 40)
	private String title;

	@Column(name = "content", length = 10000)
	private String content;

	@Column(name = "date")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date date;

	@Column(name = "userId")
	private int userId;

	@Column(name = "topicId")
	private int topicId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getTopicId() {
		return topicId;
	}

	public void setTopicId(int topicId) {
		this.topicId = topicId;
	}

	@Override
	public String toString() {
		return "Invitation [content=" + content + ", date=" + date + ", id="
				+ id + ", title=" + title + ", topicId=" + topicId
				+ ", userId=" + userId + "]";
	}

}
