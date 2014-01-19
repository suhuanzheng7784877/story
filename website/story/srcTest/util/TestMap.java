package util;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.junit.Test;

public class TestMap {
	static int num = 400;

	@Test
	public void testMapTime() {
		long start1 = System.currentTimeMillis();
		for (int i = num; i > 0; i--) {
			Map<String, String> map1 = new LinkedHashMap<String, String>(8,
					0.75F);
			map1.put("1", "1");
			map1.put("2", "2");
			map1.put("3", "3");
			map1.put("4", "4");
			map1.put("5", "5");
			Set<String> keys1 = map1.keySet();
			for (String key : keys1) {
				//System.out.println(key);
			}
		}

		long end1 = System.currentTimeMillis();
		System.out.println("LinkedHashMap耗时：" + (end1 - start1) + "ms");

		long start2 = System.currentTimeMillis();
		for (int i = num; i > 0; i--) {
			Map<String, String> map2 = new HashMap<String, String>(8, 0.75F);
			map2.put("1", "1");
			map2.put("2", "2");
			map2.put("3", "3");
			map2.put("4", "4");
			map2.put("4", "4");
			Set<String> keys2 = map2.keySet();

			for (String key : keys2) {
				//System.out.println(key);
			}
		}
		long end2 = System.currentTimeMillis();
		System.out.println("HashMap      耗时：" + (end2 - start2) + "ms");

	}

}
