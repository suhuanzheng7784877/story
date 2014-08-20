package util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

import org.glaze.framework.util.ImageUtils;
import org.glaze.framework.util.StringUtil;
import org.junit.Test;

import pojo.Admin;

public class Image {

	@Test
	public void test01() {

		StringBuilder outString = StringUtil.generateRandom4Number();

		byte[] bytes = ImageUtils.generateByteArray(null, outString.toString());

		File file = new File("c:/1.jpg");
		try {
			FileOutputStream fileOut = new FileOutputStream(file);
			fileOut.write(bytes);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@Test
	public void test02() {
		String a = "liuyan";

		int h = a.hashCode();
		h ^= (h >>> 20) ^ (h >>> 12);
		int aaa = h ^ (h >>> 7) ^ (h >>> 4);
		int index = aaa & (16 - 1);
		System.out.println(index);
		
		Vector c = new Vector();
	}
	
	@Test
	public void test03(){
		Map map = new HashMap();
		Admin admin = new Admin();
		admin.setId(1);
		admin.setAdminName("admin111");
		admin.setLoginDate(new Date());
		admin.setPassword("123456");
		map.put("admin111", admin);
		System.out.println("1:"+admin);
		
		admin.setAdminName("liuyan");
		Admin admin2 = (Admin)map.get("admin111");
		System.out.println("1:"+admin);
		System.out.println("2:"+admin2);
		
		
		Map map2 = new ConcurrentHashMap();
		map2.put("admin111", admin);
		Admin admin3 = (Admin)map2.get("admin111");
		admin3.setAdminName("刘岩");
		admin2.setPassword("999999");
		System.out.println("1:"+admin);
		System.out.println("2:"+admin2);
		System.out.println("3:"+admin3);
	}

}
