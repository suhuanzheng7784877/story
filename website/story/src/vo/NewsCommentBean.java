package vo;

import java.util.Date;

import org.glaze.framework.util.vo.BaseVo;

/**
 * 显示在grid的数据javabean
 * @since 1.0 :使用全反射方法
 * @see org.glaze.framework.util.orm.AnalystResultSet
 * @author liuyan
 */
public class NewsCommentBean extends BaseVo {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public NewsCommentBean(){
		
	}

	private int id;

	private String title;

	private String name;

	private String commentMessage;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCommentMessage() {
		return commentMessage;
	}

	public void setCommentMessage(String commentMessage) {
		this.commentMessage = commentMessage;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "NewsCommentBean [commentMessage=" + commentMessage + ", date="
				+ date + ", id=" + id + ", name=" + name + ", title=" + title
				+ "]";
	}

}
