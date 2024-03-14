package com.ecommerce.config.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "59316E7074557962496876334247744F474C47396B36726D5750724D43476651";

    public String extractUsername(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String jwt) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignKey())
            .build()
            .parseClaimsJws(jwt)
            .getBody();
    }

    private Key getSignKey() {
        byte [] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // TODO: GenerateToken function
}
