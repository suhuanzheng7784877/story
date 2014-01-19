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
 * 用户信息
 * 
 * @author liuyan
 */
@Entity
@Table(name = "userinfo")
public class UserInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserInfo() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "nickname", length = 30)
	private String nickname = "";

	@Column(name = "birthday")
	@Temporal(value = TemporalType.DATE)
	private Date birthday = new Date();

	@Column(name = "sex", length = 10)
	private String sex = "0";

	@Column(name = "work", length = 40)
	private String work = "";

	@Column(name = "website", length = 150)
	private String website = "";

	@Column(name = "usermess", length = 400)
	private String usermess = "";

	@Column(name = "userheadurl", length = 100)
	private String userheadurl = "";

	@Column(name = "shortmotto", length = 40)
	private String shortmotto = "";

	@Column(name = "score", length = 8)
	private int score = 10;

	@Column(name = "experience", length = 10)
	private int experience = 10;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getWork() {
		return work;
	}

	public void setWork(String work) {
		this.work = work;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getUsermess() {
		return usermess;
	}

	public void setUsermess(String usermess) {
		this.usermess = usermess;
	}

	public String getUserheadurl() {
		return userheadurl;
	}

	public void setUserheadurl(String userheadurl) {
		this.userheadurl = userheadurl;
	}

	public String getShortmotto() {
		return shortmotto;
	}

	public void setShortmotto(String shortmotto) {
		this.shortmotto = shortmotto;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	@Override
	public String toString() {
		return "UserInfo [birthday=" + birthday + ", experience=" + experience
				+ ", id=" + id + ", nickname=" + nickname + ", score=" + score
				+ ", sex=" + sex + ", shortmotto=" + shortmotto
				+ ", userheadurl=" + userheadurl + ", usermess=" + usermess
				+ ", website=" + website + ", work=" + work + "]";
	}

}
