/*import Menu from '../../components/Menu/Menu'
import CampoTexto from '../../components/CampoTexto/CampoTexto'
import imgCabecalho from '../../assets/images/cabecalho.png'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import Camera from '../../components/Camera/Camera'
import imgCamera from '../../assets/images/camera.png'
import { Link } from 'react-router-dom';

import './TenteNovamentePage.css'


function TenteNovamentePage() {

    function onEnviar() {
        console.log("TESTE")
    }
    return (
        <>
            <Cabecalho cabecalho={imgCabecalho} />
            <h1> Tente Novamente </h1>

            <h2>Leitura Inválida</h2>
            <div className='bloco_cz_tn'>

                <div className='princi'>
                    <div className='tnt'>
                        <h4 className='ab'>Abrir Câmera</h4>
                        <button className='bt_cam'>
                            <Link onClick={onEnviar} to="/qrpage"> <Camera camera={imgCamera} /> </Link>
                        </button>

                    </div>
                    <div className='texto'>
                        <h4> OU</h4>
                        <h4>TENTE DIGITAR O CÓDIGO</h4>
                        <CampoTexto />

                        <button className='botaotn'>
                            <Link onClick={onEnviar} to="/confirmacao"> Validar </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TenteNovamentePage*/
/*
import React, { useState } from 'react';
import CampoTexto from '../../components/CampoTexto/CampoTexto';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from '../../components/Utils/msgToast.jsx';
import { isAuthenticated } from '../../components/Utils/auth.jsx';


import './TenteNovamentePage.css';

function TenteNovamentePage() {
    const [codigo, setCodigo] = useState('');
    const navigate = useNavigate();

    function onValidar() {
        if (codigo === 'codigo_correcto') {
            notifySuccess('Código válido. Redireccionando...');
            navigate('/confirmacao');
        } else {
            notifyError('Código inválido Tente Novamente');
        }
    }


    
    const onReadSuccess = async (decodedText, decodedResult) => {
        
        scannerRef.current = html5QrCodeScanner;

        html5QrCodeScanner.render(onReadSuccess, onScanError);

        const resultadoQrCode = document.getElementById('resultadoQrCode');
        resultadoQrCode.innerText = decodedText;

        let resultado = await verificaQRCODE(decodedText);
        //console.log(resultado)
        if (resultado) {
            window.location.href = "/confirmacao";
        } else {
            window.location.href = "/invalido";
        }

        return () => clearTimeout(timeoutId);
    };

    const verificaQRCODE = async (qrCodeLidoo) => {

        try {
            const response = await fetch(`https://www.senailp.com.br/eventos-api/api/Ingresso/Verifica/${qrCodeLidoo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
               
            });
            console.log(response);

            const data = await response.json();
           
            if(response.status === 200){
                return true;
            }else{
                return false;
            }

        } catch (error) {
            //notifyError("Usuário ou senha inválidos " + error);
            return false;
        }

    }

    const onScanError = (errorMessage) => {
        console.error("Erro ao Digitar o QR Code:", errorMessage);
    };


    return (
        <>
            <h1> Tente Novamente </h1>
            <h2>Leitura Inválida</h2>
            <div className='bloco_cz_tn'>
                <div className='princi'>
                    <div className='texto'>
                        <h4>TENTE DIGITAR O CÓDIGO</h4>
                        <CampoTexto value={codigo} onChange={e => setCodigo(e.target.value)} />
                        <button className='botaotn' onClick={onValidar}> Validar </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default TenteNovamentePage;


import React, { useState } from 'react';
import CampoTexto from '../../components/CampoTexto/CampoTexto';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from '../../components/Utils/msgToast.jsx';

import './TenteNovamentePage.css';

function TenteNovamentePage() {
    const [codigo, setCodigo] = useState('');
    const navigate = useNavigate();

    const onValidar = async () => {
        try {
            const valido = await verificaQRCODE(codigo);
            if (valido) {
                navigate('/confirmacao');
            } else {
                notifyError('Código inválido. Tente novamente.');
            }
        } catch (error) {
            notifyError('Ocorreu um erro ao verificar o código. Tente novamente.');
        }
    };

    const verificaQRCODE = async (qrCode) => {
        try {
            const response = await fetch(`https://www.senailp.com.br/eventos-api/api/Ingresso/Verifica/${qrCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Erro ao verificar código QR:', error);
            throw error;
        }
    };

    return (
        <>
            <h1> Tente Novamente </h1>
            <h2>Leitura Inválida</h2>
            <div className='bloco_cz_tn'>
                <div className='princi'>
                    <div className='texto'>
                        <h4>TENTE DIGITAR O CÓDIGO</h4>
                        <CampoTexto value={codigo} onChange={e => setCodigo(e.target.value)} />
                        <button className='botaotn' onClick={onValidar}> Validar </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default TenteNovamentePage;*/

import React, { useState } from "react";
import CampoTexto from "../../components/CampoTexto/CampoTexto";
import "../../components/CampoTexto/CampoTexto.jsx";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../components/Utils/msgToast.jsx";
import { ToastContainer } from "react-toastify";
import "./TenteNovamentePage.css";
import Cabecalho from "../../components/Cabecalho/Cabecalho.jsx";
import imgCabecalho from "../../../assets/Images/cabecalho.png";
import { Link } from "react-router-dom";
import Camera from "../../components/Camera/Camera";
import imgCamera from "../../../assets/Images/camera.png";
import { useEffect } from "react";
import { isAuthenticated } from "../../components/Utils/auth.jsx";

function TenteNovamentePage() {
  const [codigo, setCodigo] = useState("");

  function onEnviar() {
    console.log("TESTE");
  }

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

  const onValidar = async () => {
    try {
      // const campoQr = document.getElementById('input');
      const valido = await verificaCodigo(codigo);
      console.log(valido);
      if (valido == true) {
        navigate("/confirmacao");
      } else {
        notifyError("Código inválido. Tente novamente.");
      }
    } catch (error) {
      notifyError("Ocorreu um erro ao verificar o código. Tente novamente.");
    }
  };

  const verificaCodigo = async (valido) => {
    try {
      const response = await fetch(
        `https://www.senailp.com.br/eventos-api/api/Ingresso/Verifica/${valido}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.ok === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      throw error;
    }
  };

  return (
    <>
      <Cabecalho cabecalho={imgCabecalho} className="cabecalh" />

      <h1 className="logt"> Tente Novamente </h1>
      <div className="bloco_cz_tn">
        <div className="princi">
          <div className="texto">
            <h2>Leitura Inválida</h2>

            <Link onClick={onEnviar} to="/qrpage">
              <div className="came">
                <h4 className="ab">Abrir Câmera Novamente</h4>
                <button className="botaocam">
                  <Camera camera={imgCamera} />
                </button>
              </div>
            </Link>

            <h4>OU</h4>

            <h4>TENTE DIGITAR O CÓDIGO</h4>
            <CampoTexto value={codigo} aoAlterar={setCodigo} />

            <button className="botaotn" onClick={onValidar}>
              Validar
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default TenteNovamentePage;
