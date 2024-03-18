//package com.in28minutes.rest.webservices.restfulwebservices;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
////@Configuration
//public class BasicAuthenticationSecurityConfiguration {
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//                http
//                        .authorizeHttpRequests(
//                                auth -> auth.anyRequest().authenticated()
//                        )
//                        .formLogin(withDefaults())
//                        .csrf().disable()
//                        .headers().frameOptions().disable();
//                return http.build();
//
//    }
//
//}