import React from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h2>Ciao, {user ? user.name : "User"}!</h2>
      <Button variant="primary" onClick={() => navigate("/CreaEvento")}>
        Crea un nuovo evento!
      </Button>

      {}
    </Container>
  );
};

export default Dashboard;
