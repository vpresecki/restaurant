import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Menus from './pages/Menus';
import Posts from './pages/Posts';
import Register from './pages/Register';
import Home from './pages/Home';
import { DataProvider } from './context/DataContext';
import { useAuthContext } from './hooks/useAuthContext';
import 'antd/dist/antd.css';
import './App.css';
import { useEffect } from 'react';
import PublicPostView from './pages/PublicPostView';

function App() {
  const { loadUser, isAuthenticated } = useAuthContext();
  useEffect(() => {
    const checkUser = async () => await loadUser();
    checkUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let routes;

  if (isAuthenticated) {
    routes = (
      <DataProvider>
        <Navigation />
        <Routes>
          <Route path="/*" element={<Posts />} />
          <Route path="/home" element={<Home />} />
          <Route path="/public/posts/:postId" element={<PublicPostView />} />
          <Route path="/menus" element={<Menus />} />
        </Routes>
      </DataProvider>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
  return (
    <div className="App">
      <BrowserRouter basename="/app/restaurant">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/public/posts/:postId" element={<PublicPostView />} />
        </Routes>
        {routes}
      </BrowserRouter>
    </div>
  );
}

export default App;
