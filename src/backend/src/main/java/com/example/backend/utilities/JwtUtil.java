package com.example.backend.utilities;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtUtil {

    public static final int EXPIRATION_TIME = 3600;

    /**
     * Creates a JWT token for the authenticated user.
     * @param username The username of the user who has logged in.
     *
     * Here is how the function
     */
    public String createJwt(String username) {

        // Generating a secret key
        SecretKey jwtKey = createSecretKey();

        // Returning the constructed JWT
        return Jwts.builder()
            .header()
                .and()
            .subject(username)
            .signWith(jwtKey)
            .issuedAt(new Date())
            .expiration(new Date(new Date().getTime() + EXPIRATION_TIME))
            .compact();
    }

    /**
     * Generates a secret key for the JWT.
     * @return {SecretKey} the secret key
     */
    public SecretKey createSecretKey() {
        return Jwts.SIG.HS256.key().build();
    }
}
