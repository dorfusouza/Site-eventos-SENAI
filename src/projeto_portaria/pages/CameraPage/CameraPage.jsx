import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Rodape from "../../components/Rodape/Rodape";
import { isAuthenticated } from "../../components/Utils/auth.jsx";
import "./CameraPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CameraPage = () => {
  const navigate = useNavigate();

  const verificarAutenticacao = () => {
    if (!isAuthenticated()) {
      console.log("Usuário não autenticado");
      navigate("/");
    }
  };

  useEffect(() => {
    verificarAutenticacao();
  }, []);

  const onEnviar = () => {
    console.log("TESTE");
  };

  return (
    <>
      <Cabecalho />
      <div className="container d-flex mb-5 mt-5 flex-column align-items-center justify-content-center pt-5 pb-5" style={{paddingBottom: '600px'}}>
        <div className="row justify-content-center">
          <div className="col-auto text-center">
            <h1 className="va mt-3">Abrir a Câmera</h1>
            <Link onClick={onEnviar} to="/qrpage">
              <div className="cam d-flex flex-column align-items-center justify-content-center">
                <button className="btn btn-verde">Abra a Câmera</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export default CameraPage;
