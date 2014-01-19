package org.glaze.framework.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import constants.SystemConstants;

/**
 * 关于数组的辅助类
 * 
 * @author liuyan
 */
public class GlazeArrayUtils {
	
	/**
	 * 非原始数组是否要扩容
	 * 
	 * @param sourceArray
	 * @param index
	 */
	public static <T>T[] ensureCapacity(T[] sourceArray, int index) {

		// 原始数组大小
		int oldCapacity = sourceArray.length;

		// 需要的位置
		int nowNeedCapacity = index + 1;

		// 需要扩容
		if (oldCapacity < nowNeedCapacity) {
			int newCapacity = (oldCapacity * 2);
			sourceArray = Arrays.copyOf(sourceArray, newCapacity);

		}

		return sourceArray;

	}
	
	/**
	 * 原始数组是否要扩容
	 * 
	 * @param sourceArray
	 * @param index
	 */
	public static int[] ensureCapacity(int[] sourceArray, int index) {

		// 原始数组大小
		int oldCapacity = sourceArray.length;

		// 需要的位置
		int nowNeedCapacity = index + 1;

		// 需要扩容
		if (oldCapacity < nowNeedCapacity) {
			int newCapacity = (oldCapacity * 2) ;
			sourceArray = Arrays.copyOf(sourceArray, newCapacity);

		}

		return sourceArray;

	}

	public static void main(String[] args) {
		int sum = 10000000;
		List<String> stringList = new ArrayList<String>(10);
		String[] ids = new String[SystemConstants.BigArrayInitSize];
		long start1 = System.currentTimeMillis();
		for (int i = sum; i > 0; i--) {
			stringList.add(i + "");
		}
		long end1 = System.currentTimeMillis();
		
		
		
		int j = 0;
		
		
		long start2 = System.currentTimeMillis();
		for (int i = sum; i > 0; i--) {
			// 原始数组是否要扩容
			ids = GlazeArrayUtils.ensureCapacity(ids, i);
			ids[j] = i + "";
			j++;
		}
		long end2 = System.currentTimeMillis();
		System.out.println("List耗时："+(start1-end1)+"ms");
		System.out.println(" 数组耗时："+(start2-end2)+"ms");
	}
}
