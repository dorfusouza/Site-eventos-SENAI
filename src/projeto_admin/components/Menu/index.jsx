import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import senailogo from '../../../assets/Images/senailogo.png';
import risco from '../../../assets/Images/risco.png';
import perfil from '../../../assets/Images/perfil.png';
import './Menu.css';

function Menu() {
    return (
        <div className='menu'>
            <img src={senailogo} alt="Logo" className="menu-logo" />

            <nav>
                <ul>
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
                    <li>
                        <Link to='/admin'>Home</Link>
                    </li>
                </ul>
            </nav>

            <Link to='/admin/perfil' className='perfil'>
                <img src={perfil} alt="Perfil" className="lupa" />
            </Link>


        </div>
    );
}

export default Menu;