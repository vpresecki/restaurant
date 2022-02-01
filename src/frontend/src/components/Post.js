import { Card, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
function Post({ id, title, description, menu }) {
  const navigate = useNavigate();
  return (
    <Row
      style={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Card
        title={title}
        hoverable={true}
        style={{ width: 500 }}
        onClick={() => navigate(`/public/posts/${id}`)}
      >
        <p>{description}</p>
        <p>{menu.content}</p>
      </Card>
    </Row>
  );
}

export default Post;
