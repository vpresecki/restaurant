package com.porschedigital.restaurant.service;

import org.springframework.stereotype.Service;

import com.porschedigital.restaurant.model.Comment;
import com.porschedigital.restaurant.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;

  @Override
  public Comment saveComment(Comment comment) {
    return commentRepository.save(comment);
  }
}
