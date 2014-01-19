package pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 论坛话题
 * 
 * @author liuyan
 */
@Entity
@Table(name = "topic")
public class Topic implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Topic() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "topictitle", length = 10)
	private String topicTitle;

	@Column(name = "topicintro", length = 40)
	private String topicIntro;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTopicTitle() {
		return topicTitle;
	}

	public void setTopicTitle(String topicTitle) {
		this.topicTitle = topicTitle;
	}

	public String getTopicIntro() {
		return topicIntro;
	}

	public void setTopicIntro(String topicIntro) {
		this.topicIntro = topicIntro;
	}

	@Override
	public String toString() {
		return "Topic [id=" + id + ", topicIntro=" + topicIntro
				+ ", topicTitle=" + topicTitle + "]";
	}

}
