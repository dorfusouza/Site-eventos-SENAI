import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from 'qrcode.react'; // Importando a biblioteca para gerar QR Code
import propTypes from 'prop-types';

const Ingresso = ({ obj }) => {
    const [nomeEvento, setNomeEvento] = useState('');
    const inDevelopment = localStorage.getItem('inDevelopment');
    var url = '';
    if (inDevelopment === 'true') {
        url = 'http://localhost:5236/api/';
    } else {
        url = 'https://www.senailp.com.br/eventos-api/api/';
    }
    
    function conversao(obj) {
        console.log(obj)
        if (obj.ativo == 1) {
            if (obj.status == "Pendente") {
                return "Pagamento pendente";
            } else if (obj.status == "Utilizado") {
                return "Ingresso utilizado";
            } else if (obj.status == "Validado") {
                return "Ingresso disponível";
            }
        } else {
            return "Cancelado";
        }
    }

    async function fetchNomeEvento() {
        try {
            const response = await fetch(url + `Ingresso/nome/${obj.idIngresso}`);
            const data = await response.text();
            setNomeEvento(data);
        } catch (error) {
            console.error('Erro ao buscar descrição do evento:', error);
        }
    }

    useEffect(() => {
        if (!nomeEvento) {
            fetchNomeEvento();
        }
    }, [obj.idIngresso, setNomeEvento]);

    if(obj.ativo == 1){
        return (
            <div className='col-md-4 mb-4 d-flex justify-content-center'>

            <div className='card m-3 p-3 shadow bg-white rounded' style={{border: obj.status === 'Pendente' ? '1px solid #ffc107' : obj.status === 'Utilizado' ? '1px solid #6d6d6d' : '1px solid #28a745', width: '300px'}}>
                <p id='descricaoEvento' className='h5 text-center mb-0'>{nomeEvento}</p>
                <hr />
                <p className='text-center mb-0'>Ingresso: <span className='fw-bold'>{obj.tipo}</span></p>
                <hr/>
                <div className='text-center mb-1' style={{filter: obj.status === 'Pendente' ? 'blur(5px)' : 'none'}}>
                    <QRCode value={
                        obj.status === 'Pendente' ? 'Pendente' : obj.codigoQr
                    } size={200} />
                </div>
                <p className='text-center mb-0'>
                    {obj.status === 'Pendente' ? 'O QR Code estará disponível após a confirmação do pagamento.' : `Código QR: ${obj.codigoQr}`}
                </p>
                
                <hr/>
                <h4 className={`text-center ${obj.status === 'Pendente' ? 'text-warning' : obj.status === 'Utilizado' ? 'text-secundary' : 'text-success'} h6`}>
                    {conversao(obj)}
                </h4>
            </div>
            </div>
        );
    }
};

Ingresso.propTypes = {
    obj: propTypes.object.isRequired,
    descricao: propTypes.string,
    onUpdateDescricao: propTypes.func.isRequired,
};

export default Ingresso;
