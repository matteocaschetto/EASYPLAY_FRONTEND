import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import logo from "../assets/LOGO_EASYPLAY-02.jpg";
const ChiSiamo = () => {
  return (
    <div className="chi-siamo-container">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Image
              src={logo}
              alt="EasyPlay Logo"
              fluid
              className="mb-4 rounded-4"
            />
            <h2>Chi siamo</h2>
            <p>
              Benvenuto su EasyPlay! Siamo un team appassionato di sport e
              tecnologia, impegnati a rendere l'organizzazione di eventi
              sportivi un gioco da ragazzi. EasyPlay nasce con l'idea di
              semplificare la gestione e la partecipazione a partite amatoriali,
              rendendo il tutto veloce e intuitivo.
            </p>
            <h4>Il fondatore: Matteo Caschetto</h4>
            <Card className="my-4">
              <Card.Body>
                <p>
                  Mi chiamo Matteo Caschetto, ho 26 anni e sono nato e vivo a
                  Modica (RG). Ho frequentato il corso full-stack developer di
                  Epicode, che mi ha permesso di acquisire le competenze
                  necessarie per creare questo sito web. La mia passione per lo
                  sviluppo e per lo sport mi ha spinto a combinare queste due
                  passioni e dare vita a EasyPlay.
                </p>
              </Card.Body>
            </Card>
            <p>
              Il nostro obiettivo è rendere più facile l'organizzazione delle
              partite tra amici o colleghi, fornendo un'esperienza utente fluida
              e accessibile.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChiSiamo;
