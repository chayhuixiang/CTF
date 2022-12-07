package StackTheFlags.misc_2_pain;

import java.security.MessageDigest;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import java.security.SecureRandom;

public class Test {
  public static String releasepain(byte[] bArr, String str) throws Exception {
    byte[] bArr2 = new byte[16];
    System.arraycopy(bArr, 0, bArr2, 0, 16);
    IvParameterSpec ivParameterSpec = new IvParameterSpec(bArr2);
    int length = bArr.length - 16;
    byte[] bArr3 = new byte[length];
    System.arraycopy(bArr, 16, bArr3, 0, length);
    byte[] bArr4 = new byte[16];
    MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
    messageDigest.update(str.getBytes());
    byte[] digest = messageDigest.digest();
    System.arraycopy(digest, 0, bArr4, 0, 16);
    SecretKeySpec secretKeySpec = new SecretKeySpec(bArr4, "AES");
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    cipher.init(2, secretKeySpec, ivParameterSpec);

    return new String(cipher.doFinal(bArr3));
  }

  public static byte[] feelpain(String str, String str2) throws Exception {
    byte[] bytes = str.getBytes();
    byte[] bArr = new byte[16];
    new SecureRandom().nextBytes(bArr);
    IvParameterSpec ivParameterSpec = new IvParameterSpec(bArr);
    MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
    messageDigest.update(str2.getBytes("UTF-8"));
    byte[] bArr2 = new byte[16];
    System.arraycopy(messageDigest.digest(), 0, bArr2, 0, 16);
    SecretKeySpec secretKeySpec = new SecretKeySpec(bArr2, "AES");
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    cipher.init(1, secretKeySpec, ivParameterSpec);
    byte[] doFinal = cipher.doFinal(bytes);
    byte[] bArr3 = new byte[doFinal.length + 16];
    System.arraycopy(bArr, 0, bArr3, 0, 16);
    System.arraycopy(doFinal, 0, bArr3, 16, doFinal.length);
    return bArr3;
  }

  public static void main(String[] args) {
    byte[] painz = {-55, -98, 98, 14, -121, -110, 84, -3, 74, 10, 106, -27, -13, -112, -42, 111, -1, -89, -64, 46, -15, -108, -26, 59, -111, 113, 2, -69, -83, 45, -31, -103, 46, -84, -113, 116, -110, -36, 22, -23, 86, 38, -17, 0, 100, -65, 94, 48, 76, 17, 35, -117, -51, -81, -95, 49, 62, -28, 96, 86, 65, 76, 57, 40};
    String stinger = "this-issa-weird-key";
    try {
      String result = releasepain(painz, stinger);
      System.out.println(result);
    } catch (Exception e) {
      // TODO: handle exception
      System.out.println("Exception");
    }
  } 
}
