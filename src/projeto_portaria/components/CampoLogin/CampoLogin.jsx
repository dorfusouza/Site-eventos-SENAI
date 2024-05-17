import React from 'react';
import './CampoLogin.css';

const CampoLogin = ({ label, place, tipo, nome, valor, aoAlterar }) => {
    return (
        <div className='campo-login'>
            <label>{label}</label>
            <input
                type={tipo} 
                placeholder={place} 
                name={nome} 
                value={valor} 
                onChange={aoAlterar} 
                className='campo-input' 
            />
        </div>
    );
}

export default CampoLogin;