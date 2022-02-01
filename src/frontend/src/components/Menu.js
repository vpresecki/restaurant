import { Row, Card } from 'antd';

function Menu({ id, title, content }) {
  return (
    <Row
      style={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Card key={id} title={title} hoverable={true} style={{ width: 500 }}>
        <p>{content}</p>
      </Card>
    </Row>
  );
}
export default Menu;
