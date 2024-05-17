import './IconIngresso.css'

const Icone = (props) =>
{
    return(
        <div>
            <img className='icone' src={props.icone} alt='Icone'/>
        </div>
    )
}

export default Icone;