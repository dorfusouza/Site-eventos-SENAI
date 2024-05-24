import Cabecalho from "../../Components/Cabecalho/Cabecalho.jsx";
import Rodape from "../../Components/Rodape/Rodape.jsx";
import { isAuthenticated } from '../../Components/Utils/auth.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import pix from "../../../assets/Images/pix.png";

export const InfoPedido = () => {
    const navigate = useNavigate();

    const pedido = localStorage.getItem('pedido') ? JSON.parse(localStorage.getItem('pedido')) : null;
    const ingressos = localStorage.getItem('ingressos') ? JSON.parse(localStorage.getItem('ingressos')) : [];

    const verificarAutenticacao = () => {
        if (!isAuthenticated()) {
            console.log('Usuário não autenticado');
            navigate('/Login');
        }
    };

    useEffect(() => {
        verificarAutenticacao();
    }, []);

    return (
        <div>
            <Cabecalho />
            <div className="container mt-5" style={{ minHeight: '50vh' }}>
                {pedido ? (
                    <div>
                        <h1 className="mb-4 fs-2 text-start">Informações do Pedido</h1>
                        <div className="d-flex justify-content-between flex-column mb-3">
                            <h5>Quantidade de Ingressos: {pedido.quantidade}</h5>
                            <h5>Total: R$ {pedido.total}</h5>
                        </div>
                        <h1 className="mb-4 fs-2 text-start">Ingressos</h1>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                            {ingressos.map((ingresso, index) => {
                                if (ingresso.quantidade === 0) {
                                    return null;
                                }
                                return (
                                    <div className="col" key={index}>
                                        <div className="card h-100 shadow-sm" style={{ borderRadius: '15px' }}>
                                            <div className="card-body text-center">
                                                <h5 className="card-title">{ingresso.tipo}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">Valor total: R$ {ingresso.valor * ingresso.quantidade}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Valor: R$ {ingresso.valor}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Quantidade: {ingresso.quantidade}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-md-8">
                            <h2 className='fs-2'>Formas de pagamento</h2>
                            <p className='fs-5'>Para realizar o pagamento via pix, faça o pix para a chave: 999.999.999-99 e envie o comprovante via whatsapp para o número: (14) 99705-8355</p>
                            <a className='btn btn-info btn-lg text-white text-decoration-none px-4 mb-2'
                               href="https://wa.me/+55149970558355" target="_blank" rel="noreferrer">
                                <div className='d-flex align-items-center justify-content-center'
                                     style={{fontSize: '1.3rem', gap: '10px', fontWeight: 'bold'}}>
                                    PAGAMENTO
                                    <img className='img-fluid' src={pix} alt='WhatsApp Logo'
                                         style={{height: '30px'}}/>
                                </div>
                            </a>
                            <p className='fs-5'>Para realizar o pagamento presencialmente, vá até o SENAI e pague com um dos atendentes (secretaria, biblioteca ou atendentes da turma de administração)</p>
                        </div>
                    </div>
                ) : (
                    <h1 className="text-center mt-5">Nenhum pedido encontrado</h1>
                )}
            </div>
            <Rodape />
        </div>
    );
};
