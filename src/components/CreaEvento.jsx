import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "../css/CreaEvento.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/userSlice";

const CreaEvento = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [data, setData] = useState("");
  const [orario, setOrario] = useState(""); // Aggiungi orario
  const [luogo, setLuogo] = useState("");
  const [postiDisponibili, setPostiDisponibili] = useState(1);
  const [maxPartecipanti, setMaxPartecipanti] = useState(1);
  const [tipoEvento, setTipoEvento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const newEvent = {
      titolo,
      descrizione,
      data: new Date(data).toISOString().split("T")[0],
      orario,
      luogo,
      postiDisponibili: parseInt(postiDisponibili),
      maxPartecipanti: parseInt(maxPartecipanti),
      tipoEvento
    };

    try {
      if (!token) {
        setErrorMessage("Utente non autenticato. Effettua il login.");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };

      const response = await axios.post(
        "http://localhost:8080/api/eventi/new",
        newEvent,
        { headers }
      );

      setSuccessMessage("Evento creato con successo!");
      console.log("Evento creato con successo:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Errore durante la creazione dell'evento:", error);
      setErrorMessage("Errore durante la creazione dell'evento.");
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h1>Crea Nuovo Evento</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitolo">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo dell'evento"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescrizione">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Inserisci la descrizione dell'evento"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicData">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicOrario">
          <Form.Label>Orario</Form.Label>
          <Form.Control
            type="time"
            value={orario}
            onChange={(e) => setOrario(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLuogo">
          <Form.Label>Luogo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il luogo dell'evento"
            value={luogo}
            onChange={(e) => setLuogo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPostiDisponibili">
          <Form.Label>Posti Disponibili</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={postiDisponibili}
            onChange={(e) => setPostiDisponibili(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMaxPartecipanti">
          <Form.Label>Numero Massimo di Partecipanti</Form.Label>
          <Form.Control
            type="number"
            min={postiDisponibili}
            value={maxPartecipanti}
            onChange={(e) => setMaxPartecipanti(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            Il numero massimo di partecipanti non può essere inferiore ai posti
            disponibili.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTipoEvento">
          <Form.Label>Tipo Evento</Form.Label>
          <Form.Control
            as="select"
            value={tipoEvento}
            onChange={(e) => setTipoEvento(e.target.value)}
            required
          >
            <option value="">Seleziona un tipo</option>
            <option value="calcio5">Calcio a 5</option>
            <option value="calcio7">Calcio a 7</option>
            <option value="calcio11">Calcio a 11</option>
            <option value="padel">Padel</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Crea Evento
        </Button>
      </Form>
    </Container>
  );
};

export default CreaEvento;
