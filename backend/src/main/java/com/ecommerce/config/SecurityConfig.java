package com.ecommerce.config;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final AuthenticationProvider authProvider;
        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final CustomAccessDeniedHandler customAccessDeniedHandler;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                return http
                        .csrf(csrf -> csrf.disable())
                        .authorizeHttpRequests(authorize -> authorize
                                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                                .requestMatchers(RequestMatcherUtil::isApiAuthRequest).permitAll()
                                .requestMatchers("/products/**").permitAll()
                                .requestMatchers("/swagger-ui/**", "/swagger-resources/**", "/api-docs/**").permitAll()
                                .requestMatchers("/users/forgot", "/users/validate", "/users/reset").permitAll()
                                .anyRequest().authenticated())
                        .exceptionHandling(ex -> ex.accessDeniedHandler(customAccessDeniedHandler))
                        .authenticationProvider(authProvider)
                        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                        .build();
        }
}

class RequestMatcherUtil {
        public static boolean isApiAuthRequest(HttpServletRequest request) {
                return request.getRequestURI().startsWith("/api/auth/");
        }
}
