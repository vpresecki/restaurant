package com.porschedigital.restaurant.service;

import com.porschedigital.restaurant.model.User;

public interface UserService {

  User saveUser(User user);

  User getUser(String email);
}
