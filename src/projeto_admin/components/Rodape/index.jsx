import React from 'react';
import './Rodape.css'; 
import senaiRodape from '../../../assets/Images/senaiRodape.png';
import Linha from '../../../assets/Images/Linha.png';

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-container"> 
      <div className="logo-container"> 
        <img className="senai"src={senaiRodape} alt="Logo"/>
        <img className="linha" src={Linha} alt='Logo'></img>
        <div className='botao-container'>
          <Link to='/admin/encontreEventos'>Encontre eventos</Link>
          <Link to='/admin/cidades'>Cidades</Link>
          <Link to='/admin/Suporte'>Suporte</Link>
        </div>
      </div>

      <img className="linha" src={Linha} alt='Logo'></img>

      <div className="botao-container">
        <a href="/admin">Home</a>
        <a href="https://sp.senai.br/o-senai/o-sistema-senai">Sobre</a>
        <a href="https://www.sp.senai.br/termos-de-uso-e-politica-de-privacidade">Termos e Políticas</a>
        <a href="https://transparencia.sp.senai.br/Content/arquivos/integridade/Senai_SP_Codigo_Etica.pdf" target="_blank" rel="noopener noreferrer">Ética e Conduta</a>
       
        
      </div>
      
    </footer>
  );
}

export default Footer;