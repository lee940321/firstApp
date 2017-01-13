package com.app.util;

import java.security.MessageDigest;

/**
 * 实现MD5加密
 * @author lee 
 */
public class MD5 {

 /**
  * 获取加密后的字符串
  * @param input
  * @return
  */
 public static String stringMD5(String inStr) {
	 MessageDigest md5 = null;  
     try{  
         md5 = MessageDigest.getInstance("MD5");  
     }catch (Exception e){  
         System.out.println(e.toString());  
         e.printStackTrace();  
         return "";  
     }  
     char[] charArray = inStr.toCharArray();  
     byte[] byteArray = new byte[charArray.length];  

     for (int i = 0; i < charArray.length; i++)  
         byteArray[i] = (byte) charArray[i];  
     byte[] md5Bytes = md5.digest(byteArray);  
     StringBuffer hexValue = new StringBuffer();  
     for (int i = 0; i < md5Bytes.length; i++){  
         int val = ((int) md5Bytes[i]) & 0xff;  
         if (val < 16)  
             hexValue.append("0");  
         hexValue.append(Integer.toHexString(val));  
     }  
     return hexValue.toString();  

 }  
 
}