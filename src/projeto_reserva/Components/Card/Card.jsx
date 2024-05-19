import './Card.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultImage from '../../../assets/Images/arraia.png';

function Card({ dados }) {
    return (
        <Link to={`./InicioReserva/${dados.idEvento}`} className="text-decoration-none" style={{ textDecoration: 'none' }}>
            <div className='card_inicio'>
                <img src={dados.imagem || defaultImage} alt="Event" className="card-image" />
                <div className="card-content">
                    <p className='dados'>{dados.nomeEvento}</p>
                    <p className='dados'>Local: {dados.local}</p>
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
