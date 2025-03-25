import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { format } from "date-fns";

const Eventi = () => {
  const [eventi, setEventi] = useState([]);

  useEffect(() => {
    const fetchEventi = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/eventi");
        if (response.ok) {
          const data = await response.json();
          setEventi(data);
        } else {
          console.error("Errore nel recupero degli eventi");
        }
      } catch (error) {
        console.error("Errore di rete:", error);
      }
    };

    fetchEventi();
  }, []);

  const prenotaEvento = async (eventoId) => {
    const token = localStorage.getItem("token");
    console.log("Token presente:", token);
    if (!token) {
      alert("Devi effettuare il login per partecipare all'evento.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/prenotazioni/prenotaPosto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            eventoId: eventoId,
            numeroPosti: 1
          })
        }
      );

      if (response.ok) {
        alert("Prenotazione avvenuta con successo!");
      } else {
        alert("Errore nella prenotazione. Riprova.");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      alert("Si è verificato un errore. Controlla la connessione.");
    }
  };

  return (
    <div className="eventi-container">
      <Container fluid className="px-4 pt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h3>Eventi a cui partecipare</h3>
            <ListGroup>
              {eventi.map((evento) => (
                <ListGroup.Item
                  key={evento.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{evento.tipoEvento}</strong>
                    <p>{evento.luogo}</p>
                    <p>{format(new Date(evento.data), "dd/MM/yyyy HH:mm")}</p>
                    <p>Posti disponibili: {evento.postiDisponibili}</p>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => prenotaEvento(evento.id)}
                  >
                    Partecipa
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Eventi;
