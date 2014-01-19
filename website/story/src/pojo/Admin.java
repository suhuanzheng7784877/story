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
 * 管理员
 * @author liuyan 
 */
@Entity
@Table(name = "admin")
public class Admin implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Admin() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "adminname", length = 40)
	private String adminName;

	@Column(name = "password", length = 40)
	private String password;

	@Column(name = "logindate")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date loginDate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getLoginDate() {
		return loginDate;
	}

	public void setLoginDate(Date loginDate) {
		this.loginDate = loginDate;
	}

	@Override
	public String toString() {
		return "Admin [adminName=" + adminName + ", id=" + id + ", loginDate="
				+ loginDate + ", password=" + password + "]";
	}

}
