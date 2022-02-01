import {
  Row,
  Col,
  Button,
  Layout,
  List,
  Card,
  Comment,
  Input,
  InputNumber,
  Form,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

function PublicPostView() {
  const [form] = Form.useForm();
  const [changeFlag, setChangeFlag] = useState(true);

  const handleSubmit = async () => {
    await form.validateFields();
    const comment = await form.getFieldsValue();
    await fetch(`/api/v1/restaurant/comments/save/${postId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    form.submit();
    form.resetFields();
    setChangeFlag(!changeFlag);
  };
  const navigate = useNavigate();
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    const getPostById = async () => {
      const res = await fetch(`/api/v1/restaurant/posts/${postId}`);
      const data = await res.json();
      setSelectedPost({ ...data });
    };
    getPostById();
  }, [changeFlag]);

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
            {selectedPost && (
              <>
                <Card>
                  <h3>{selectedPost.title}</h3>
                  <p>{selectedPost.description}</p>
                  <hr />
                  <br />
                  <h4>{selectedPost.menu.title}</h4>
                  <p>{selectedPost.menu.content}</p>
                  <p>{selectedPost.menu.rate}</p>
                </Card>
                <br />
                <Form form={form} name="comment_form">
                  <Form.Item
                    name="content"
                    rules={[
                      {
                        required: true,
                        message: 'Please input some content',
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Enter comment here"
                      min={1}
                      max={5}
                    />
                  </Form.Item>
                  <Form.Item
                    name="rate"
                    rules={[
                      {
                        message: 'Please input value between 1 and 5',
                      },
                    ]}
                  >
                    <InputNumber addonBefore="Enter rate here (1-5)" min />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={handleSubmit}>
                      Add Comment
                    </Button>
                  </Form.Item>
                </Form>
                <List
                  style={{ margin: '1em 0 0 0' }}
                  bordered
                  header="Comments"
                  dataSource={selectedPost.comments}
                  itemLayout="vertical"
                  renderItem={(comment) => (
                    <List.Item key={comment.id} style={{ cursor: 'pointer' }}>
                      <Comment content={<p>{comment.content}</p>} />
                      <hr />
                      <br />
                      <p>{comment.rate}</p>
                    </List.Item>
                  )}
                  pagination={{
                    position: 'bottom',
                    pageSize: '1',
                  }}
                />
              </>
            )}
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

export default PublicPostView;
