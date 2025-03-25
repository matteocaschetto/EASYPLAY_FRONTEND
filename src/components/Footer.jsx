import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Footer.css";

function MyFooter() {
  return (
    <footer>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={6}>
            <Row>
              <Col className="mb-2">
                <i className="bi bi-facebook footer-icon me-2 text-white"></i>
                <i className="bi bi-instagram footer-icon me-2 text-white"></i>
                <i className="bi bi-twitter footer-icon me-2 text-white"></i>
                <i className="bi bi-youtube footer-icon text-white"></i>
              </Col>
            </Row>

            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
              <Col>
                <div className="footer-links text-white">
                  <p>
                    <a href="#">Privacy</a>
                  </p>
                  <p>
                    <a href="#">Contact Us</a>
                  </p>
                  <p>
                    <a href="#">Corporate Information</a>
                  </p>
                </div>
              </Col>

              <Col>
                <div className="footer-links">
                  <p>
                    <a href="#">Investor Relations</a>
                  </p>
                  <p>
                    <a href="#">Legal Notices</a>
                  </p>
                  <p>
                    <a href="#">Terms of Use</a>
                  </p>
                </div>
              </Col>

              <Col>
                <div className="footer-links">
                  <p>
                    <a href="#">Help Center</a>
                  </p>

                  <p>
                    <a href="#">Cookie Preferences</a>
                  </p>
                  <p>
                    <a href="#">Gift Cards</a>
                  </p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="mb-2 mt-2 text-center copyright">
                © 2025 EasyPlay.
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
