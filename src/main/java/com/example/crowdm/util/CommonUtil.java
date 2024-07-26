package com.example.crowdm.util;

import org.springframework.util.StringUtils;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

/**
 
 * 1. ClassName: CommonUtil
 * 2. FileName : CommonUtil.java
 * 3. Package  : common.util
 * 4. Comment  : 공통
 * 5. 작성자   : san
 * 6. 작성일    : 2024. 06. 24
 * 
 */
public class CommonUtil {

    /**
     * 1. MethodName: getTelNoHyphen
     * 2. ClassName : CommonUtil
     * 3. Comment   : 전화번호 '-' 추가
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 24
     *
     * @return String
     * @param num
     * @param mask
     * @return
     */
    public static String getTelNoHyphen(String num, String mask) {

        String formatNum = "";
        if (num == null || num.equals(""))
            return formatNum;
        num = num.replaceAll("-", "");

        if (num.length() == 11) {
            if (mask.equals("Y")) {
                formatNum = num.replaceAll("(\\S{3})(\\S{3,4})(\\S{4})", "$1-****-$3");
            } else {
                formatNum = num.replaceAll("(\\S{3})(\\S{3,4})(\\S{4})", "$1-$2-$3");
            }
        } else if (num.length() == 8) {
            formatNum = num.replaceAll("(\\S{4})(\\S{4})", "$1-$2");
        } else {
            if (num.indexOf("02") == 0) {
                if (mask.equals("Y")) {
                    formatNum = num.replaceAll("(\\S{2})(\\S{3,4})(\\S{4})", "$1-****-$3");
                } else {
                    formatNum = num.replaceAll("(\\S{2})(\\S{3,4})(\\S{4})", "$1-$2-$3");
                }
            } else {
                if (mask.equals("Y")) {
                    formatNum = num.replaceAll("(\\S{3})(\\S{3,4})(\\S{4})", "$1-****-$3");
                } else {
                    formatNum = num.replaceAll("(\\S{3})(\\S{3,4})(\\S{4})", "$1-$2-$3");
                }
            }
        }
        return formatNum;
    }

    /**
     *
     
     * 1. MethodName: getNumFormat
     * 2. ClassName : CommonUtil
     * 3. Comment   : 숫자 1000단위 컴마
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 24
     * 
     *
     * @return String
     * @param num
     * @return
     */
    public static String getNumFormat(int num) {

        String numStr = String.format("%,d", num);
        return numStr;
    }

    /**
     *
     
     * 1. MethodName: convertObjectToMap
     * 2. ClassName : CommonUtil
     * 3. Comment   : VO 를 Map 로 변환
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 24
     *
     * @return Map
     * @param obj
     * @return
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static Map convertObjectToMap(Object obj) {
        Map map = new HashMap();
        Field[] fields = obj.getClass().getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            fields[i].setAccessible(true);
            try {
                map.put(fields[i].getName(), fields[i].get(obj));
            } catch (Exception e) {
                System.out.println("Connection Exception occurred");
            }
        }
        return map;
    }

    /**
     *
     
     * 1. MethodName: convertMapToObject
     * 2. ClassName : CommonUtil
     * 3. Comment   : Map 를 VO로 변환
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 24
     * 
     *
     * @return Object
     * @param map
     * @param obj
     * @return
     */
    @SuppressWarnings("rawtypes")
    public static Object convertMapToObject(Map<String, Object> map, Object obj) {
        String keyAttribute = null;
        String setMethodString = "set";
        String methodString = null;
        Iterator itr = map.keySet().iterator();

        while (itr.hasNext()) {
            keyAttribute = (String) itr.next();
            methodString = setMethodString + keyAttribute.substring(0, 1).toUpperCase() + keyAttribute.substring(1);
            Method[] methods = obj.getClass().getDeclaredMethods();
            for (int i = 0; i < methods.length; i++) {
                if (methodString.equals(methods[i].getName())) {
                    try {
                        methods[i].invoke(obj, map.get(keyAttribute));
                    } catch (Exception e) {
                        System.out.println("Connection Exception occurred");
                    }
                }
            }
        }
        return obj;
    }

    /**
     
     * 1. MethodName: subStringBytes
     * 2. ClassName : CommonUtil
     * 3. Comment   : 문자열을 지정된 사이즈 만큼 자르기
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 24
     * 
     *
     * @return String
     * @param str
     * @param byteLength
     * @return
     */
    public static String subStringBytes(String str, int byteLength) {
        // String 을 byte 길이 만큼 자르기.
        int retLength = 0;
        int tempSize = 0;
        int asc;
        if (str == null || "".equals(str) || "null".equals(str)) {
            str = "";
        }

        int length = str.length();

        for (int i = 1; i <= length; i++) {
            asc = str.charAt(i - 1);
            if (asc > 127) {
                if (byteLength >= tempSize + 2) {
                    tempSize += 2;
                    retLength++;
                } else {
                    return str.substring(0, retLength);
                }
            } else {
                if (byteLength > tempSize) {
                    tempSize++;
                    retLength++;
                }
            }
        }

        return str.substring(0, retLength);
    }
    
    /**
	 * 1. MethodName: leftPadding
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 문자열을 원하는 길이만큼 지정한 문자로 left padding 처리한다.
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
     * @param origin padding 처리할 문자열
     * @param limit padding 처리할 size
     * @param pad padding 될 문자
     * @return padding 처리된 문자열
     */
    public static String leftPadding( String origin, int limit, String pad )
    {
        String temp = pad;

        int size = origin.length();

        if ( limit <= size )
        {
            return origin;
        }
        else
        {
            StringBuffer sb = new StringBuffer( temp );

            for ( int inx = size; inx < limit - 1; inx++ )
            {
                sb.append( pad );

            }

            return sb.toString() + origin;
        }
    }	
    
