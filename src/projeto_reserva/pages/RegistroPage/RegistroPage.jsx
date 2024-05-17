import './RegistroPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import { notifyError, notifySuccess } from '../../Components/Utils/msgToast.jsx';

import CampoTexto from '../../Components/CampoTexto/CampoTexto.jsx';
import Cabecalho from '../../Components/Cabecalho/Cabecalho.jsx';
import Rodape from '../../Components/Rodape/Rodape.jsx';
import Botao from '../../Components/Botao/Botao.jsx';

const RegistroPage = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({idUsuario:'0', email: '', nomeCompleto: '', senha: '', telefone: '', perfil: 'Usuario', ativo: 1 });
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const inDevelopment = localStorage.getItem('inDevelopment');
    var url = '';
    if (inDevelopment === 'true') {
        url = 'http://localhost:5236/api/';
    } else {
        url = 'https://www.senailp.com.br/eventos-api/api/';
    }

    const notifyError = (msg) => 
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
    const notifySuccess = (msg) =>
      toast.success(msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      const getCadastrar = async () => {
        try {
            const credencial = usuario
            console.log(credencial)
            const response = await fetch(url + 'Usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credencial)
            });
    
            // Exibe a notificação de sucesso
            notifySuccess("Usuário registrado com sucesso");
    
            // Aguarda 2 segundos (2000 milissegundos) antes de navegar para a tela de login
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Ajuste o tempo conforme necessário
    
        } catch (error) {
            // Em caso de erro, exibe a notificação de erro
            notifyError("Falha no registro de usuário");
        }
    };
    

    const onAlterar = (event) => {
        const { name, value } = event.target;
        setUsuario( usuario => ({...usuario, [name]: value })); 
        
        if (name === 'confirmarSenha') {
            setConfirmarSenha(value);           
        }     
    };

    const onEnviar = () => {
          
        if (usuario.email === '' || usuario.nomeCompleto === '' || usuario.senha === '' || usuario.telefone === '') {
            notifyError("Preencha todos os campos")
            return;
        }
        if (usuario.senha !== confirmarSenha) {
            notifyError("As senhas não conferem")
            return;
        }

        getCadastrar();
    };


    return (
        <>
            <Cabecalho />
            <div className='tudo_login'>


                <div className='login_inicio'>
                    <div className='login_titulo'>
                        <h1>Registro de Acesso</h1>
                        <p>Preenche todos os dados</p>
                    </div>                   
                        
                    <CampoTexto label='' place='Nome Completo' nome='nomeCompleto' aoAlterar={onAlterar} />
                    <CampoTexto label='' place='Telefone' nome='telefone' aoAlterar={onAlterar} />
                    <CampoTexto label='' place='E-mail' nome='email' aoAlterar={onAlterar} />
                    <CampoTexto label='' place='Senha' tipo='password'  nome='senha' aoAlterar={onAlterar} />
                    <CampoTexto label='' place='Confirmar Senha' tipo='password'  nome='confirmarSenha' aoAlterar={onAlterar} />                    

                    <div className='botao_login'>
                        <Botao children="Cadastrar" onClick={onEnviar} />
                    </div>
                
                </div>

            </div>
            <Rodape />

            <ToastContainer />

        </>
    );
}

export default RegistroPage;
