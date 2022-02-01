import { createContext, useReducer } from 'react';
import HttpRequest from '../utils/HttpRequest';

export const AuthContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      const { access_token, refresh_token } = action.payload;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        error: null,
      };
    case 'USER_EXISTS': {
      localStorage.setItem('access_token', action.payload.access_token);
      return {
        ...state,
        access_token: action.payload.access_token,
        isAuthenticated: true,
      };
    }
    case 'REGISTER_SUCCESS':
      return state;
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        refresh_token: null,
        access_token: null,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    access_token: null,
    refresh_token: null,
    isAuthenticated: false,
    error: null,
  });

  const register = async (user) => {
    const req = await fetch('/api/v1/restaurant/user/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (req.ok) {
      const data = await req.json();
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: data,
      });
    }
  };

  const loadUser = async () => {
    if (localStorage.getItem('refresh_token')) {
      const data = await HttpRequest.GET(
        '/api/v1/restaurant/auth',
        localStorage.getItem('refresh_token')
      );
      dispatch({ type: 'USER_EXISTS', payload: data });
    }
  };

  const signIn = async (user) => {
    const req = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: user.email,
        password: user.password,
      }),
    });

    if (req.ok) {
      const data = await req.json();
      dispatch({
        type: 'SIGN_IN_SUCCESS',
        payload: data,
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, register, loadUser, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
