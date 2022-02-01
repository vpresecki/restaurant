package com.porschedigital.restaurant;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.porschedigital.restaurant.model.Comment;
import com.porschedigital.restaurant.model.Menu;
import com.porschedigital.restaurant.model.Post;
import com.porschedigital.restaurant.model.User;
import com.porschedigital.restaurant.service.CommentService;
import com.porschedigital.restaurant.service.MenuService;
import com.porschedigital.restaurant.service.PostService;
import com.porschedigital.restaurant.service.UserService;

@SpringBootApplication
@EnableTransactionManagement
public class RestaurantApplication {

  public static void main(String[] args) {
    SpringApplication.run(RestaurantApplication.class, args);
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  CommandLineRunner run(
      UserService userService,
      PostService postService,
      CommentService commentService,
      MenuService menuService) {
    return args -> {
      userService.saveUser(new User("Jhon", "Doe", "test@email.com", "password", true));

      Post post = new Post("This is our first post, welcome to our restaurant.", "Check out our special menu for opening day!");
      Post post1 = new Post("Monday post", "Check this out");
      Post post2 = new Post("Tuesday post", "Check this out");
      Post post3 = new Post("Wednesday post", "Check this out");
      Post post4 = new Post("Thursday post", "Check this out");
      Post post5 = new Post("Friday post", "Check this out");
      Post post6 = new Post("Saturday post", "Check this out");
      Post post7 = new Post("Sunday post", "Check this out");
      Post post8 = new Post("Special weekend post", "Check this out");
      Post post9 = new Post("Extra menu week", "Check this out");
      Post post10 = new Post("Super menu", "Check this out");
      Comment comment = new Comment("Awesome meal and service!");
      comment.setRate(5);
      commentService.saveComment(comment);
      post.getComments().add(comment);

      Menu menu = new Menu("Special opening menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu1 = new Menu("First week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu2 = new Menu("Second week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu3 = new Menu("Third week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu4 = new Menu("Fourth week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu5 = new Menu("Fifth week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu6 = new Menu("Sixth week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu7 = new Menu("Seventh week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu8 = new Menu("Eight week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu9 = new Menu("Ninth week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");
      Menu menu10 = new Menu("Tenth week menu", "Pizza: 50kn, Cevapi: 50kn, Lazanje: 60kn");

      menuService.saveMenu(menu);
      menuService.saveMenu(menu1);
      menuService.saveMenu(menu2);
      menuService.saveMenu(menu3);
      menuService.saveMenu(menu4);
      menuService.saveMenu(menu5);
      menuService.saveMenu(menu6);
      menuService.saveMenu(menu7);
      menuService.saveMenu(menu8);
      menuService.saveMenu(menu9);
      menuService.saveMenu(menu10);

      post.setMenu(menu);
      post1.setMenu(menu1);
      post2.setMenu(menu2);
      post3.setMenu(menu3);
      post4.setMenu(menu4);
      post5.setMenu(menu5);
      post6.setMenu(menu6);
      post7.setMenu(menu7);
      post8.setMenu(menu8);
      post9.setMenu(menu9);
      post10.setMenu(menu10);

      postService.savePost(post);
      postService.savePost(post1);
      postService.savePost(post2);
      postService.savePost(post3);
      postService.savePost(post4);
      postService.savePost(post5);
      postService.savePost(post6);
      postService.savePost(post7);
      postService.savePost(post8);
      postService.savePost(post9);
      postService.savePost(post10);
    };
  }
}
