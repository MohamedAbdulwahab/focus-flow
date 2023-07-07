import Signup from '../components/Signup';
import CalmingGradient from '../components/CalmingGradient';
import { Container, Row, Col } from 'react-bootstrap';

function HomePage() {
  return (
    <>
      <CalmingGradient />
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <Row>
          <Col md={6}>
            <h1>Welcome to Daily Focus Flow</h1>
            <p>
              The <strong>all-all-in-one </strong> productivity web app
            </p>
          </Col>
          <Col md={6}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
              <Signup />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
