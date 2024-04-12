package com.ecommerce.auth;

import com.ecommerce.config.JwtService;
import com.ecommerce.customer.Customer;
import com.ecommerce.customer.CustomerRepository;
import com.ecommerce.user.User;
import com.ecommerce.enums.UserRole;
import com.ecommerce.enums.UserState;
import com.ecommerce.user.UserRepository;
import com.ecommerce.utils.StringFormatter;

import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.function.Function;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final CustomerRepository customerRepository;
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager manager;

        public AuthenticationResponse register(RegisterRequest request) {
                Customer user = Customer.builder()
                                .name(StringFormatter.format(request.firstname()) + " "
                                                + StringFormatter.format(request.lastname()))
                                .email(request.email())
                                .password(passwordEncoder.encode(request.password()))
                                .role(UserRole.CUSTOMER)
                                .state(UserState.ACTIVE)
                                .registerDate(new Date())
                                .build();
                customerRepository.save(user);
                String token = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(token)
                                .build();
        }

        public AuthenticationResponse login(LoginRequest request) {
                manager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.email(),
                                                request.password()));
                User user = userRepository.findByEmail(request.email())
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                String token = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(token)
                                .build();
        }
}
