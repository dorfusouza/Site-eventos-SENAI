import './InicioReservaPage.css';
import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { isAuthenticated } from '../../Components/Utils/auth.jsx';
import { ToastContainer } from 'react-toastify';
import Cabecalho from '../../Components/Cabecalho/Cabecalho';
import Rodape from '../../Components/Rodape/Rodape';
import card2 from '../../../assets/Images/card2certo.png';
import AgendaImg from '../../../assets/Images/agenda.png';
import Local from '../../../assets/Images/local.png'
import './InicioReservaPage.css'

const InicioReservaPage = () => {
    const { eventoId } = useParams();
    const navigate = useNavigate();
    const inDevelopment = localStorage.getItem('inDevelopment');
    const [evento, setEvento] = useState({});
    const [lotes, setLotes] = useState([{}]);
    const [loteAtual, setLoteAtual] = useState({});
    const [valoresIngressosSelecionados, setValoresIngressosSelecionados] = useState([]);
    const [tipoIngresso, setTipoIngresso] = useState ([
        {
            nome: 'Infantil',
            desconto: 0.5,
            idEvento: eventoId,
        },
        {
            nome: 'Colaborador',
            desconto: 1,
            idEvento: eventoId,
        },
        {
            nome: 'Aluno',
            desconto: 1,
            idEvento: eventoId,
        },
        {
            nome: 'Comunidade',
            desconto: 1,
            idEvento: eventoId,
        }
    ])
    var url = '';
    if (inDevelopment === 'true') {
        url = 'http://localhost:5236/api/';
    } else {
        url = 'https://www.senailp.com.br/eventos-api/api/';
    }

    const verificarAutenticacao = () => {
        if (!isAuthenticated()) {
            console.log('Usuário não autenticado');
            navigate('/Login');
        }
    }

    const fetchDataEvento = async () => {
        const response = await fetch(url + `Evento/${eventoId}`)
        const data = await response.json()
        setEvento(data)
        console.log(eventoId)
    }

    const fetchDataLotes = async () => {
        const response = await fetch(`https://www.senailp.com.br/eventos-api/api/Lote/evento/${eventoId}`)
        const data = await response.json()
        setLotes(data)
        data.map((lote, index) => {
            if (lote.ativo === 1) {
                setLoteAtual(lote)
                let valores = []
                tipoIngresso.map((tipo, index) => {
                    valores.push(0)
                })
                setValoresIngressosSelecionados(valores)
                return null;
            }
        })
    }

    useEffect(() => {
        fetchDataLotes();
    }, []);

    function getSum(num) {
        let total = 0
        num.map((valor, index) => {
            total += valor * tipoIngresso[index].desconto * loteAtual.valorUnitario
        })
        return total
    }

    const handleSubmit = async () => {
        if (localStorage.getItem('id') === null || localStorage.getItem('id') === undefined) {
            navigate('/Login');
        }
        // Pedido POST
        //{
        //   "idPedido": 0,
        //   "usuariosId": 0,
        //   "dataCadastro": "2024-05-10T19:18:32.826Z",
        //   "total": 0,
        //   "quantidade": 0,
        //   "formaPagamento": "string",
        //   "status": "string",
        //   "validacaoIdUsuario": 0
        // }

        // INGRESSO POST
        //{
        //   "idIngresso": 0,
        //   "pedidosId": 0,
        //   "pedidosUsuariosId": 0,
        //   "loteId": 0,
        //   "status": "string",
        //   "tipo": "string",
        //   "valor": 0,
        //   "dataUtilizacao": "2024-05-10T19:18:52.729Z",
        //   "codigoQr": "string"
        // }

        //Iremos criar o pedido e anexar os ingressos ao pedido

        //Criação do pedido
        const pedidoData = {
            idPedido: 0,
            usuariosId: localStorage.getItem('id'),
            dataCadastro: '2024-05-10T19:18:32.826Z',
            total: getSum(valoresIngressosSelecionados),
            quantidade: valoresIngressosSelecionados.reduce((a, b) => a + b, 0),
            formaPagamento: 'Presencial',
            status: 'Pendente',
            validacaoIdUsuario: 0
        }

        useEffect(() => {
            console.log(valoresIngressosSelecionados)
        }, [valoresIngressosSelecionados]);

        await fetch('https://www.senailp.com.br/eventos-api/api/Pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidoData)
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                //Criação dos ingressos
                let ingressos = []
                valoresIngressosSelecionados.map((valor, index) => {
                    for (let i = 0; i < valor; i++) {
                        ingressos.push({
                            idIngresso: 0,
                            pedidosId: data.idPedido,
                            pedidosUsuariosId: parseInt(localStorage.getItem('id')),
                            loteId: loteAtual.idLote,
                            status: 'Pendente',
                            tipo: tipoIngresso[index].nome,
                            valor: loteAtual.valorUnitario * tipoIngresso[index].desconto,
                            dataUtilizacao: "2024-05-15T00:00:00",
                            codigoQr: '',
                            ativo: 1
                        })
                        console.log(ingressos)
                    }
                })
                console.log(JSON.stringify(ingressos))
                //Vamos mandar todos os ingressos de uma vez
                fetch('https://www.senailp.com.br/eventos-api/api/Ingresso', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ingressos)
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    useEffect(() => {
        verificarAutenticacao();
        fetchDataEvento();
        fetchDataLotes();
    }, [])

     return (
        <>
            <Cabecalho />
            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <img src={card2} className="img-fluid w-50" alt="Event" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className='m-0'>{evento.nomeEvento}</h1>
                            <div className="d-flex align-items-center my-3">
                                <img src={AgendaImg} alt="Agenda" className="me-2" />
                                <p className="mb-0">
                                    {new Date(evento.dataEvento).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="d-flex align-items-center my-3">
                                <img src={Local} alt="Local" className="me-2" />
                                <p className="mb-0">{evento.local}</p>
                            </div>
                            <h2>Descrição do evento</h2>
                            <p>{evento.descricao}</p>
                            <hr />

                        </div>
                    </div>
                    <div className="col-md-4 w-100">
                        <div className="card" style={{backgroundColor: '#EEEEEE'}}>
                            <div className="card-body">
                                <h3>Ingressos</h3>
                                <p className="text-muted">{loteAtual.saldo} disponíveis</p>
                                <hr />
                                {tipoIngresso.map((tipo, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5>{tipo.nome}</h5>
                                                <p>{tipo.desconto === 0 ? 'Gratuito' : Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(loteAtual.valorUnitario * tipo.desconto)}</p>
                                                
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={
                                                    () => {
                                                        if (valoresIngressosSelecionados[index] > 0 && valoresIngressosSelecionados[index] <= loteAtual.saldo) {
                                                            let valores = [...valoresIngressosSelecionados]
                                                            valores[index] -= 1
                                                            setValoresIngressosSelecionados(valores)
                                                            loteAtual.saldo += 1
                                                        }
                                                    }
                                                }>
                                                    <i className="bi bi-patch-minus"></i>
                                                </button>
                                                <span className="mx-2">{valoresIngressosSelecionados[index]}</span>
                                                <button className="btn btn-outline-secondary btn-sm" onClick={
                                                    () => {
                                                        if (valoresIngressosSelecionados[index] < loteAtual.saldo && valoresIngressosSelecionados[index] < 5) {
                                                            let valores = [...valoresIngressosSelecionados]
                                                            valores[index] += 1
                                                            setValoresIngressosSelecionados(valores)
                                                            loteAtual.saldo -= 1
                                                        }
                                                    }
                                                }>
                                                    <i className="bi bi-patch-plus" ></i>
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <h2>Total</h2>
                                    <h2>{Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(getSum(valoresIngressosSelecionados))}</h2>
                                </div>
                                <button className="btn btn-success w-100 mt-3 botaoVerde" onClick={handleSubmit}>Reservar Ingresso</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Rodape />
            <ToastContainer />
        </>
    );
}

export default InicioReservaPage
