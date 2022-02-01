package com.porschedigital.restaurant.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
@Data
@RequiredArgsConstructor
public class Comment {

  @Id @GeneratedValue private Long id;
  @NonNull private String content;

  private Integer rate;

  @ManyToOne private Post post;
}
