import React, { useState /* , useEffect  */ } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch /* , useSelector */ } from "react-redux";
import { setUser, setToken } from "../redux/authActions";
import "../css/Login.css";

const Accedi = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nome: "",
    cognome: "",
    email: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* const token = useSelector((state) => state.auth.token); */

  /* useEffect(() => {
    if (token) {
      navigate("/areapersonale");
    }
  }, [token, navigate]); */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      const payload = {
        username: formData.username,
        password: formData.password
      };

      try {
        const response = await fetch("http://localhost:8080/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.token) {
          localStorage.setItem("token", data.token);
          dispatch(setToken(data.token));
          dispatch(setUser(data.user));
          navigate("/areapersonale");
        } else {
          setError("Credenziali non valide");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Errore durante il login. Riprova.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/user/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSuccess("Registrazione avvenuta con successo!");
          {success && <Alert variant="succes">{success}</Alert>}
        } else {
          setError("Registrazione fallita.");
        }
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        setError("Errore durante la registrazione.");
      }
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      try {
        const response = await fetch("http://localhost:8080/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });

        const data = await response.json();
        if (response.ok && data.token) {
          {
            success && <Alert variant="success">{success}</Alert>;
          }
          dispatch(setToken(data.token));
          dispatch(setUser(data.user));
          navigate("/areapersonale");
        } else {
          setError("Credenziali non valide");
        }
      } catch {
        setError("Errore durante il login.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/user/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSuccess("Registrazione avvenuta con successo!");
          {
            success && <Alert variant="succes">{success}</Alert>;
          }
        } else {
          setError("Registrazione fallita.");
        }
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        setError("Errore durante la registrazione.");
      }
    }
  };
  return (
    <div className="login-container">
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h2 className="mb-4 text-white">
          {isLogin ? "Accedi a EasyPlay!" : "Registrati a EasyPlay!"}
        </h2>

        <div className="form-container">
          <Form onSubmit={handleSubmit} className="">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {!isLogin && (
              <>
                <Form.Group className="mb-3" controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cognome">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" className="login-button">
              {isLogin ? "Login" : "Registrati"}
            </Button>
          </Form>
        </div>

        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-3 text-white"
        >
          {isLogin
            ? "Non hai un account? Registrati"
            : "Hai già un account? Accedi"}
        </Button>
      </Container>
    </div>
  );
};

export default Accedi;
