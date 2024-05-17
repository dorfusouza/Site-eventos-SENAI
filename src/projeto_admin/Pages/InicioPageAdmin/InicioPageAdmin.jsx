import './InicioPageAdmin.css';
import Menu from '../../components/Menu/';
import Rodape from '../../components/Rodape/';
import Eventos from '../../components/Eventos/Eventos';


const InicioPageAdmin = () => {
    return (
      <div>
        <Menu />
        <Eventos/>
        <Rodape />
      </div>
    )
  }
  
  export default InicioPageAdmin;