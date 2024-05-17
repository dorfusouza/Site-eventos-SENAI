import { useState, useEffect } from 'react';
import Cabecalho from '../../Components/Cabecalho/Cabecalho.jsx'
import Rodape from '../../Components/Rodape/Rodape.jsx'
import Card from '../../Components/Card/Card.jsx'
import { ToastContainer } from 'react-toastify';
import { notifyError } from '../../Components/Utils/msgToast.jsx';
import './InicioPage.css'
function InicioPageReserva() {

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

    return (
        <div>
            <Cabecalho />
            <h1 className='InicioPageTitulo text-center'>Eventos disponíveis</h1>
            <div className='container inicio_div'>
                <div className='row'>
                    {eventos.length > 0 ? (
                        eventos.map((item, index) => (
                            <div key={index} className='col-lg-4 col-md-6 mb-3'>
                                <Card dados={item}/>
                            </div>
                        ))
                    ) : (
                        <p className='col-12 text-center'>Nenhum evento disponível no momento.</p>
                    )}
                </div>
            </div>
            <Rodape />
            <ToastContainer />
        </div>
    );
}

export default InicioPageReserva;
