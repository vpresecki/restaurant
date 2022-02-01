package com.porschedigital.restaurant.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.porschedigital.restaurant.model.User;
import com.porschedigital.restaurant.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public User saveUser(User user) {
    log.info("Saving new user with email: {}.", user.getEmail());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setEnabled(true);
    return userRepository.save(user);
  }

  @Override
  public User getUser(String email) {
    log.info("Fetching user with email: {}.", email);
    return userRepository.findByEmail(email);
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email);
    if (user == null) {
      log.error("Could not find user.");
      throw new UsernameNotFoundException("Could not find user.");
    }
    log.info("Found user with email: {}", email);

    return new org.springframework.security.core.userdetails.User(
        user.getUsername(),
        user.getPassword(),
        user.isEnabled(),
        user.isAccountNonExpired(),
        user.isCredentialsNonExpired(),
        user.isAccountNonLocked(),
        user.getAuthorities());
  }
}
