import React from 'react';
import './CampoTexto.css';

const CampoTexto = ({ label, place, tipo, nome, valor, aoAlterar }) => {
    return (
        <div className='form-group col-6'>
            <label>{label}</label>
            <input
                type={tipo} 
                placeholder={place} 
                name={nome} 
                value={valor} 
                onChange={e => aoAlterar(e.target.value)} 
                className='form-control campo-texto' 
            />
        </div>
    );
}

export default CampoTexto;