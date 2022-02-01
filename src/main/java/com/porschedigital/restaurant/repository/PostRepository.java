package com.porschedigital.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.porschedigital.restaurant.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {}
