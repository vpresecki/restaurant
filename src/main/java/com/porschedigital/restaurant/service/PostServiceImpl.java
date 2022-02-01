package com.porschedigital.restaurant.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.porschedigital.restaurant.model.Comment;
import com.porschedigital.restaurant.model.Menu;
import com.porschedigital.restaurant.model.Post;
import com.porschedigital.restaurant.repository.MenuRepository;
import com.porschedigital.restaurant.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final MenuRepository menuRepository;

  @Override
  public Post savePost(Post post) {
    return postRepository.save(post);
  }

  @Override
  public List<Post> getPosts() {
    return postRepository.findAll();
  }

  @Override
  public void addMenuToPost(Long menuId, Post post) {
    Optional<Menu> menu = menuRepository.findById(menuId);
    menu.ifPresent(post::setMenu);
  }

  @Override
  public Post getPost(Long postId) {
    return postRepository.findById(postId).get();
  }

  @Override public void addCommentToPost(Comment comment, Long postId) {
    Post post = getPost(postId);
    post.getComments().add(comment);
  }
}
