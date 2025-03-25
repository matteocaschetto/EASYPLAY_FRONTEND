import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "../css/HomePage.css";
import video from "../assets/videocalcio.mp4";
import foto5 from "../assets/calcio5.jpg";
import foto7 from "../assets/calcio7.jpg";
import padel from "../assets/padel.jpg";
import foto11 from "../assets/calcio11.jpg";

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
                <h1 className="title">
                  Organizza la tua partita in uno schiocco
                </h1>
                <p className="subtitle">
                  Organizza le tue partite e apri le convocazioni, al resto ci
                  pensiamo noi.
                </p>
                <Button
                  variant="primary"
                  className="cta-button"
                  onClick={() => navigate("/CreaEvento")}
                >
                  Crea il tuo match
                </Button>
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
