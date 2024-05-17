import Menu from "../../components/Menu/Menu";
import CampoTexto from "../../components/CampoTexto/CampoTexto";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import imgCabecalho from "../../../assets/Images/cabecalho.png";
import Login from "../../components/Login/Login";
import "./LoginPage.css";

function LoginPage() {
  return (
    <>
      <Cabecalho cabecalho={imgCabecalho} className="cabecalho" />
      <h1 className="log"> Login </h1>
      <div className="bloco_czc">
        <Login />
      </div>
    </>
  );
}

export default LoginPage;
