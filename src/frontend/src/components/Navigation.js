import { Menu, Avatar, Layout, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import { UserOutlined } from '@ant-design/icons';
import { useAuthContext } from '../hooks/useAuthContext';

const centerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '16px',
};

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };
  return (
    <Layout>
      <Header>
        <Row style={{ width: '100%' }}>
          <Col offset={3}>
            <h1 className="logo" onClick={() => navigate('/home')}>
              PorscheRestaurant
            </h1>
          </Col>
          <Col offset={10}>
            <Menu mode="horizontal" theme="dark" style={centerStyle}>
              <Menu.Item key="POSTS">
                <Link to="/posts">Posts</Link>
              </Menu.Item>
              <Menu.Item key="MENUS">
                <Link to="/menus">Menus</Link>
              </Menu.Item>
              <Menu.SubMenu
                key="AdminPanel"
                style={{ margin: '0 1em 0 1em' }}
                icon={<Avatar icon={<UserOutlined />} />}
                popupOffset={[-36, 0]}
                title="User"
              >
                <Menu.Item key="logout" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default Navbar;
