/*import './Login.css'
import CampoTexto from '../CampoTexto/CampoTexto';
import {Link} from 'react-router-dom';


const Login = () => {
    function onEnviar() {
        console.log("TESTE")
                        {

            const navigate = useNavigate();
        
            const [email, setEmail] = useState('');
            const [senha, setSenha] = useState('');    
        
            const getLogin = async () => {
                
                const credencial = {
                    'email': email,
                    'senha': senha
                }
        
                //console.log(JSON.stringify(credencial))
                try {            
                    const response = await fetch('https://www.senailp.com.br/eventos-api/swagger/index.html', {
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
        
                    navigate('/InicioReserva');
        
                } catch (error) {
                    notifyError("Usuário ou senha inválidos " + error)
                    console.log('Usuário ou senha inválidos ' + error)
                }
            };
        
            const onAlterar = (event) => {
                const { name, value } = event.target;
        
                switch (name) {
                    case 'email':
                        setEmail(value);
                        break;
                    case 'senha':
                        setSenha(value);
                        break;
                    default:
                        break;
                }
                console.log("email: ", email);
                console.log("senha: ",senha);
            };
        
            const onEnviar = () => {
                if (email === '' || senha === '') {
                    notifyError("Preencha todos os campos!")
                    console.log('Preencha todos os campos')   
                } else {            
                    getLogin()
                }        
            }
        }
        
    }
    return(
        <>
        <div className='formulario'>

            <CampoTexto label = "" place="    E-mail"/>
            <CampoTexto label = "" place="    Senha"/>
            <p>

            </p>
            <button className='botaol'>
            <Link onClick={onEnviar} to="/validacao"> Entrar </Link>
            </button>
           
        </div>

        </>
    )
}
export default Login;*/

import './Login.css';
import {useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Certifique-se de importar useState e useNavigate do React

import { ToastContainer, toast } from 'react-toastify';
import { notifyError, notifySuccess } from '../../components/Utils/msgToast.jsx';

import CampoLogin from '../CampoLogin/CampoLogin';


const Login = () => {
    const navigate = useNavigate(); // Use o hook useNavigate diretamente no nível do componente
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const getLogin = async () => {
        const credencial = {
            email: email,
            senha: senha
        };
        try {
            const response = await fetch('https://www.senailp.com.br/eventos-api/api/Usuario/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credencial)
            });
            console.log(response);
            const data = await response.json();
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
            localStorage.setItem('nomeCompleto', data.nomeCompleto);
            localStorage.setItem('perfil', data.perfil);
            localStorage.setItem('telefone', data.telefone);
            localStorage.setItem('ativo', data.ativo);

            navigate('/validacao');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            notifyError("Usuário ou senha inválidos " + error);
        }
    };

    const onAlterar = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'senha':
                setSenha(value);
                break;
            default:
                break;
        }
        console.log(name, value);
    };

    const onEnviar = () => {
        if (email === '' || senha === '') {
            console.log('Preencha todos os campos');
            notifyError("Preencha todos os campos!");
        } else {
            getLogin();
        }
    };

    return (
        <>
            <div className='formulario'>
                <CampoLogin label='' place='email' aoAlterar={onAlterar} nome='email' valor={email} />
                <CampoLogin label='' place='Senha' aoAlterar={onAlterar} nome='senha' valor={senha} />
                <p></p>

                <button className='botaol' onClick={onEnviar} > Entrar </button>
            </div>
            <ToastContainer/>
        </>
    );
}

export default Login;
