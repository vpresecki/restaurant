package com.porschedigital.restaurant.service;

import java.util.List;

import com.porschedigital.restaurant.model.Comment;
import com.porschedigital.restaurant.model.Post;

public interface PostService {

  Post savePost(Post post);

  List<Post> getPosts();

  void addMenuToPost(Long menuId, Post post);

  Post getPost(Long postId);

  void addCommentToPost(Comment comment, Long postId);
}
