import React from 'react';
import './Botao.css';

const Botao = ({ children, onClick }) => {
    return (
        <button className='botao' onClick={onClick}>
            {children}
        </button>
    );
}

export default Botao;
