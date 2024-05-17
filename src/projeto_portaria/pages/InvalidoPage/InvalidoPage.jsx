import React from "react";
import "./InvalidoPage.css";
import imgAlert from "../../../assets/Images/alert.png";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import imgCabecalho from "../../../assets/Images/imgCabecalho.png";
import Alert from "../../components/Alert/Alert";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../components/Utils/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const InvalidoPage = () => {
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
      <div className="cabecalh">
        <Cabecalho cabecalho={imgCabecalho} />
      </div>
      <h1 className="logi"> Inválido</h1>
      <div className="bloco_czi">
        <div className="principal">
          <div className="bloco_red">
            <h3>
              ERRO na Validação
              <Alert alert={imgAlert} className="alert" />
            </h3>
          </div>
          <Link onClick={onEnviar} to="/TenteNovamente">
            <button className="botao_in">Tentar Novamente</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default InvalidoPage;
