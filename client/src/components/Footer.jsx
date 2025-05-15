import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Bookstore. All rights reserved.</p>
            <p>
              <a href="/privacy-policy">Privacy Policy</a> |{" "}
              <a href="/terms-of-service">Terms of Service</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
