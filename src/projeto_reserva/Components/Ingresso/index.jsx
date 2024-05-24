import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from 'qrcode.react';
import propTypes from 'prop-types';
import img_cancelado from '../../../assets/Images/pedido_cancelado.png'

const Ingresso = ({ obj, descricao, onUpdateDescricao }) => {
    const inDevelopment = localStorage.getItem('inDevelopment');
    const url = inDevelopment === 'true' ? 'http://localhost:5236/api/' : 'https://www.senailp.com.br/eventos-api/api/';

    function conversao(status) {
        if (obj.ativo === 1) {
            switch (status) {
                case "Pendente":
                    return "Pagamento pendente";
                case "Utilizado":
                    return "Ingresso utilizado";
                case "Validado":
                    return "Ingresso disponível";
                default:
                    return "Desconhecido";
            }
        } else {
            return "Cancelado";
        }
    }

    useEffect(() => {
        if (!descricao) {
            async function fetchNomeEvento() {
                try {
                    const response = await fetch(url + `Ingresso/nome/${obj.idIngresso}`);
                    const data = await response.text();
                    onUpdateDescricao(obj.idIngresso, data);
                } catch (error) {
                    console.error('Erro ao buscar descrição do evento:', error);
                }
            }

            fetchNomeEvento();
        }
    }, [obj.idIngresso, descricao, onUpdateDescricao]);

    return (
        <div className='col-md-4 mb-4 d-flex justify-content-center'>
            {/* <div className='card m-3 p-3 shadow bg-white rounded' style={{ border: obj.status === 'Pendente' ? '1px solid #ffc107' : obj.status === 'Utilizado' ? '1px solid #6d6d6d' : '1px solid #28a745', width: '300px' }}> */}
            <div className={`card m-3 p-3 shadow bg-white rounded border border-${obj.status === 'Pendente' ? 'warning' : obj.status === 'Cancelado' ? 'danger' : obj.status === 'Utilizado' ? 'secondary-subtle' : 'success'}`} style={{ border: '1px solid' , width: '300px' }}>
                <p id='descricaoEvento' className='h5 text-center mb-0'>{descricao}</p>
                <hr />
                <p className='text-center mb-0'>Ingresso: <span className='fw-bold'>{obj.tipo}</span></p>
                <hr />
                {
                    (obj.status == "Cancelado")
                    ?
                    <>                                            
                        <div className='text-center mb-1' style={{ filter: obj.status === 'Pendente' ? 'blur(5px)' : 'none' }}>
                            <img src={img_cancelado}/>
                        </div>
                    </>
                    :
                    <>
                        <div className='text-center mb-1' style={{ filter: obj.status === 'Pendente' ? 'blur(5px)' : 'none' }}>
                            <QRCode value={obj.status === 'Pendente' ? 'Pendente' : obj.codigoQr} size={200} />
                        </div>
                        <p className='text-center mb-0'>                            
                            {obj.status === 'Pendente' ? 'O QR Code estará disponível após a confirmação do pagamento.' : `Código QR: ${obj.codigoQr}`}
                        </p>                    
                    </>

                }                
                
                <hr />
                <h4 className={`text-center ${obj.status === 'Pendente' ? 'text-warning' : obj.status === 'Utilizado' ? 'text-secondary' : 'text-success'} h6`}>
                    {
                        (obj.status == "Cancelado")
                        ?
                            <div className='alert alert-danger p-1 text-center' role="alert">
                                    <strong>Pedido Cancelado</strong>
                            </div>
                        :
                        <>
                            {conversao(obj.status)}
                        </>

                    }
                </h4>
            </div>
        </div>
    );
};

Ingresso.propTypes = {
    obj: propTypes.object.isRequired,
    descricao: propTypes.string,
    onUpdateDescricao: propTypes.func.isRequired,
};

export default Ingresso;
