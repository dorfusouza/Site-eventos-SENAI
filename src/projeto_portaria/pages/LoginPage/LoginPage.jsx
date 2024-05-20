import React, { useState } from 'react';
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Login from "../../components/Login/Login";
import Rodape from "../../components/Rodape/Rodape";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LoginPage.css";

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    // Simular processo de login (por exemplo, com uma requisição assíncrona)
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoggingIn(false);
    }, 1000); 
  };

  return (
    <>
    <Cabecalho />
    <div className="container d-flex mb-4 mt-5 flex-column align-items-center justify-content-center" style={{}}>
      <div className="card d-flex flex-column align-items-center" style={{ width: "100%", maxWidth: "400px"}}>
        <h1 className="mb-4 text-center">Login</h1>
        <Login onLogin={handleLogin} />
        {isLoggingIn && <p className="text-center">Aguarde... Efetuando login</p>}
        {isAuthenticated && <p className="text-success text-center">Login efetuado com sucesso!</p>}
      </div>
    </div>
    <Rodape />
  </>
);
}

export default LoginPage;