import React, { useEffect, useRef, useState } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { isAuthenticated } from "../../components/Utils/auth.jsx";
import { useNavigate } from "react-router-dom";
import Rodape from "../../components/Rodape/Rodape.jsx";
import constantes from "../../../componentes/Constantes.jsx";
import "./QrPage.css";
import QrReader from "react-qr-scanner";

const QrPage = () => {
  const navigate = useNavigate();
  const [cameraAtivada, setCameraAtivada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultadoQrCode, setResultadoQrCode] = useState("");
  const [facingMode, setFacingMode] = useState("environment");

  const inDevelopment = localStorage.getItem("inDevelopment");
  const url = inDevelopment === "true" ? constantes.localApiUrl : constantes.apiUrl;

  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("Usuário não autenticado");
      navigate("/");
    }
  }, [navigate]);

  const handleScan = (data) => {
    if (data) {
      setResultadoQrCode(data);
      setLoading(true);
      setCameraAtivada(false);
      scanResultado(data);
    }
  };

  const handleError = (err) => {
    console.error("Erro ao acessar a câmera:", err);
  };

  const scanResultado = async (decodedText) => {
    try {
      const response = await fetch(`${url}Ingresso/Verifica/${decodedText}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const data = await response.json();

      if (data.mensagem === "Acesso concedido!") {
        navigate("/portaria/confirmacao");
      } else {
        navigate("/portaria/invalido");
      }
    } catch (error) {
      console.error("Erro na verificação do QR Code:", error);
      navigate("/portaria/invalido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="container d-flex mb-5 mt-5 flex-column align-items-center justify-content-center pt-5 pb-5" style={{ paddingBottom: "600px" }}>
        <div className="col justify-content-center">
          <div className="col text-center">
            <h2 className="p-4">Aponte para o QRCODE</h2>
            <div className="bloco_czc pb-5 d-flex justify-content-center">
              <div className="camera-container">
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%", height: "100%" }}
                  constraints={{
                    video: { facingMode: facingMode }
                  }}
                />
                {<div className="qr-overlay"></div>}
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
            <div id="resultadoQrCode" className="mt-2">{resultadoQrCode}</div>
            <div className="camera-toggle-buttons">
              <button onClick={() => setFacingMode("user")} className="btn btn-outline-success m-2">Câmera Frontal</button>
              <button onClick={() => setFacingMode("environment")} className="btn btn-outline-success m-2">Câmera Traseira</button>
            </div>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export default QrPage;
