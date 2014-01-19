package vo;

import org.glaze.framework.util.vo.BaseVo;

public class ArticleBean extends BaseVo {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ArticleBean(){
		
	}

	private int id;

	private String title;

	private String isPass;

	private String date;

	private String name;
	
	private String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

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

	public String getIsPass() {
		return isPass;
	}

	public void setIsPass(String isPass) {
		this.isPass = isPass;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "ArticleBean [name=" + name + ", date=" + date + ", id=" + id
				+ ", isPass=" + isPass + ", title=" + title + "]";
	}

}
