import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "../css/HomePage.css";
import video from "../assets/videocalcio.mp4";
import foto5 from "../assets/calcio5.jpg";
import foto7 from "../assets/calcio7.jpg";
import padel from "../assets/padel.jpg";
import foto11 from "../assets/calcio11.jpg";
import logo1 from "../assets/EASYPLAY_logoapp.svg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="video-container">
        <video className="video-background" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className="overlay-text">
          <Container fluid className="px-4">
            <Row className="align-items-center main-content">
              <Col md={12} className="text-section">
                <div className="w-100 p-0">
                  <img src={logo1} alt="logo" className="cta-image img-fluid" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container fluid className="px-4 pt-5">
        <Row className="justify-content-center">
          <Col md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={foto5} />
              <Card.Body>
                <Card.Title>Calcio a 5</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => navigate("/CreaEvento")}
                >
                  Crea Evento
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={foto7} />
              <Card.Body>
                <Card.Title>Calcio a 7</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => navigate("/CreaEvento")}
                >
                  Crea Evento
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={foto11} />
              <Card.Body>
                <Card.Title>Calcio a 11</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => navigate("/CreaEvento")}
                >
                  Crea Evento
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={padel} />
              <Card.Body>
                <Card.Title>Padel</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => navigate("/CreaEvento")}
                >
                  Crea Evento
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
