import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateUserAvatar } from "../redux/userSlice";
import { Card, Button, Form } from "react-bootstrap";

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
          <ul>
            {user.eventiCreati.map((evento, index) => {
              const dataFormattata = new Intl.DateTimeFormat("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Rome"
              }).format(new Date(evento.data));

              return (
                <li key={index}>
                  {evento.titolo}, {evento.luogo}, {evento.tipoEvento},{" "}
                  {dataFormattata}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Nessun evento creato</p>
        )}

        <h4 className="mt-4">Eventi a cui partecipo</h4>
        {user.eventiPartecipati && user.eventiPartecipati.length > 0 ? (
          <ul>
            {user.eventiPartecipati.map((evento, index) => {
              const dataFormattata = new Intl.DateTimeFormat("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Rome"
              }).format(new Date(evento.data));

              return (
                <li key={index}>
                  {evento.titolo}, {evento.luogo}, {evento.tipoEvento},{" "}
                  {dataFormattata}
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
