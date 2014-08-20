package org.glaze.framework.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Properties;

import javax.imageio.ImageIO;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;

/**
 * 二进制图片输出相关辅助类
 * 
 * @author liuyan
 */
public class ImageUtils {

	private final static DefaultKaptcha defaultKaptcha = new DefaultKaptcha();

	/**
	 * 生成二进制的4位随机码
	 * 
	 * @return
	 */
	public final static byte[] generateSecretKey(StringBuilder sb) {

		StringBuilder secretKey = StringUtil.generateRandom4Number();
		sb.append(secretKey);
		return generateByteArray(null, secretKey.toString());
	}

	/**
	 * 生成二进制的4位随机码
	 * 
	 * @return
	 */
	public final static byte[] generateSecretKey(Properties properties,
			StringBuilder sb) {

		StringBuilder secretKey = StringUtil.generateRandom4Number();
		sb.append(secretKey);
		return generateByteArray(properties, secretKey.toString());
	}

	/**
	 * 使用google code输出二进制
	 * 
	 * @param properties
	 * @param outString
	 * @return
	 */
	public final static byte[] generateByteArray(Properties properties,
			String outString) {

		synchronized (defaultKaptcha) {
			if (properties == null) {
				defaultKaptcha.setConfig(new Config(new Properties()));
			} else {
				defaultKaptcha.setConfig(new Config(properties));
			}
		}

		BufferedImage bufferedImage = defaultKaptcha.createImage(outString);

		ByteArrayOutputStream out = new ByteArrayOutputStream(2*1024);

		try {
			ImageIO.write(bufferedImage, "jpg", out);
			return out.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} finally {
			bufferedImage.flush();
			bufferedImage = null;
			try {
				if (out != null) {
					out.close();
					out = null;
				}

			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		}

	}

}
