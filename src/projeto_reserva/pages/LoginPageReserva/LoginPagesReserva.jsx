import './LoginPageReserva.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notifyError } from '../../Components/Utils/msgToast.jsx';
import Cabecalho from '../../Components/Cabecalho/Cabecalho.jsx';
import Rodape from '../../Components/Rodape/Rodape.jsx';

const LoginPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');    
    const inDevelopment = localStorage.getItem('inDevelopment');
    var url = '';
    if (inDevelopment === 'true') {
        url = 'http://localhost:5236/api/';
    } else {
        url = 'https://www.senailp.com.br/eventos-api/api/';
    }
    const getLogin = async () => {
        
        const credencial = {
            'email': email,
            'senha': senha
        }

        //console.log(JSON.stringify(credencial))
        try { 
            const response = await fetch(url + 'Usuario/login', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credencial)
            }).then(response => response.json())
        const data = await response;

            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.idUsuario);
            localStorage.setItem('nomeCompleto', data.nomeCompleto);
            localStorage.setItem('perfil', data.perfil);
            localStorage.setItem('telefone', data.telefone);
            localStorage.setItem('ativo', data.ativo);

            navigate('/');

        } catch (error) {
            notifyError("Usuário ou senha inválidos " + error)
            console.log('Usuário ou senha inválidos ' + error)
        }
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
            notifyError("Preencha todos os campos!")
            console.log('Preencha todos os campos')   
        } else {            
            getLogin()
        }        
    };

    const HandleKeyDown = (event) => {
        if(event.key === 'Enter') {
            onEnviar();
        }
    }


    return (
        <>
            <Cabecalho />
            <div className='container mt-3 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 login_inicio'>
                        <div className='login_titulo text-center'>
                            <h1>Acesso Restrito</h1>
                            <p>Preencha seus dados para continuar</p>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'></label>
                            <input type='text' className='form-control' id='email' placeholder='E-mail'  onChange={onAlterar} onKeyDown={HandleKeyDown}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='senha' className='form-label'></label>
                            <input type='password' className='form-control' id='senha' placeholder='Senha'  onChange={onAlterar} onKeyDown={HandleKeyDown}/>
                        </div>

                        <div className='d-grid'>
                            <button type='button' className='btn btn-primary' onClick={onEnviar}>Acessar</button>
                        </div>

                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-md-6 registro-link-dv'>
                        <p className='registro-link text-center'>Ainda não tem uma conta? <a href="/RegistrarAcesso">Registre-se aqui.</a></p>
                    </div>
                </div>

            </div>

            <Rodape />

            <ToastContainer />

        </>
    );
}

export default LoginPage;
