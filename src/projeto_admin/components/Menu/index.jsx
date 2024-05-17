import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import senailogo from '../../../assets/Images/senailogo.png';
import risco from '../../../assets/Images/risco.png';
import perfil from '../../../assets/Images/perfil.png';

import { isAuthenticated } from '../Utils/auth.jsx';
import './Menu.css';

function Menu() {
    
    const navigate = useNavigate();

    const onLogoff = () => {
        localStorage.setItem('email', '');
        localStorage.setItem('id', '');
        localStorage.setItem('nomeCompleto', '');
        localStorage.setItem('perfil', '');
        localStorage.setItem('telefone', '');
        navigate('/admin/');
    };
    return (
        <div className='menu'>
            <img src={senailogo} alt="Logo" className="menu-logo" />

            
            {isAuthenticated() ? (
                <>
                <nav>
                <ul>
                    <li>
                        <Link to='/admin'>Home</Link>
                    </li>
                    <li>
                        <Link to='/admin/pedidos'>Pedidos</Link>
                    </li>
                    <li>
                        <Link to='/admin/usuarios'>Usuários</Link>
                    </li>
                    <li>
                        <Link to='/admin/criar_evento'>Criar Evento</Link>
                    </li>
                    <li>
                        <Link to='/admin/editar_evento'>Editar Evento</Link>
                    </li>
                </ul>
                </nav>
            <Link to='/admin/perfil' className='perfil'>
                <img src={perfil} alt="Perfil" className="lupa" />
            </Link>
                <button type='button' onClick={onLogoff} className="btn btn-link" style={{ textDecoration: 'none', fontSize: "18px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 2 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                    Sair
                </button>
                
                </>
            ) : (
                <Link to="/admin/" className="btn btn-link" style={{ textDecoration: 'none', fontSize: "18px" }}>
                    Entrar
                </Link>
            )}


        </div>
    );
}

export default Menu;