import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultImage from '../../../assets/Images/arraia.png';

function Card({ dados }) {
    return (
        <Link to={`./InicioReserva/${dados.idEvento}`} className="text-decoration-none" style={{ color: 'black' }}>
            <div className='card p-4 m-2'>
                <p className='card-text fs-5'>{dados.dataEvento}</p>
                {console.log(dados.imagem)}
                <img src={dados.imagem || defaultImage} alt="Imagem do evento" className='card-img-top' />
                <div className='card-body'>
                    <p className='card-title fs-5'>{dados.nomeEvento}</p>
                    <p className='card-text fs-5'>{dados.local}</p>
                </div>
            </div>

        </Link>
    );
}

Card.propTypes = {
    dados: PropTypes.shape({
        idEvento: PropTypes.number.isRequired,
        nomeEvento: PropTypes.string.isRequired,
        dataEvento: PropTypes.string.isRequired,
        local: PropTypes.string.isRequired,
        imagem: PropTypes.string, // Optional
    }).isRequired,
};

export default Card;
