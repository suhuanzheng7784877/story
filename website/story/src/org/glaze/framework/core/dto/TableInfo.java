package org.glaze.framework.core.dto;

import java.io.Serializable;

/**
 * 表的映射信息
 * 
 * @author liuyan
 */
public class TableInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 109278007015995890L;

	private String tablename;

	private int datacount;

	public TableInfo(String tablename, int datacount) {
		super();
		this.tablename = tablename;
		this.datacount = datacount;
	}
	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public int getDatacount() {
		return datacount;
	}

	public void setDatacount(int datacount) {
		this.datacount = datacount;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((tablename == null) ? 0 : tablename.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TableInfo other = (TableInfo) obj;
		if (tablename == null) {
			if (other.tablename != null)
				return false;
		} else if (!tablename.equals(other.tablename))
			return false;
		return true;
	}

}
