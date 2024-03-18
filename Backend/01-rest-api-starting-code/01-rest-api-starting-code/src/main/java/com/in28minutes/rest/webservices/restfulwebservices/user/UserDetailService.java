//package com.in28minutes.rest.webservices.restfulwebservices.user;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.Set;
//import java.util.stream.Collectors;
//
////@Service
//public class UserDetailService implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepo;
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         UserData userData = userRepo.findByEmail(email);
//        if(userData ==null){
//            new UsernameNotFoundException("User not exists by email");
//        }
//        Set<GrantedAuthority> authorities = userData.getRoles().stream()
//                .map((role) -> new SimpleGrantedAuthority(role.getName()))
//                .collect(Collectors.toSet());
//        return new org.springframework.security.core.userdetails.User(email, userData.getPassword(),authorities);
//    }
//}
