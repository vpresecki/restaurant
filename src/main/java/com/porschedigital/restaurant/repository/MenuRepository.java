package com.porschedigital.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.porschedigital.restaurant.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {}
