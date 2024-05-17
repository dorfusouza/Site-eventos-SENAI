import './PerfilPage.css'
import React from 'react';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../Components/Utils/auth.jsx';

import { ToastContainer, toast } from 'react-toastify';
import { notifyError, notifySuccess } from '../../Components/Utils/msgToast.jsx';

import Cabecalho from '../../Components/Cabecalho/Cabecalho.jsx'
import Rodape from '../../Components/Rodape/Rodape.jsx'
import perfil_grande from '../../../assets/Images/perfil_grande.png'
import Menu from "../../../projeto_admin/components/Menu/index.jsx";

const PerfilPageReserva = () => {
  const navigate = useNavigate();
  
  const verificarAutenticacao = () => {
    if (!isAuthenticated()) {
      console.log('Usuário não autenticado');
      navigate('/Login');
    }
  }

  useEffect(() => {
    verificarAutenticacao();
  }, []);


  const nome = localStorage.getItem('nomeCompleto');
  const email = localStorage.getItem('email');
  const tel = localStorage.getItem('telefone');
  const perfil = localStorage.getItem('perfil');

  return (
    <div>

      <Menu/>

      <div className='body'>
        <div className='imagem_lado_esquerdo'>
          <h1 className='perfil'>Perfil</h1>
          <img src={perfil_grande} />
        </div>
        <div className='line'></div>
        <div className='lado_direito'>
          <div className='nome'>Nome completo: </div>
          <p>{nome}</p>
          <div className='nome'>Email: </div>
          <p> {email}</p>
          <div className='nome'>Telefone: </div>
          <p> {tel} </p>
          <div className='nome'>Tipo: </div>
          <p>{perfil}</p>
        </div>
      </div>
      <Rodape />

      <ToastContainer />
    </div>

  )
}

export default PerfilPageReserva;