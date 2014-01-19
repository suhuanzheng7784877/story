package vo;

import java.util.Date;

import org.glaze.framework.util.vo.BaseVo;

/**
 * 显示在grid的数据javabean
 * @since 1.0 :使用全反射方法
 * @see org.glaze.framework.util.orm.AnalystResultSet
 * @author liuyan
 */
public class NewsBean extends BaseVo {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public NewsBean(){
		
	}

	private int id;

	private String title;

	private String typeTitle;

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
	
	public String getTypeTitle() {
		return typeTitle;
	}

	public void setTypeTitle(String typeTitle) {
		this.typeTitle = typeTitle;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "NewsBean [date=" + date + ", id=" + id + ", newsType="
				+ typeTitle + ", title=" + title + "]";
	}
}
