import './Rodape.css';
import { Link } from 'react-router-dom';
import imgBanner from '../../../assets/Images/banner_logo.png';
import './Rodape.css';

function Rodape() {
    return (
        <footer className="footer pt-5 pb-2 px-5 container-fluid" style={{backgroundColor: "#4C576C"}}>
            <div className="row">
                <div className="col-md-4">
                    <Link to="/">
                        <img src={imgBanner} alt="Logo" className="img-fluid" />
                    </Link>
                </div>
            </div>
            <hr style={{backgroundColor: "white", width: "100%"}} />
            <div className="row">
                <div className="col-4 div-footer-items">
                    <Link to="/eventos" className="btn-link btn fs-5">Eventos</Link>
                </div>
                <div className="col-4 div-footer-items">
                    <Link to="/suporte" className="btn-link btn fs-5">Fale conosco</Link>
                </div>
                <div className="col-4 div-footer-items">
                    <Link to="/" className="btn-link btn fs-5">Home</Link>
                </div>
            </div>
        </footer>
    );
}

export default Rodape;
