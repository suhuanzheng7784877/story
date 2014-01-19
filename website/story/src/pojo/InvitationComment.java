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
 * 贴子评论
 * 
 * @author liuyan
 */
@Entity
@Table(name = "invitationcomment")
public class InvitationComment implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvitationComment() {
		
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

	@Column(name = "invitationId")
	private int invitationId;

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

	public int getInvitationId() {
		return invitationId;
	}

	public void setInvitationId(int invitationId) {
		this.invitationId = invitationId;
	}

	@Override
	public String toString() {
		return "InvitationComment [commentMessage=" + commentMessage
				+ ", commentUserId=" + commentUserId + ", date=" + date
				+ ", id=" + id + ", invitationId=" + invitationId + "]";
	}

}
