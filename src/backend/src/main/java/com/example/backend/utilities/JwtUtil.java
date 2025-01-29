package com.example.backend.utilities;

import io.github.cdimascio.dotenv.Dotenv;
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
    String secretKey = Dotenv.load().get("JWT_SECRET");

    public static final int EXPIRATION_TIME = 3600;

    /**
     * Creates a JWT token for the authenticated user.
     * @param username The username of the user who has logged in.
     *
     * Here is how the function
     */
    public String createJwt(String username)
    {
        Date now = new Date();
        Date exp = new Date(System.currentTimeMillis() + EXPIRATION_TIME);

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

    private Claims extractClaims(String token)
    {
        return Jwts.parser()
            .setSigningKey(this.secretKey.getBytes())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public String extractUsername(String token)
    {
        return extractClaims(token).getSubject();
    }

    public Date extractExpiration(String token)
    {
        return extractClaims(token).getExpiration();
    }

    public boolean validateToken(String token, String username)
    {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
    private boolean isTokenExpired(String token)
    {
        return extractExpiration(token).before(new Date());
    }

}
