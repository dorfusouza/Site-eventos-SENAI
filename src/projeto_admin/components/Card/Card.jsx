import './Card.css'
import card2 from '../../../assets/Images/card2.png'
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
function Card({ dados }) {
  return (
      <Link to={`./InicioReserva/${dados.idEvento}`}>
        <div className='card_inicio'>
          <img src={card2} />
          <p className='dados'>{dados.nomeEvento}</p>
          <p className='dados'>Data: {dados.dataEvento}</p>
          <p className='dados'>Local: {dados.local}</p>
        </div>
      </Link>
  )

}

Card.propTypes = {
  dados: propTypes.object.isRequired,
};

export default Card;