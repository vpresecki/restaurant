package com.porschedigital.restaurant.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
@NoArgsConstructor
@Data
@RequiredArgsConstructor
public class User implements UserDetails {

  @Id @GeneratedValue private Long id;
  @NonNull private String firstName;
  @NonNull private String lastName;

  @NonNull
  @Column(nullable = false, unique = true)
  private String email;

  @NonNull
  @Column(length = 100)
  private String password;

  @NonNull
  @Column(nullable = false)
  private boolean enabled;

  @OneToMany(mappedBy = "user")
  private List<Menu> menuList;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(lastName));
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }
}
