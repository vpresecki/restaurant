package com.porschedigital.restaurant.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.porschedigital.restaurant.model.Comment;
import com.porschedigital.restaurant.service.CommentService;
import com.porschedigital.restaurant.service.PostService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/restaurant")
public class CommentController {

  private final CommentService commentService;
  private final PostService postService;

  @PostMapping("/comments/save/{postId}")
  public ResponseEntity<Comment> saveComment(@RequestBody Comment comment, @PathVariable long postId) {
    URI uri =
        URI.create(
            ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/restaurant/comments/save")
                .toUriString());
    Comment newComment = commentService.saveComment(comment);
    postService.addCommentToPost(newComment, postId);
    return ResponseEntity.created(uri).body(newComment);
  }
}
