import { createContext, useReducer } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import HttpRequest from '../utils/HttpRequest';
export const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'ADD_POST_SUCCESS':
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case 'GET_POST_SUCCESS':
      return {
        ...state,
      };
    case 'FETCH_MENUS_SUCCESS':
      return {
        ...state,
        menus: action.payload,
      };
    case 'SAVE_MENU_SUCCESS':
      return {
        ...state,
        menus: [...state.menus, action.payload],
      };
    default:
      return state;
  }
};

export function DataProvider({ children }) {
  const { access_token } = useAuthContext();
  const [state, dispatch] = useReducer(dataReducer, {
    posts: [],
    menus: [],
  });

  const fetchPosts = async () => {
    try {
      const posts = await HttpRequest.GET(
        '/api/v1/restaurant/posts',
        access_token
      );
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
    } catch (error) {
      dispatch({
        type: 'FAILED_FETCH',
        payload: 'Something went wrong, could not load posts.',
      });
    }
  };

  const addPost = async (post) => {
    try {
      const data = await HttpRequest.POST(
        '/api/v1/restaurant/posts/save',
        access_token,
        post
      );
      dispatch({ type: 'SAVE_POST_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FAILED_FETCH',
        payload: 'Something went wrong, could not load posts.',
      });
    }
  };

  const getPost = async (postId) => {
    try {
      await HttpRequest.GET(`/api/v1/restaurant/posts/${postId}`, access_token);
      dispatch({ type: 'GET_POST_SUCCESS' });
    } catch (error) {
      dispatch({
        type: 'FAILED_FETCH',
        payload: 'Something went wrong, could not load posts.',
      });
    }
  };

  const fetchMenus = async () => {
    try {
      const menus = await HttpRequest.GET(
        `/api/v1/restaurant/menus`,
        access_token
      );
      dispatch({ type: 'FETCH_MENUS_SUCCESS', payload: menus });
    } catch (error) {
      dispatch({
        type: 'FAILED_FETCH',
        payload: 'Something went wrong, could not load menus.',
      });
    }
  };

  const addMenu = async (menu) => {
    try {
      const data = await HttpRequest.POST(
        '/api/v1/restaurant/menus/save',
        access_token,
        menu
      );
      dispatch({ type: 'SAVE_MENU_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FAILED_FETCH',
        payload: 'Something went wrong, could not load posts.',
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        ...state,
        fetchPosts,
        addPost,
        getPost,
        fetchMenus,
        addMenu,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
