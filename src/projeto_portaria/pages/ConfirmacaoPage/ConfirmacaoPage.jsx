
import React from "react";
 
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../components/Utils/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Rodape from "../../components/Rodape/Rodape.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import certo from '../../../assets/Images/certo.png'
 
 
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
      <Cabecalho />
      <div className="container d-flex mb-5 mt-5 flex-column align-items-center justify-content-center pt-5 pb-5" style={{paddingBottom: '600px'}}>
      <h1>Validar Ingresso</h1>
        <div className="card text-center" style={{ width: 300 , height:350}}>
          <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: "#00FF00", border: 0 }}>
            <img src={certo} alt="ex" style={{ width: 100, height: 100 }} />
            <h5 className="card-title">Validação feita com sucesso!</h5>
            <a href="/portaria/validacao" className="btn btn-primary mt-4 col-12" >Voltar ao Incio</a>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export default InvalidoPage;