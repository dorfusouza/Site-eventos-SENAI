import React from 'react'
import './ConfirmacaoPage.css'
import imgCabecalho from '../../../assets/Images/imgCabecalho.png'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import imgcheck from '../../../assets/Images/check.png'
import Check from '../../components/Check/Check'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../components/Utils/auth.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ConfirmacaoPage = () => {

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

    function onEnviar() {
        console.log("TESTE")
    }
    return (
        <>
            <Cabecalho cabecalho={imgCabecalho} />
            <h1> Confirmação </h1>
            <div className='bloco_czc'>
                <div className='principal'>
                    <div className='bloco_vd'>

                        <h3> VALIDAÇÃO EFETUADA COM SUCESSO!
                            <Check check={imgcheck} />
                        </h3>
                    </div>
                    <Link onClick={onEnviar} to="/validacao">
                        <button className='botaov'>
                            Voltar
                        </button>
                    </Link>
                </div>

            </div>

        </>
    )
}

export default ConfirmacaoPage