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
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final AuthenticationProvider authProvider;
        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                AccessDeniedHandler accessDeniedHandler = (request, response, accessDeniedException) -> {
                        // Configura el código de estado HTTP adecuado
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

                        // Configura el tipo de contenido de la respuesta
                        response.setContentType("application/json");

                        // Aquí puedes personalizar la respuesta de acceso denegado según tus
                        // necesidades
                        String responseBody = "{\"error\": \"Acceso denegado: No tienes los permisos necesarios\"}";
                        response.getWriter().write(responseBody);
                };

                return http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                                                .permitAll()
                                                .requestMatchers(RequestMatcherUtil::isApiAuthRequest).permitAll()
                                                .requestMatchers("/users/**").hasAuthority("ADMINISTRATOR")
                                                .anyRequest().authenticated())
                                .exceptionHandling(ex -> ex.accessDeniedHandler(accessDeniedHandler))
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
