import Cabecalho from "../../Components/Cabecalho/Cabecalho.jsx";
import Rodape from "../../Components/Rodape/Rodape.jsx";
import { isAuthenticated } from '../../Components/Utils/auth.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
                        {/*Agora iremos dizer pro usuário de maneira interativa que o pedido foi reservado e que ele agora deve escolher a forma de pagamento>
                        Caso a forma seja pix, ele deve fazer o pix para a chave selecionada e mandar o comprovante ao whatzap do admin, (irá ter um botão que irá redirecionar para o whatzap do admin)
                        Caso seja presencial, deverá ser dito para o usuário que ele terá que ir até o LOCAL (SENAI) e pagar com um dos atendentes (secretaria, biblioteca ou atendentes da turma de administração)
                        O Design dessa área será diferente da anterior, não usaremos card e será mais agradavél ao usuário usando cores e botões interativos*/}

                    </div>
                ) : (
                    <h1 className="text-center mt-5">Nenhum pedido encontrado</h1>
                )}
            </div>
            <Rodape />
        </div>
    );
};
