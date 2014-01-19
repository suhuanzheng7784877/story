package dao;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import t.Person;

public class TestMybatise {

	// 日志
	public final static Logger logger = Logger.getLogger(TestMybatise.class);

	ExecutorService pool = Executors.newFixedThreadPool(100);
	int sumThread = 1000000;

	static final AtomicInteger atomicInteger = new AtomicInteger(0);

	@Test
	public void testMyb() {

		try {
			ApplicationContext context = new ClassPathXmlApplicationContext(
					"config/applicationContext-dao-mybatis.xml");
			MyUserService myUserService = (MyUserService) context
					.getBean("userService");
			
			
			Thread.sleep(10000L);
			
			for (int j = 0; j < sumThread; j++) {
				Thread t = new SelectMyRun(myUserService);
				pool.execute(t);

			}

			while (true) {
				Thread.sleep(Integer.MAX_VALUE);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Test
	public void testHiber() {

		try {
			ApplicationContext context = new ClassPathXmlApplicationContext(
					"config/applicationContext-dao-mybatis.xml");
			MyUserDao myUserDao = (MyUserDao) context
					.getBean("hiberUserDaoImpl");
			
			Thread.sleep(10000L);
			
			for (int j = 0; j < sumThread; j++) {
				Thread t = new SelectHiberRun(myUserDao);
				pool.execute(t);

			}

			while (true) {
				Thread.sleep(Integer.MAX_VALUE);
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
		}

	}

}

class SelectMyRun extends Thread {

	private MyUserService myUserService;

	public SelectMyRun(MyUserService myUserService) {
		this.myUserService = myUserService;
	}

	@Override
	public void run() {
		String threadId = "" + Thread.currentThread().getId();
		int sum = 1;
		for (int i = 1; i <= sum; i++) {
			long start1 = System.currentTimeMillis();
			Person person = myUserService.selectOne(i);
			System.out.println(person);
			long end1 = System.currentTimeMillis();
			/*
			System.out.println("线程：" + threadId + "  mybatise:第" + i + "次耗时："
					+ (end1 - start1) + "ms,atomicInteger:"
					+ TestMybatise.atomicInteger);
					*/

			TestMybatise.logger.info("线程：" + threadId + "  mybatise:第" + i
					+ "次耗时：" + (end1 - start1) + "ms,atomicInteger:"
					+ TestMybatise.atomicInteger);

		}
		TestMybatise.atomicInteger.incrementAndGet();
	}

}

class SelectHiberRun extends Thread {

	private MyUserDao myUserDao;

	public SelectHiberRun(MyUserDao myUserDao) {
		this.myUserDao = myUserDao;
	}

	@Override
	public void run() {
		String threadId = "" + Thread.currentThread().getId();
		int sum = 1;
		for (int i = 1; i <= sum; i++) {
			long start1 = System.currentTimeMillis();
			Person person = myUserDao.selectOneHiber(i);
			System.out.println(person);
			long end1 = System.currentTimeMillis();
			System.out.println("线程：" + threadId + "  hibernate:第" + i + "次耗时："
					+ (end1 - start1) + "ms,atomicInteger:"
					+ TestMybatise.atomicInteger);

			TestMybatise.logger.info("线程：" + threadId + "  hibernate:第" + i
					+ "次耗时：" + (end1 - start1) + "ms,atomicInteger:"
					+ TestMybatise.atomicInteger);
		}
		TestMybatise.atomicInteger.incrementAndGet();
	}

}
