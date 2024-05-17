import './Rodape.css'
import { Link } from 'react-router-dom'
import imgBanner from '../../../assets/Images/senailogo.png'
import './Rodape.css'

function Rodape() {
    return (

        <footer className="footer pt-5 pb-2" style={{backgroundColor: "#4C576C"}}>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-2 ms-5">
                        <img src={imgBanner
                        } alt="Logo" className="img-fluid" />
                    </div>
                </div>
                <hr style={{backgroundColor: "white", width: "100%"}}/>
                <div className="row">
                    <div className="col-md-2">
                        <ul>
                            <li className="footer-link">
                                <Link to="/eventos" className="btn-link btn">Eventos</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <ul>
                            <li className="footer-link">
                                <Link to="/suporte" className="btn-link btn">Fale conosco</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <ul>
                            <li className="footer-link">
                                <Link to="/" className="btn-link btn">Home</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Rodape