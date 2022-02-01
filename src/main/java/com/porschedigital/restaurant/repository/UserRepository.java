package com.porschedigital.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.porschedigital.restaurant.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByEmail(String email);
}
