package com.porschedigital.restaurant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.porschedigital.restaurant.model.Menu;
import com.porschedigital.restaurant.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MenuServiceImpl implements MenuService {

  private final MenuRepository menuRepository;

  @Override
  public Menu saveMenu(Menu menu) {
    return menuRepository.save(menu);
  }

  @Override
  public List<Menu> getMenus() {
    return menuRepository.findAll();
  }

}
