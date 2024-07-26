package com.example.crowdm.service.admin;
import lombok.RequiredArgsConstructor;

import java.security.SecureRandom;


/**
 * 1. MethodName: SimplePasswordGenerator
 * 2. ClassName : SimplePasswordGenerator
 * 3. Comment   : 랜덤 코드 생성
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 04
 **/
@RequiredArgsConstructor
public class SimplePasswordGenerator {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generateRandomString(int length) {
        if (length < 1) {
            throw new IllegalArgumentException("String length must be at least 1");
        }

        StringBuilder result = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            result.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return result.toString();
    }

    public static void main(String[] args) {
        String randomString = generateRandomString(12); // Example usage
        System.out.println("Generated String: " + randomString);
    }
}
