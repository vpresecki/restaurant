import { Form, Input, Button, Checkbox, Row, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Register = () => {
  const [form] = Form.useForm();
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const { firstName, lastName, email, password } = form.getFieldsValue();
    register({ firstName, lastName, email, password });
    form.submit();
    navigate('/login');
  };

  return (
    <Row justify="center" align="middle" style={{ height: '90vh' }}>
      <Form
        form={form}
        name="RegisterForm"
        initialValues={{
          remember: true,
        }}
      >
        <h1
          style={{ color: 'darkgray' }}
          className="logo"
          onClick={() => navigate('/home')}
        >
          PorscheRestaurant
        </h1>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First name"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          onClick={handleSubmit}
        >
          Register
        </Button>
        Or <Link to="/">sign in now!</Link>
      </Form>
    </Row>
  );
};

export default Register;
