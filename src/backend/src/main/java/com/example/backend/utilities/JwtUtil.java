package com.example.backend.utilities;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtUtil
{

    String secretKey = "7aKWgGSseEy93+Ekmn7lS8VVO9mkl+63cEUWUJbs7YYTkUHQO6rwpaLdhu6Z2lwo";

    public static final int EXPIRATION_TIME = 3600;

    /**
     * Creates a JWT token for the authenticated user.
     * @param username The username of the user who has logged in.
     *
     * Here is how the function
     */
    public String createJwt(String username)
    {
        // Generating a secret key
        SecretKey jwtKey = createSecretKey();

        Date now = new Date();
        Date exp = new Date(System.currentTimeMillis() + (1000 * 30));

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);

        // Returning the constructed JWT
        return Jwts.builder()
                .subject(username)
                .claims(claims)
                .issuedAt(now)
                .notBefore(now)
                .expiration(exp)  // Use the expiration time variable here
                .signWith(SignatureAlgorithm.HS256, this.secretKey.getBytes())
                .compact();
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Extract expiration date from JWT token
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    /**
     * Generates a secret key for the JWT.
     * @return {SecretKey} the secret key
     */
    public SecretKey createSecretKey() {
        return Jwts.SIG.HS256.key().build();
    }
}
