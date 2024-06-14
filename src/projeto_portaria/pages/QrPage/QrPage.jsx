import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { isAuthenticated } from "../../components/Utils/auth.jsx";
import { useNavigate } from "react-router-dom";
import Rodape from "../../components/Rodape/Rodape.jsx";
import constantes from '../../../componentes/Constantes.jsx';
import './QrPage.css'; // Adicione este import para o CSS

const QrPage = () => {
  const navigate = useNavigate();
  const [errorApi, setErroApi] = useState(false);
  const [msgApi, setmsgApi] = useState("");
  const [cameraAtivada, setCameraAtivada] = useState(false);
  const [loading, setLoading] = useState(false);

  const inDevelopment = localStorage.getItem('inDevelopment');
  const url = inDevelopment === 'true' ? constantes.localApiUrl : constantes.apiUrl;

  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("Usuário não autenticado");
      navigate("/");
    }
  }, [navigate]);

  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      const html5QrCodeScanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 400,
      });

      scannerRef.current = html5QrCodeScanner;

      html5QrCodeScanner.render(onScanSuccess, onScanError);
      setCameraAtivada(true);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
        setCameraAtivada(false);
      }
    };
  }, []);

  const onScanSuccess = async (decodedText, decodedResult) => {
    setLoading(true);
    setCameraAtivada(false);

    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }

    const resultadoQrCode = document.getElementById("resultadoQrCode");
    if (resultadoQrCode) {
      resultadoQrCode.innerText = decodedText;
    }

    const resultado = await verificaQRCODE(decodedText);
    if (resultado) {
      window.location.href = "/portaria/confirmacao";
    } else {
      window.location.href = "/portaria/invalido";
    }
  };

  const verificaQRCODE = async (qrCodeLido) => {
    try {
      const response = await fetch(`${url}Ingresso/Verifica/${qrCodeLido}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const data = await response.json();

      return data.mensagem === "Acesso concedido!";
    } catch (error) {
      console.error("Erro na verificação do QR Code:", error);
      return false;
    }
  };

  const onScanError = (errorMessage) => {
    console.error("Erro ao ler QR Code:", errorMessage);
  };

  return (
    <>
      <Cabecalho />
      <div className="container d-flex mb-5 mt-5 flex-column align-items-center justify-content-center pt-5 pb-5" style={{ paddingBottom: '600px' }}>
        <div className="row justify-content-center">
          <div className="col text-center">
            <h1 className="p-4">Aponte o QR CODE</h1>
            <div className="bloco_czc pb-5 d-flex justify-content-center">
              <div className="camera-container">
                <div ref={videoRef} id="reader" style={{ width: "100%", height: "100%" }}></div>
                {cameraAtivada && <div className="qr-overlay"></div>}
                {loading && (
                  <div className="loading-section">
                    <div className="loading-overlay d-flex justify-content-center align-items-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>                    
                    </div>                  
                    <div className="loading-text mt-3">Aguarde, verificando ingresso...</div>
                  </div>
                )}
              </div>
            </div>
            <div id="resultadoQrCode" className="mt-2"></div>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export default QrPage;
