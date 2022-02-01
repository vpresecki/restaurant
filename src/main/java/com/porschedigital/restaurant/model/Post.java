package com.porschedigital.restaurant.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@NoArgsConstructor
@Data
@RequiredArgsConstructor
public class Post {

  @Id @GeneratedValue private Long id;
  @NonNull private String title;
  @NonNull private String description;

  @OneToMany private List<Comment> comments = new ArrayList<>();

  @ManyToOne() private Menu menu;
}
