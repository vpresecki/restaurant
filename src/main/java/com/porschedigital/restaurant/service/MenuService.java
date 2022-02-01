package com.porschedigital.restaurant.service;

import java.util.List;

import com.porschedigital.restaurant.model.Menu;

public interface MenuService {

  Menu saveMenu(Menu menu);

  List<Menu> getMenus();
}
