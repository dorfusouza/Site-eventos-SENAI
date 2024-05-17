import React, { useState } from 'react';
import Menu from '../../components/Menu/';
import Rodape from '../../components/Rodape/';
import Categorias from '../../components/Categorias/Categorias';
import GraficoLote from '../../components/Grafico/GraficoLote';
import GraficoIngresso from '../../components/Grafico/GraficoIngresso';
import { useParams } from 'react-router-dom';

const GraficosPage = () => {
    const [tipoGrafico, setTipoGrafico] = useState('lote');
    const idEvento = useParams().idEvento;
    const handleButtonClick = (tipo) => {
        setTipoGrafico(tipo); // Função para atualizar o tipo de gráfico com base no botão clicado
    };

    return(
        <div>
            <Menu />
            <div className={'graficos-page'}>
                <Categorias onButtonClick={handleButtonClick} /> {/* Passe a função de clique do botão para o componente Categorias */}
                {tipoGrafico === 'lote' ? <GraficoLote /> : <GraficoIngresso />} {/* Renderize o componente de gráfico correspondente com base no estado */}
            </div>
            <Rodape />

        </div>
    );
}

export default GraficosPage;
