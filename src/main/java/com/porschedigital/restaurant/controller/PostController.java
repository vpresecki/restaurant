package com.porschedigital.restaurant.controller;

import java.net.URI;
import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.porschedigital.restaurant.model.Post;
import com.porschedigital.restaurant.service.PostService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/restaurant")
public class PostController {

  private final PostService postService;

  @GetMapping("/posts")
  public ResponseEntity<List<Post>> getPosts() {
    return ResponseEntity.ok().body(postService.getPosts());
  }

  @GetMapping("/posts/{postId}")
  public ResponseEntity<Post> getPostById(@PathVariable long postId) {
    return ResponseEntity.ok().body(postService.getPost(postId));
  }

  @PostMapping("/posts/save")
  public ResponseEntity<Post> addPost(@RequestBody Post post) {
    URI uri =
        URI.create(
            ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/restaurant/posts/save")
                .toUriString());
    if (Objects.nonNull(post.getMenu())) {
      postService.addMenuToPost(post.getMenu().getId(), post);
    }
    return ResponseEntity.created(uri).body(postService.savePost(post));
  }
}
