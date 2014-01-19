package pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 音频
 * 
 * @author liuyan
 */
@Entity
@Table(name = "storymp3")
public class StoryMp3 implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public StoryMp3() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "mp3url", length = 450)
	private String mp3url;

	@Column(name = "downloadcount", length = 9)
	private int downloadcount;

	@Column(name = "title", length = 30)
	private String title;

	@Column(name = "message", length = 20000)
	@Basic(fetch = FetchType.LAZY)
	@Lob
	private String message;

	@Column(name = "needscore", length = 2)
	private int needscore;

	@Column(name = "date")
	@Temporal(value = TemporalType.DATE)
	private Date date;

	@Column(name = "titlepicurl", length = 450)
	private String titlePicUrl;

	/*
	 * @ManyToMany(fetch = FetchType.LAZY)
	 * 
	 * @JoinTable(name = "storymp3downloadusers", joinColumns = {
	 * @JoinColumn(name = "storymp3id") }, inverseJoinColumns = {
	 * @JoinColumn(name = "userid") }) private List<User> downloadUsers;
	 */
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMp3url() {
		return mp3url;
	}

	public void setMp3url(String mp3url) {
		this.mp3url = mp3url;
	}

	public int getDownloadcount() {
		return downloadcount;
	}

	public void setDownloadcount(int downloadcount) {
		this.downloadcount = downloadcount;
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

	public int getNeedscore() {
		return needscore;
	}

	public void setNeedscore(int needscore) {
		this.needscore = needscore;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getTitlePicUrl() {
		return titlePicUrl;
	}

	public void setTitlePicUrl(String titlePicUrl) {
		this.titlePicUrl = titlePicUrl;
	}

	@Override
	public String toString() {
		return "StoryMp3 [date=" + date + ", downloadcount=" + downloadcount
				+ ", id=" + id + ", message=" + message + ", mp3url=" + mp3url
				+ ", needscore=" + needscore + ", title=" + title
				+ ", titlePicUrl=" + titlePicUrl + "]";
	}

}
