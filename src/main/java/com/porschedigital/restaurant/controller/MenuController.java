package com.porschedigital.restaurant.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.porschedigital.restaurant.model.Menu;
import com.porschedigital.restaurant.service.MenuService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/restaurant")
public class MenuController {

  private final MenuService menuService;

  @GetMapping("/menus")
  public ResponseEntity<List<Menu>> getMenus() {
    return ResponseEntity.ok().body(menuService.getMenus());
  }

  @PostMapping("/menus/save")
  public ResponseEntity<Menu> saveMenu(@RequestBody Menu menu) {
    URI uri =
        URI.create(
            ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/restaurant/menus/save")
                .toUriString());
    return ResponseEntity.created(uri).body(menuService.saveMenu(menu));
  }
}
