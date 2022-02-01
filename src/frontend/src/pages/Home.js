import { Row, Col, Button, Layout, List, Card } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
const { Header, Footer, Content } = Layout;

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetch('/api/v1/restaurant/posts');
      const data = await res.json();
      setData([...data]);
    };
    loadPosts();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Row style={{ width: '100%' }}>
          <Col offset={3}>
            <h1 className="logo" onClick={() => navigate('/home')}>
              PorscheRestaurant
            </h1>
          </Col>
          <Col offset={16}>
            <Button type="danger" onClick={() => navigate('/login')}>
              APP
            </Button>
          </Col>
        </Row>
      </Header>
      <Content
        style={{ height: '80vh', overflow: 'hidden', margin: '2em 0 0 0' }}
      >
        <Row>
          <Col offset={4} span={16}>
            <List
              bordered
              header="Restaurant post"
              dataSource={data}
              itemLayout="vertical"
              renderItem={(post) => (
                <List.Item key={post.id} style={{ cursor: 'pointer' }}>
                  <Card
                    style={{
                      border: '1px solid',
                      borderRadius: '9px',
                      backgroundColor: 'lightblue',
                    }}
                    hoverable={true}
                    onClick={() => navigate(`/public/posts/${post.id}`)}
                  >
                    <h3>{post.title}</h3>
                    <h4>{post.menu.title ? post.menu.title : 'No menu'}</h4>
                  </Card>
                </List.Item>
              )}
              pagination={{
                position: 'bottom',
                pageSize: '3',
              }}
            />
          </Col>
        </Row>
      </Content>
      <Footer style={{ position: 'sticky', bottom: '0' }}>
        <Row>
          <Col offset={12}>
            <h4
              style={{ cursor: 'pointer' }}
              onClick={() =>
                (window.location.href = 'https://www.porsche.digital/en/')
              }
            >
              www.porsche.digital
            </h4>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default Home;
