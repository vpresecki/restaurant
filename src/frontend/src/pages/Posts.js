import { Row, Col, Form, Input, Select, Button, Space, List, Card } from 'antd';
import { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';

import Post from '../components/Post';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

function Posts() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { posts, fetchPosts, addPost, fetchMenus, menus } = useDataContext();
  const [changeFlag, setChangeFlag] = useState(true);
  const handlePublish = async () => {
    await form.validateFields();
    const { description, title, menuId } = await form.getFieldsValue();
    const menu = menus.find((men) => men.id == menuId);
    await addPost({ title, description, menu });
    form.submit();
    form.resetFields();
    setChangeFlag(!changeFlag);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const loadPosts = async () => await fetchPosts();
    const loadMenus = async () => await fetchMenus();
    loadPosts();
    loadMenus();
    return () => {
      abortController.abort();
    };
  }, [changeFlag]);

  return (
    <>
      <Row gutter={16} style={{ marginTop: '2em' }}>
        <Col span={6} offset={9}>
          <Form
            form={form}
            name="normal_login"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="title"
              label="Post title"
              rules={[
                {
                  required: true,
                  message: 'Please enter post title',
                },
              ]}
            >
              <Input placeholder="Enter post title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Post description"
              rules={[
                {
                  required: true,
                  message: 'Please enter post description',
                },
              ]}
            >
              <Input.TextArea
                type="textArea"
                placeholder="Enter post description"
              />
            </Form.Item>
            <Form.Item name="menuId" label="Post menu">
              <Select placeholder="Select menu" allowClear>
                {menus &&
                  menus.map((menu) => (
                    <Option key={menu.id} value={menu.id}>
                      {menu.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Col offset={5}>
                <Space size="large" split={true}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handlePublish}
                  >
                    Publish post
                  </Button>
                  <Button type="primary" onClick={() => form.resetFields()}>
                    Clear form
                  </Button>
                </Space>
              </Col>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col offset={4} span={16}>
          <List
            bordered
            header="Restaurant post"
            dataSource={posts}
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
    </>
  );
}

export default Posts;
