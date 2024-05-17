import "./CameraPage.css";
import React from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import imgCabecalho from "../../../assets/Images/imgCabecalho.png";
import Camera from "../../components/Camera/Camera";
import imgCamera from "../../../assets/Images/camera.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../components/Utils/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

  function onEnviar() {
    console.log("TESTE");
  }
  return (
    <>
      <Cabecalho cabecalho={imgCabecalho} />
      <h1 className="logc"> Abra a Câmera </h1>

      <div className="bloco_czc">
        <div className="principal">
          <Link onClick={onEnviar} to="/qrpage">
            <div className="cam">
              <h4 className="ab">Abrir Câmera</h4>
              <button className="botaocam">
                <Camera camera={imgCamera} />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CameraPage;
