import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Welcome to Tech-Infinite</h1>

      <Row className="mb-5">
        <Col md={8} className="mx-auto text-center">
          {/* <h3></h3> */}
          <p className="lead">
            Your one-stop online store for the latest gadgets, stylish fashion,
            home essentials, and more. We bring you quality products at
            unbeatable prices, all delivered right to your doorstep.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <Card className="h-100 shadow-sm"
          style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              },
              maxWidth: '90%',
              margin: '0 auto',
            }}>
            <Card.Body >
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                At Tech-Infinite, our mission is to make online shopping easy,
                enjoyable, and affordable. We curate a wide range of products
                to meet your everyday needs, backed by excellent customer
                service and fast shipping.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm"style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              },
              maxWidth: '90%',
              margin: '0 auto',
            }}>
            <Card.Body>
              <Card.Title>Our Vision</Card.Title>
              <Card.Text>
                To become the most trusted and convenient e-commerce
                destination for millions of customers, empowering them to shop
                smarter and live better.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h3 className="text-center mb-4">Why Choose Tech-Infinite?</h3>
          <Row>
            <Col md={4}>
              <Card className="text-center shadow-sm mb-4" 
              style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              },
              maxWidth: '90%',
              margin: '0 auto',
            }}>
                <Card.Body>
                  <i className="bi bi-box-seam fs-1 mb-3 text-primary"></i>
                  <Card.Title>Vast Product Selection</Card.Title>
                  <Card.Text>
                    From electronics and apparel to home decor and accessories — find everything in one place.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center shadow-sm mb-4"
              style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              },
              maxWidth: '90%',
              margin: '0 auto',
            }}>
                <Card.Body>
                  <i className="bi bi-tag fs-1 mb-3 text-primary"></i>
                  <Card.Title>Best Prices Guaranteed</Card.Title>
                  <Card.Text>
                    We work hard to offer competitive pricing and great deals every day.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center shadow-sm mb-4"
              style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              },
              maxWidth: '90%',
              margin: '0 auto',
            }}>
                <Card.Body>
                  <i className="bi bi-shield-lock fs-1 mb-3 text-primary"></i>
                  <Card.Title>Secure Shopping</Card.Title>
                  <Card.Text>
                    Your data and payments are protected with industry-leading security.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="text-center shadow-sm mb-4"
              style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              },
              maxWidth: '90%',
              margin: '0 auto',
            }}>
                <Card.Body>
                  <i className="bi bi-truck fs-1 mb-3 text-primary"></i>
                  <Card.Title>Fast & Reliable Delivery</Card.Title>
                  <Card.Text>
                    Get your orders on time, every time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center shadow-sm mb-4"
              style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              },
              maxWidth: '90%',
              margin: '0 auto',
            }}>
                <Card.Body>
                  <i className="bi bi-headset fs-1 mb-3 text-primary"></i>
                  <Card.Title>Customer Support</Card.Title>
                  <Card.Text>
                    Our friendly support team is here to help you 24/7.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={8} className="mx-auto text-center">
          <h3>Meet The Team</h3>
          <p>
            Our passionate team of buyers, developers, and customer care experts
            work tirelessly to bring you the best shopping experience possible.
          </p>
          <Button
            variant="primary"
            onClick={() => alert("Thanks for your interest! Stay tuned.")}
          >
            Join The Tech-Infinite Family
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
