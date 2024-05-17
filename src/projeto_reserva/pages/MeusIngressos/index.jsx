// MeusIngressos.js
import { useState, useEffect } from 'react';
import './MeusIngressos.css';
import CampoFiltro from '../../Components/CampoFiltro/CampoFiltro';
import {useNavigate} from 'react-router-dom';
import { isAuthenticated } from '../../Components/Utils/auth.jsx';
import Ingresso from '../../Components/Ingresso';
import Cabecalho from '../../Components/Cabecalho/Cabecalho';
import Rodape from '../../Components/Rodape/Rodape';

function MeusIngressos() {
    const navigate = useNavigate();
    const [ingressos, setIngressos] = useState([]);
    const [filteredIngresso, setFilteredIngressos] = useState([]);
    const [filtroDescricao, setFiltroDescricao] = useState(""); // Estado para o filtro
    const [descricoes, setDescricoes] = useState({}); // Estado para armazenar descrições
    //Setando o ingresso via front end para testes
    // const ingressos = [
    //     {
//             "idIngresso": 4,
    //     "pedidosId": 2,
    //     "pedidosUsuariosId": 1,
    //     "loteId": 31,
    //     "status": "Pendente",
    //     "tipo": "Colaborador",
    //     "valor": 20,
    //     "dataUtilizacao": "2024-05-15T00:00:00",
    //     "codigoQr": "",
    //     "ativo": 1
    //     },
    const verificarAutenticacao = () => {
        if (!isAuthenticated()) {
            console.log('Usuário não autenticado');
            navigate('/Login');
        }
    }

    useEffect(() => {
        async function fetchIngressos() {
            try {
                const response = await fetch(`https://www.senailp.com.br/eventos-api/api/Ingresso/Usuario/${localStorage.getItem('id')}`);
                const data = await response.json();
                setIngressos(data);
                setFilteredIngressos(data);
            } catch (error) {
                console.error('Erro ao buscar ingressos:', error);
            }
        }

        verificarAutenticacao();
        fetchIngressos();
    }, []);

    // Função para atualizar descrições recebidas do componente Ingresso
    const atualizarDescricoes = (id, descricao) => {
        setDescricoes(prevState => ({
            ...prevState,
            [id]: descricao
        }));
    };

    return (
        <>
        <Cabecalho/>
            <div id='box-all'>
                <h3>Ingressos</h3>
                <div id="campo-filtro">
                    {/* Passando a função de atualização do filtro como prop */}
                    <CampoFiltro placeholder="Pesquisar ingressos por evento" handleFilter={setFiltroDescricao} />
                </div>
    
                {filteredIngresso.length === 0 ? (
                    <p className='texto-aviso'>Nenhum ingresso disponível</p>
                ) : (
                    <>
                        {filteredIngresso.filter((item) => {
                            if (filtroDescricao === "") {
                                return item;
                            } else if (descricoes[item.idIngresso].toLowerCase().includes(filtroDescricao.toLowerCase())) {
                                return item;
                            }
                        }).length === 0 ? (
                            <p className="texto-aviso">Nenhum ingresso encontrado</p>
                        ) : (
                            <ul>
                                {/* Renderiza os ingressos filtrados */}
                                {filteredIngresso.filter((item) => {
                                    if (filtroDescricao === "") {
                                        return item;
                                    } else if (descricoes[item.idIngresso].toLowerCase().includes(filtroDescricao.toLowerCase())) {
                                        return item;
                                    }
                                }).map((item, index) => (
                                    <li key={index}>
                                        {/* Passa a descrição do evento como prop para o componente Ingresso */}
                                        <Ingresso obj={item} descricao={descricoes[item.idIngresso]} onUpdateDescricao={atualizarDescricoes} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
            <Rodape/>
        </>
    );
    
    
}

export default MeusIngressos;
