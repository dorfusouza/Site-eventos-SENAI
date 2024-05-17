import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { isAuthenticated } from '../../components/Utils/auth.jsx';

import './ValidacaoPage.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import imgCabecalho from '../../../assets/Images/cabecalho.png'
import Icone from "../../components/IconIngresso/IconIngresso";
import imgIcone from '../../../assets/Images/icone_ing.png'
import Menu from '../../components/Menu/Menu'
import Login from '../../components/Login/Login'
import CampoTexto from '../../components/CampoTexto/CampoTexto'


const Validacao = () => {
    const navigate = useNavigate();

    const verificarAutenticacao = () => {
        if (!isAuthenticated()) {
            console.log('Usuário não autenticado');
            navigate('/');
        }
    }

    useEffect(() => {
        verificarAutenticacao();
    }, []);

    const onLogoff = () => {

        localStorage.setItem('email', '');
        localStorage.setItem('id', '');
        localStorage.setItem('nomeCompleto', '');
        localStorage.setItem('perfil', '');
        localStorage.setItem('telefone', '');

        navigate('/');
    };

    function onEnviar() {
        console.log("TESTE")
    }


    return (
        <>
            <Cabecalho cabecalho={imgCabecalho} />
            <h1 className='log'> Validar Ingresso <button onClick={onLogoff} className='lg'> Sair </button> </h1>
            <div className="bloco_czc">
                <div className="principal">

                <Link onClick={onEnviar} to="/camera">
                    <div className="bloco_b1">
                        <h3 className="valida_bt">
                             Validar Ingresso
                        </h3>

                        <Icone icone={imgIcone} />
                    </div>
                    </Link>

                    {/*<div className="bloco_b2">
                        <h3> Usuários Validados </h3>
                        <p className="x"> X Adultos </p>
                        <p className="x"> X Infantil </p>
                        <h3> Usuários Não Validados </h3>
                        <p className="x"> X Adultos </p>
                        <p className="x"> X Infantil </p>
    </div>*/}

                </div>
            </div>
        </>
    )

}

export default Validacao;