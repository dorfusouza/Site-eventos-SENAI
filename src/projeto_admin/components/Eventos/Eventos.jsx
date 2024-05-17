import './Eventos.css'
import { Link } from 'react-router-dom';
import Card from "../Card/Card.jsx";
import {useEffect, useState} from "react";
import {notifyError} from "../../../projeto_reserva/Components/Utils/msgToast.jsx";
import card2 from "../../../assets/Images/card2.png";

const Eventos = () => {
    const [eventos, setEventos] = useState([])
    const inDevelopment = localStorage.getItem('inDevelopment');
    var url = '';
    if (inDevelopment === 'true') {
        url = 'http://localhost:5236/api/';
    } else {
        url = 'https://www.senailp.com.br/eventos-api/api/';
    }

    const getEventos = async () => {
        try {
            const response = await fetch(url + 'Evento');
            const data = await response.json();
            setEventos(data);
        } catch(error) {
            notifyError("Erro ao carregar eventos da API " + error)
        }
    };

    useEffect(() => {
        getEventos()
    }, [])
    return(
        <div className='divContainer'>
            {eventos.length > 0 ? (
                eventos.map((dados, index) => (
                    <div key={index} className='col-lg-4 col-md-6 mb-3'>
                        <Link to={`./graficos/${dados.idEvento}`}>
                            <div className='card_inicio'>
                                <img src={card2} />
                                <p className='dados'>{dados.nomeEvento}</p>
                                <p className='dados'>Data: {dados.dataEvento}</p>
                                <p className='dados'>Local: {dados.local}</p>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p className='col-12 text-center'>Nenhum evento disponível no momento.</p>
            )}
        </div>
    )
}

export default Eventos