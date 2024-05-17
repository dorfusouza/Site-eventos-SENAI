import './InicioPageAdmin.css';
import Menu from '../../components/Menu/index.jsx';
import Eventos from '../../components/Eventos/Eventos.jsx';
import Rodape from '../../components/Rodape/index.jsx';


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