    /**
	 * 1. MethodName: rightPadding
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 문자열을 원하는 길이만큼 지정한 문자로 right padding 처리한다.
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
     * @param src
     * @param num
     * @param ch
     * @return
     */
	public static String rightPadding(String src, int num, String ch ) {
		String result = "";

		if(src == null || src.length() >= num) {
			return src;
		}
	
		int cnt = num - src.length();
	
		for(int i=0; i < cnt; i++) {
			result += ch;
		}
	
		return src+result;
	}
    
    /**
	 * 1. MethodName: maskName
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 이름 마스킹
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
     * @param str
     * @return 이름 2자리일 때, 홍*
     * 			  3자리 이상일때, 홍*동, 홍**동 ...
     */
    
    public static String maskName (String str, String maskingSymbol){
		if(StringUtils.isEmpty(str)) {
			return str;
		}
    	
    	String middle = "";
    	String mask = "";
    	
		if( str.length() == 2 ) {
			str = str.substring(0, 1)+"*";
		} else {
			middle = str.substring(1, str.length()-1);
			for (int i = 0; i < middle.length(); i++) {
				mask += maskingSymbol;
			}
			str = str.substring(0, 1) + mask + str.substring(str.length()-1, str.length());
		}
		return str;
    }
    
    
    /**
	 * 1. MethodName: maskString
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : String 마스킹 - startIndex~endIdx 사이를 *로 처리
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
     * @param str
     * @param startIndex
     * @param endIdx
     * @return
     */
    public static String maskString(String str, int startIndex, int endIdx) {
		if(StringUtils.isEmpty(str)) {
			return str;
		}
		
		if(str.length() < endIdx){
			endIdx = str.length();
		}
		
		StringBuilder sb = new StringBuilder(str);
		for(int i = startIndex; i<endIdx; i++) {
			sb.setCharAt(i, '*');
		}
		
		return sb.toString();
	}
	
	/**
	 * 1. MethodName: maskHyphenCPhone
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 휴대폰번호 마스킹, 하이픈 추가
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
	 * @param str : 휴대폰번호 10자리 또는 11자리(하이픈 포함 가능)
	 * @param isMask : 마스킹 여부
	 * @return : 010-1**-22**, 010-11**-22** 
	 */
	public static String maskHyphenCPhone(String str, boolean isMask) {
		if(StringUtils.isEmpty(str)) {
			return str;
		}
		
		if(isMask) {
			str = str.replaceAll("(\\d{3})-?(\\d{1,2})\\d{2}-?(\\d{2})\\d{2}", "$1-$2**-$3**");
		} else {
			str = str.replaceAll("(\\d{3})-?(\\d{3,4})-?(\\d{4})", "$1-$2-$3");
		}
		
		return str;
	}
    
    /**
	 * 1. MethodName: maskAddrDtl
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 주소 마스킹
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
   	 * @param str : 상세주소 
   	 *                
   	 */
       public static String maskAddrDtl(String str) {
   		if(StringUtils.isEmpty(str)) {
   			return str;
   		}
   		
   		str =  "***********";
   		
       	return str;
   	}
    /**
	 * 1. MethodName: maskEmailAddress
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 이메일 마스킹
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
   	 * @param str : 이메일
   	 * @param isMask : 마스킹 여부
   	 * @return : abc@kt.com ->  a**@kt.com
   	 */
   	public static String maskEmailAddress(String str) {
   		if(StringUtils.isEmpty(str)) {
   			return str;
   		}
   		int lastIndex= str.indexOf("@");
   		String middle ="";
   		String lastEmail =  str.substring(lastIndex);
   		for(int i =2 ;i < lastIndex; i++){
   			middle += "*";
   		}
   		str = str.substring(0, 2)+middle+lastEmail;
   		
   		return str;
   	}
    
	/**
	 * 1. MethodName: StrcheckNull
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 문자열이 null인지 체크
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
	 * @param	str			문자열
	 * @return 	null이면 "", 아니면 그대로 리턴
	 */ 
	public static String StrcheckNull(String str) {
		return (str==null||str.equals(""))? "":str;
	}
	
	/**
	 * 1. MethodName: ObjcheckNull
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : object가 null인지 체크하여 ""을 return
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 * @param obj
	 * @return
	 */
	public static String ObjcheckNull(Object obj) {
		return (obj==null? "":obj.toString());
	}

	/**
	 * 1. MethodName: checkNullReplace
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 문자열이 null이면 대치할 문자열을 리턴한다.
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
	 * @param obj
	 * @param replaceStr
	 * @return
	 */
	public static String checkNullReplace(Object obj, String replaceStr) {
		return (obj==null)? replaceStr:obj.toString();
	}

	
	/**
	 * 1. MethodName: checkNullReplace
	 * 2. ClassName : CommonUtil
	 * 3. Comment   : 문자열중에 원하는 문자를 제거한다.
	 * 4. 작성자    : san
	 * 5. 작성일    : 2024. 06. 24
	 *
	 * @param c_str : 입력 받을 문자열
	 * @param c_type : 제거할 문자
	 * @return
	 */
	public static String cutString(String c_str,String c_type) {
		String str = c_str;
		StringTokenizer st = new StringTokenizer(str, c_type, false);
	str = "";
		while(st.hasMoreTokens()) {
			str += st.nextToken();
		}
		return str;
	}


}
