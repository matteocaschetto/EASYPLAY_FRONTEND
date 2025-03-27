import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { format } from "date-fns";
import "../css/Eventi.css";

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
      <Container fluid className=" px-4 pt-5 mb-5">
        <Row className=" justify-content-center">
          <Col md={8}>
            <h3>Eventi a cui partecipare</h3>
            <ListGroup>
              {eventi.map((evento) => (
                <ListGroup.Item
                  key={evento.id}
                  className=" d-flex align-items-center mb-3 border rounded p-3"
                >
                  <div className="col-4 col-md-3 text-center ">
                    <div className="btn btn-light w-100">
                      <strong>
                        {format(new Date(evento.data), "dd/MM/yyyy ")}
                      </strong>
                      <br />
                      <strong>
                        {format(
                          new Date(`1970-01-01T${evento.orario}`),
                          "HH:mm"
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="col-5 col-md-6 text-center">
                    <div>
                      <strong>{evento.tipoEvento}</strong>
                    </div>
                    <div>{evento.luogo}</div>
                    <div>Posti disponibili: {evento.postiDisponibili}</div>
                  </div>

                  <div className="col-3 col-md-3 text-center">
                    <Button
                      className="partecipa-evento"
                      variant="primary"
                      onClick={() => prenotaEvento(evento.id)}
                    >
                      Partecipa
                    </Button>
                  </div>
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
