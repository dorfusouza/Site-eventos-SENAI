import './Cabecalho.css'

const Cabecalho = (props) =>
{
    return(
        <div className='fd_cinza'>
            <img className='cabecalho' src={props.cabecalho} alt="LogoTipo"/>
        </div>
    )
}

export default Cabecalho;