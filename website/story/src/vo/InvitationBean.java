package vo;

import org.glaze.framework.util.vo.BaseVo;

/**
 * 论坛贴子显示在Gird中的组装bean
 * <p>
 * 而不是映射数据库的bean
 * 
 * @author liuyan
 */
public class InvitationBean extends BaseVo {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvitationBean() {

	}

	private int id;

	private String title;

	private String date;

	private String userName;

	private String topicName;

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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	@Override
	public String toString() {
		return "InvitationBean [date=" + date + ", id=" + id + ", title="
				+ title + ", topicName=" + topicName + ", userName=" + userName
				+ "]";
	}
}
