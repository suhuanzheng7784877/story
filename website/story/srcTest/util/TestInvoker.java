package util;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import net.sf.cglib.reflect.FastClass;
import net.sf.cglib.reflect.FastMethod;

import org.junit.Test;

import vo.NewsBean;

public class TestInvoker {

	static int rollerNum = 10000;

	public static interface Getter {
		Object get(Object obj);
	}

	public static interface Setter {
		void set(Object obj, Object value);
	}

	Map<String, Object> map = new ConcurrentHashMap<String, Object>();
	
	@Test
	public void testConstra() throws ClassNotFoundException,
			CloneNotSupportedException, InstantiationException,
			IllegalAccessException {

		NewsBean newsBean = new NewsBean();
		map.put("vo.NewsBean", newsBean);

		long startTime1 = System.currentTimeMillis();
		for (int i = 0; i < rollerNum; i++) {
			Class clazz = Class.forName("vo.NewsBean");
			Object o = clazz.newInstance();
		}
		long endTime1 = System.currentTimeMillis();
		System.out.println("反射耗时:" + (endTime1 - startTime1) + "ms");

		long startTime2 = System.currentTimeMillis();
		for (int i = 0; i < rollerNum; i++) {
			NewsBean object = (NewsBean) map.get("vo.NewsBean");
			Object o = object.clone();
		}
		long endTime2 = System.currentTimeMillis();
		System.out.println("克隆耗时:" + (endTime2 - startTime2) + "ms");
	}

	@Test
	public void testInvoke2() {
		Setter setter = Invokers.newInvoker(Setter.class, NewsBean.class,
				"setTitle", new Class<?>[] { String.class }, null);

		NewsBean newsBean = new NewsBean();

		long startTime = System.currentTimeMillis();
		for (int i = 0; i < rollerNum; i++) {
			setter.set(newsBean, "aaa");
		}
		long endTime = System.currentTimeMillis();
		System.out.println("耗时:" + (endTime - startTime) + "ms");

	}

	@Test
	public void testInvoke() {
		try {
			// 创建getter调用器，用于调用getTime方法
			Getter getter = Invokers.newInvoker(Getter.class, Date.class,
					"getTime", null, Long.TYPE);
			// 创建setter调用器，用于调用setTime方法
			Setter setter = Invokers.newInvoker(Setter.class, Date.class,
					"setTime", new Class<?>[] { Long.TYPE }, null);
			Date date = new Date();
			System.out.println("time=" + getter.get(date));
			setter.set(date, 33333333L);
			System.out.println("time1=" + getter.get(date));
			Method getTime = Date.class.getMethod("getTime");
			Method setTime = Date.class.getMethod("setTime", Long.TYPE);
			getTime.setAccessible(true);
			setTime.setAccessible(true);
			FastClass fastClass = FastClass.create(Date.class);
			FastMethod fastGetTime = fastClass.getMethod(getTime);
			FastMethod fastSetTime = fastClass.getMethod(setTime);
			System.out.println("time2=" + getTime.invoke(date));
			long t = System.currentTimeMillis();
			for (int i = 0; i < rollerNum; i++) {
				date.setTime(33333333L);
				date.getTime();
			}
			long t1 = System.currentTimeMillis();
			System.out.println("直接调用耗时：" + (t1 - t) + "ms");
			t1 = System.currentTimeMillis();
			for (int i = 0; i < rollerNum; i++) {
				setter.set(date, 33333333L);
				getter.get(date);
			}
			long t2 = System.currentTimeMillis();
			System.out.println("Invokers调用耗时：" + (t2 - t1) + "ms");
			t2 = System.currentTimeMillis();
			for (int i = 0; i < rollerNum; i++) {
				setTime.invoke(date, 6666666L);
				getTime.invoke(date);
			}
			long t3 = System.currentTimeMillis();
			System.out.println("JDK反射调用耗时：" + (t3 - t2) + "ms");
			t3 = System.currentTimeMillis();
			for (int i = 0; i < rollerNum; i++) {
				fastSetTime.invoke(date, new Object[] { 6666666L });
				fastGetTime.invoke(date, new Object[] {});
			}
			long t4 = System.currentTimeMillis();
			System.out.println("FastMethod调用耗时：" + (t4 - t3) + "ms");
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}

}
