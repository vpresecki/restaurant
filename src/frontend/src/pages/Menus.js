import { Row, Col, Form, Input, Button, Space, List, Card } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { useDataContext } from '../hooks/useDataContext';

function Menus() {
  const [form] = useForm();
  const { menus, fetchMenus, addMenu } = useDataContext();
  const [changeFlag, setChangeFlag] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const loadMenus = async () => await fetchMenus();
    loadMenus();

    return () => {
      abortController.abort();
    };
  }, [changeFlag]);

  const handleAddMenu = async () => {
    await form.validateFields();
    await addMenu(await form.getFieldsValue());
    form.submit();
    form.resetFields();
    setChangeFlag(!changeFlag);
  };
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
                  message: 'Please enter title',
                },
              ]}
            >
              <Input placeholder="Enter menu title" />
            </Form.Item>
            <Form.Item
              name="content"
              label="Menu content"
              rules={[
                {
                  required: true,
                  message: 'Please enter menu content',
                },
              ]}
            >
              <Input.TextArea
                type="textArea"
                placeholder="Enter post description"
              />
            </Form.Item>
            <Form.Item>
              <Col offset={5}>
                <Space size="large" split={true}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleAddMenu}
                  >
                    Add menu
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
            header="Menus"
            dataSource={menus}
            itemLayout="vertical"
            renderItem={(menu) => (
              <List.Item key={menu.id}>
                <Card
                  hoverable={true}
                  style={{
                    border: '1px solid',
                    borderRadius: '9px',
                    backgroundColor: 'lightblue',
                  }}
                >
                  <h3>{menu.title}</h3>
                  <h4>{menu.content}</h4>
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

export default Menus;
