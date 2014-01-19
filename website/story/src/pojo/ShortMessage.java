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
 * 站内短信息
 * 
 * @author liuyan
 */
@Entity
@Table(name = "shortmessage")
public class ShortMessage implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ShortMessage() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "title", length = 20)
	private String title;

	@Column(name = "message", length = 50)
	private String message;

	@Column(name = "sendUserId", length = 50)
	private int sendUserId;

	@Column(name = "toUserId", length = 50)
	private int toUserId;

	@Column(name = "date")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date date;

	@Column(name = "isread")
	private boolean isRead;

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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getSendUserId() {
		return sendUserId;
	}

	public void setSendUserId(int sendUserId) {
		this.sendUserId = sendUserId;
	}

	public int getToUserId() {
		return toUserId;
	}

	public void setToUserId(int toUserId) {
		this.toUserId = toUserId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public boolean isRead() {
		return isRead;
	}

	public void setRead(boolean isRead) {
		this.isRead = isRead;
	}

	@Override
	public String toString() {
		return "ShortMessage [date=" + date + ", id=" + id + ", isRead="
				+ isRead + ", message=" + message + ", title=" + title + "]";
	}

}
