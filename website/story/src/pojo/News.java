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
 * 新闻
 * 
 * @author liuyan
 */
@Entity
@Table(name = "news")
public class News implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public News() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "title", length = 40)
	private String title;

	@Column(name = "shrotmessage", length = 100)
	private String shrotMessage;

	@Column(name = "newscontent", length = 50000)
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private String newsContent;

	@Column(name = "newstypeId", length = 10)
	private int newsTypeId;

	@Column(name = "newtitlepic", length = 450)
	private String newTitlePic;

	@Column(name = "date")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date date;

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

	public String getShrotMessage() {
		return shrotMessage;
	}

	public void setShrotMessage(String shrotMessage) {
		this.shrotMessage = shrotMessage;
	}

	public String getNewsContent() {
		return newsContent;
	}

	public void setNewsContent(String newsContent) {
		this.newsContent = newsContent;
	}

	public int getNewsTypeId() {
		return newsTypeId;
	}

	public void setNewsTypeId(int newsTypeId) {
		this.newsTypeId = newsTypeId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getNewTitlePic() {
		return newTitlePic;
	}

	public void setNewTitlePic(String newTitlePic) {
		this.newTitlePic = newTitlePic;
	}

	@Override
	public String toString() {
		return "News [date=" + date + ", id=" + id + ", newTitlePic="
				+ newTitlePic + ", newsContent=" + newsContent + ", newsType="
				+ newsTypeId + ", shrotMessage=" + shrotMessage + ", title="
				+ title + "]";
	}

}
