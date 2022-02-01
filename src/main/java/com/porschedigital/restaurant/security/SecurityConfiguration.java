package com.porschedigital.restaurant.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.porschedigital.restaurant.filter.CustomAuthenticationFilter;
import com.porschedigital.restaurant.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final UserDetailsService userDetailsService;
  private final PasswordEncoder bCryptPasswordEncoder;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http.headers().frameOptions().disable();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    http.authorizeRequests().antMatchers("/h2-console/**").permitAll();
    http.authorizeRequests().antMatchers("/login/**").permitAll();
    http.authorizeRequests().antMatchers("/api/v1/restaurant/user/save/**").permitAll();
    http.authorizeRequests().antMatchers("/api/v1/restaurant/auth/**").permitAll();
    http.authorizeRequests().antMatchers("/api/v1/restaurant/posts").permitAll();
    http.authorizeRequests().antMatchers("/api/v1/restaurant/posts/{postId}").permitAll();
    http.authorizeRequests().antMatchers("/api/v1/restaurant/comments/save/{postId}").permitAll();
    http.authorizeRequests().anyRequest().authenticated();
    http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
    http.addFilterBefore(
        new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
