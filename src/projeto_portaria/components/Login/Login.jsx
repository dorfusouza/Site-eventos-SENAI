import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../../components/Utils/msgToast';
import 'react-toastify/dist/ReactToastify.css';
import CampoLogin from '../CampoLogin/CampoLogin';
import constantes from "../../../componentes/Constantes.jsx";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inDevelopment = localStorage.getItem('inDevelopment');

  var url = '';
    if (inDevelopment === 'true') {
        url = constantes.localApiUrl;
    } else {
        url = constantes.apiUrl;
    }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const credencial = {
      'email': email,
      'senha': senha
    }

    try {
      console.log(credencial)
      const response = await fetch(url + 'Usuario/login', {
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

      navigate('/portaria/validacao');

    } catch (error) {
      notifyError("Usuário ou senha inválidos ");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'senha') setSenha(value);
  };

  const onAlterar = (event) => {
    const { id, value } = event.target;
    if (id === 'email') {
        setEmail(value);
    } else {
        setSenha(value);
    }
};

const onEnviar = () => {
    if (email === '' || senha === '') {
        notifyError("Preencha todos os campos!");
    } else {            
        getLogin();
    }
};

const HandleKeyDown = (event) => {
    if(event.key === 'Enter') {
        onEnviar();
    }
};

const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};


  return (
    <div className="d-flex flex-column align-items-center">
      <form onSubmit={handleSubmit} className="w-100">
        {/* <CampoLogin place="Digite seu email" nome="email" value={email} aoAlterar={handleInputChange} />
        <CampoLogin place="Digite sua senha" nome="senha" value={senha} aoAlterar={handleInputChange} tipo="password" /> */}
        
        <div className='mb-3'>
            <input type='text' className='form-control' id='email' placeholder='E-mail' onChange={onAlterar} onKeyDown={HandleKeyDown} />
        </div>
        <div className='mb-3 input-group'>
            <input type={showPassword ? 'text' : 'password'} className='form-control' id='senha' placeholder='Senha' onChange={onAlterar} onKeyDown={HandleKeyDown} />
            <span className={`input-group-text btn btn-outline-secondary border border-1 ${showPassword ? 'border-danger' : ''}`} onClick={toggleShowPassword}>
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
            </span>
        </div>
        
        <div className='d-grid gap-2'>
            <button className='btn btn-primary fs-5' type="submit">Acessar</button>
        </div>
        
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;