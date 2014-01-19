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
@Table(name = "newstype")
public class NewsType implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NewsType() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "typeTitle", length = 10)
	private String typeTitle;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTypeTitle() {
		return typeTitle;
	}

	public void setTypeTitle(String typeTitle) {
		this.typeTitle = typeTitle;
	}

	@Override
	public String toString() {
		return "NewsType [id=" + id + ", typeTitle=" + typeTitle + "]";
	}

}
