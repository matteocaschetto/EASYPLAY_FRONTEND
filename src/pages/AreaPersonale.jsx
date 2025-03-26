import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserInfo,
  updateUserAvatar,
  deleteEvent,
  deleteReservation
} from "../redux/userSlice";
import { Card, Button, Form } from "react-bootstrap";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const AreaPersonale = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log("Dati utente nello stato Redux:", user);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.user.status === "loading");
  const error = useSelector((state) => state.user.error);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      dispatch(updateUserAvatar(formData));
    }
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId))
      .unwrap()
      .then(() => {
        console.log(`Evento ${eventId} eliminato con successo`);
      })
      .catch((error) => {
        console.error("Errore nella cancellazione evento:", error);
      });
  };

  const handleDeleteReservation = (reservationId) => {
    dispatch(deleteReservation(reservationId))
      .unwrap()
      .then(() => {
        console.log(`Prenotazione ${reservationId} annullata con successo`);
      })
      .catch((error) => {
        console.error("Errore nell'annullamento della prenotazione:", error);
      });
  };
  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;

  if (!user) return <p>Nessun dato utente disponibile</p>;

  return (
    <div className="container mt-4">
      <Card className="p-3 mb-5">
        <div className="d-flex align-items-center">
          <img
            src={
              user?.avatar ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt="Avatar"
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div className="ms-3">
            <h3>
              {user?.nome} {user?.cognome}
            </h3>
            <p>{user?.email}</p>
          </div>
        </div>

        <Form className="mt-3">
          <Form.Group className="">
            <Form.Label>Cambia immagine profilo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          {
            <Button variant="primary" className="mt-2" onClick={handleUpload}>
              Carica
            </Button>
          }
        </Form>

        <h4 className="mt-4">Eventi Creati</h4>

        {user.eventiCreati && user.eventiCreati.length > 0 ? (
          <ul className="list-unstyled">
            {user.eventiCreati.map((evento, index) => {
              const dataFormattata = format(
                new Date(evento.data),
                "dd/MM/yyyy",
                { locale: it }
              );
              const orarioFormattato = format(
                new Date(`1970-01-01T${evento.orario}`),
                "HH:mm",
                { locale: it }
              );

              return (
                <li
                  key={index}
                  className="d-flex align-items-center mb-3 border rounded p-3"
                >
                  <div className="col-4 col-md-3 text-center">
                    <div className="btn btn-light w-100">
                      <strong>{dataFormattata}</strong>
                      <br />
                      <strong>{orarioFormattato}</strong>
                    </div>
                  </div>

                  <div className="col-5 col-md-6 text-center">
                    <div>
                      <strong>{evento.titolo}</strong>
                    </div>
                    <div>{evento.luogo}</div>
                    <div>{evento.tipoEvento}</div>
                  </div>

                  <div className="col-3 col-md-3 text-center">
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteEvent(evento.id)}
                    >
                      Elimina
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Nessun evento creato</p>
        )}

        <h4 className="mt-4">Eventi a cui partecipo</h4>
        {user.eventiPartecipati && user.eventiPartecipati.length > 0 ? (
          <ul className="list-unstyled">
            {user.eventiPartecipati.map((evento, index) => {
              const dataFormattata = format(
                new Date(evento.data),
                "dd/MM/yyyy",
                { locale: it }
              );
              const orarioFormattato = format(
                new Date(`1970-01-01T${evento.orario}`),
                "HH:mm",
                { locale: it }
              );

              return (
                <li
                  key={index}
                  className="d-flex align-items-center mb-3 border rounded p-3"
                >
                  <div className="col-4 col-md-3 text-center">
                    <div className="btn btn-light w-100">
                      <strong>{dataFormattata}</strong>
                      <br />
                      <strong>{orarioFormattato}</strong>
                    </div>
                  </div>

                  <div className="col-5 col-md-6 text-center">
                    <div>
                      <strong>{evento.titolo}</strong>
                    </div>
                    <div>{evento.luogo}</div>
                    <div>
                      <strong>{evento.tipoEvento}</strong>
                    </div>
                  </div>

                  <div className="col-3 col-md-3 text-center">
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteReservation(evento.id)}
                    >
                      Annulla Prenotazione
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Nessun evento a cui partecipi</p>
        )}
      </Card>
    </div>
  );
};

export default AreaPersonale;
