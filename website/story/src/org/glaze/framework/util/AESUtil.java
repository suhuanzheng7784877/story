package org.glaze.framework.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.log4j.Logger;

/**
 * AES加密类
 * 
 * @author liuyan
 */
public final class AESUtil {

	private final static Logger logger = Logger.getLogger(AESUtil.class);

	// 密钥位数
	private final static int keyNum = 128;

	// 加密算法类型
	private final static String enType = "AES";

	// 编码类型
	private final static String encodeType = "utf-8";

	// 固定的那个密钥，可以加载的时候替换之
	private volatile static String keycontent = "12345678";

	// 加密器
	private static Cipher cipherEn = null;

	// 加密器
	private static Cipher cipherDe = null;

	// 密钥生成器
	private static KeyGenerator kgen = null;

	// 密钥操作对象
	private static SecretKey secretKey = null;
	private static byte[] enCodeFormat = null;
	private static SecretKeySpec key = null;
	static {
		// 初始化加密的一些全局的环境变量
		try {

			// 密钥生成器
			kgen = KeyGenerator.getInstance(enType);

			// 根据密钥初始化密钥生成器
			kgen.init(keyNum, new SecureRandom(keycontent.getBytes()));

			// 密文操作对象
			cipherEn = Cipher.getInstance(enType);

			// 密文操作对象
			cipherDe = Cipher.getInstance(enType);

			secretKey = kgen.generateKey();

			enCodeFormat = secretKey.getEncoded();
			
			System.out.println("key是["+(parseByte2HexStr(enCodeFormat))+"]");
			
			key = new SecretKeySpec(enCodeFormat, enType);

			// 初始化密文操作对象
			cipherEn.init(Cipher.ENCRYPT_MODE, key);

			// 初始化
			cipherDe.init(Cipher.DECRYPT_MODE, key);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			logger.error("error", e);
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
			logger.error("error", e);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
			logger.error("error", e);
		}
	}

	/**
	 * 设置新的密钥
	 * 
	 * @param newkeycontent
	 * @return
	 */
	public synchronized static boolean setKeycontent(String newkeycontent) {
		keycontent = newkeycontent;
		return true;
	}

	/**
	 * 返回密钥
	 * 
	 * @return
	 */
	public static String getKeycontent() {
		return keycontent;
	}

	/**
	 * 加密包装器
	 * 
	 * @param 加密内容
	 *            ：content
	 * @param 密钥
	 *            ：keycontent
	 * @return
	 */
	public static String encryptWrap(String content) {
		byte[] cipherByte = encrypt(content);
		return parseByte2HexStr(cipherByte);
	}

	/**
	 * 解密包装器
	 * 
	 * @param 加密内容
	 *            ：content
	 * @param 密钥
	 *            ：keycontent
	 * @return
	 */
	public static String decryptWrap(String content) {
		byte[] decryptByte = decrypt(parseHexStr2Byte(content));
		return new String(decryptByte);
	}

	/**
	 * 加密
	 * 
	 * @param content
	 *            需要加密的内容
	 * @param password
	 *            加密密码
	 * @return
	 */
	public static byte[] encrypt(String content) {
		try {

			// 创建密码器
			byte[] byteContent = content.getBytes(encodeType);

			byte[] result = cipherEn.doFinal(byteContent);

			return result;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 解密
	 * 
	 * @param content
	 *            待解密内容
	 * @param password
	 *            解密密钥
	 * @return
	 */
	public static byte[] decrypt(byte[] content) {
		try {

			byte[] result = cipherDe.doFinal(content);
			return result; // 解密
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 将二进制转换成16进制
	 * 
	 * @param buf
	 * @return
	 */
	public static String parseByte2HexStr(byte buf[]) {
		StringBuilder sb = new StringBuilder(32);

		int bufLength = buf.length;
		String hex = null;
		for (int i = 0; i < bufLength; i++) {
			hex = Integer.toHexString(buf[i] & 0xFF);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			sb.append(hex);
		}
		return sb.toString();
	}

	/**
	 * 将16进制转换为二进制
	 * 
	 * @param hexStr
	 * @return
	 */
	public static byte[] parseHexStr2Byte(String hexStr) {
		if (hexStr.length() < 1)
			return null;

		byte[] result = new byte[hexStr.length() / 2];
		for (int i = 0; i < hexStr.length() / 2; i++) {
			int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
			int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2),
					16);
			result[i] = (byte) (high * 16 + low);
		}
		return result;
	}

	/**
	 * 测试用例
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println("未使用包装器...");
		// 明文
		String content = "1234567890abcdef";
		// 加密
		System.out.println("加密前：" + content);
		byte[] encryptResult = encrypt(content);
		System.out.println("密文是：" + new String(encryptResult));
		// 解密
		byte[] decryptResult = decrypt(encryptResult);
		System.out.println("解密后：" + new String(decryptResult));
		
		System.out.println("使用包装器...");
		
		// 明文
		String content2 = "1234567890abcdef";
		// 加密
		System.out.println("加密前：" + content2);
		String encryptResult2 = encryptWrap(content);
		System.out.println("密文是：" + new String(encryptResult2));
		// 解密
		String decryptResult2 = decryptWrap(encryptResult2);
		System.out.println("解密后：" + new String(decryptResult2));
		
		
		
	}

}
