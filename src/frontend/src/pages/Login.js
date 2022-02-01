import { Form, Input, Button, Checkbox, Row, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { signIn, error, closeError } = useAuthContext();

  const handleSubmit = async () => {
    const user = form.getFieldsValue();
    signIn(user);
    form.submit();
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: '90vh' }}>
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
        >
          {error && (
            <Alert
              type="error"
              message={error}
              closable={true}
              onClose={closeError}
              style={{ margin: '1em' }}
            />
          )}

          <h1
            style={{ color: 'darkgray' }}
            className="logo"
            onClick={() => navigate('/home')}
          >
            PorscheRestaurant
          </h1>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              onClick={handleSubmit}
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default Login;
