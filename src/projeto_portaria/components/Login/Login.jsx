import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../../components/Utils/msgToast';
import 'react-toastify/dist/ReactToastify.css';
import CampoLogin from '../CampoLogin/CampoLogin';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credencial = {
      'email': email,
      'senha': senha
    }

    try {
      console.log(credencial)
      const response = await fetch('https://www.senailp.com.br/eventos-api/api/Usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credencial)
      });

      const data = await response.json();

      localStorage.setItem('email', data.email);
      localStorage.setItem('id', data.id);
      localStorage.setItem('nomeCompleto', data.nomeCompleto);
      localStorage.setItem('perfil', data.perfil);
      localStorage.setItem('telefone', data.telefone);
      localStorage.setItem('ativo', data.ativo);

      navigate('/validacao');

    } catch (error) {
      notifyError("Usuário ou senha inválidos " + error);
      console.log('Usuário ou senha inválidos ' + error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'senha') setSenha(value);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <form onSubmit={handleSubmit} className="w-100">
        <CampoLogin label="Email" place="Digite seu email" nome="email" value={email} aoAlterar={handleInputChange} />
        <CampoLogin label="Senha" place="Digite sua senha" nome="senha" value={senha} aoAlterar={handleInputChange} tipo="password" />
        <button type="submit" className="btn btn-primary btn-block mt-3">Entrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;