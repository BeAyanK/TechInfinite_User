import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{
    background: 'linear-gradient(135deg, rgba(0, 150, 255, 1) 0%, rgba(9, 9, 121, 1) 65%, rgba(2, 0, 36, 1) 100%)'
  }} className=" text-light py-4  mt-1">
        <Container style={{textAlign:"center"}}>
        <Row>
          <Col md={4}>
            <h4>Tech-Infinite</h4>
            <p>&copy;{new Date().getFullYear()} Tech-Infinite. All rights reserved. </p>
          </Col>
          <Col md={4}>
            <h4>Pages</h4>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/product" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/orders" className="text-light text-decoration-none">Orders</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Contact</h4>
            <p>Email: <a href="mailto:support@techinfinite.com" style={{ color: "white", textDecoration: "none" }}>support@techinfinite.com</a></p>
            <p>Phone: +123-456-7890</p>
          </Col>


        </Row>
      </Container>
    </footer>
  )
}

export default Footer
