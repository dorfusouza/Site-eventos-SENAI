import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useParams } from "react-router-dom";
import constantes from "../../../componentes/Constantes.jsx";

const COLORS = ['#2F5F98', '#2D8BBA', '#41B8D5', '#6CE5E8'];
const COLORS2 = ['#2F5F98', '#2D8BBA', '#41B8D5', '#6CE5E8'];

const Grafico = () => {
    const { idEvento } = useParams();
    const [quantidadeIngressos, setQuantidadeIngressos] = useState([]);
    const [ingressos, setIngressos] = useState({});
    const [allIngressos, setAllIngressos] = useState([]);
    const [selectedLote, setSelectedLote] = useState(null);
    const inDevelopment = localStorage.getItem('inDevelopment');
    var url = '';
    if (inDevelopment === 'true') {
        url = constantes.localApiUrl;
    } else {
        url = constantes.apiUrl;
    }

    async function fetchQuantidadeIngressos() {
        try {
            const response = await fetch(url + 'Ingresso/quantidadeByTipoByEvento/' + idEvento);
            const data = await response.json();
            const dataArray = Object.entries(data.quantidadePorTipo).map(([name, value]) => ({ name, value }));
            const dataArrayIngressos = data.ingressos.map(ingresso => ({
                idIngresso: ingresso.idIngresso,
                pedidosId: ingresso.pedidosId,
                pedidosUsuariosId: ingresso.pedidosUsuariosId,
                loteId: ingresso.loteId,
                status: ingresso.status,
                tipo: ingresso.tipo,
                valor: ingresso.valor,
                dataUtilizacao: ingresso.dataUtilizacao,
                codigoQr: ingresso.codigoQr,
                ativo: ingresso.ativo
            }));

            const tipoIngressosData = {
                Colaborador: {
                    quantidade: dataArray.find(item => item.name === 'Colaborador')?.value || 0,
                    valor: dataArrayIngressos.find(ingresso => ingresso.tipo === 'Colaborador')?.valor || 0
                },
                Aluno: {
                    quantidade: dataArray.find(item => item.name === 'Aluno')?.value || 0,
                    valor: dataArrayIngressos.find(ingresso => ingresso.tipo === 'Aluno')?.valor || 0
                },
                Comunidade: {
                    quantidade: dataArray.find(item => item.name === 'Comunidade')?.value || 0,
                    valor: dataArrayIngressos.find(ingresso => ingresso.tipo === 'Comunidade')?.valor || 0
                },
                Infantil: {
                    quantidade: dataArray.find(item => item.name === 'Infantil')?.value || 0,
                    valor: dataArrayIngressos.find(ingresso => ingresso.tipo === 'Infantil')?.valor || 0
                }
            };

            setAllIngressos(dataArrayIngressos);
            setIngressos(tipoIngressosData);
            setQuantidadeIngressos(dataArray);
            handlePieClick(dataArray[0], 0);
        } catch (error) {
            console.error('Erro ao buscar quantidade de ingressos por tipo:', error);
        }
    }

    const handlePieClick = (data, index) => {
        const selectedIngresso = quantidadeIngressos[index];
        let selectedLote = ingressos[selectedIngresso.name];
        selectedLote.value = selectedIngresso.value;
        selectedLote.name = selectedIngresso.name;
        setSelectedLote(selectedLote);
    };

    useEffect(() => {
        fetchQuantidadeIngressos();
    }, []);

    return (
        <div>
            <ResponsiveContainer width="100%" height={400} className="d-flex justify-content-center align-items-center">
                <PieChart>
                    <Pie
                        data={quantidadeIngressos}
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={160}
                        fill="#8884d8"
                        dataKey="value"
                        onClick={handlePieClick}
                    >
                        {quantidadeIngressos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        align="middle"
                        verticalAlign="middle"
                        layout="vertical"
                        iconSize={18}
                        formatter={(value) => `${value} - ${(quantidadeIngressos.find(item => item.name === value)?.value || 0)}`}
                        tooltipType="none"
                        iconType="circle"
                        wrapperStyle={{ lineHeight: '30px', marginLeft: '20px', marginTop: '25px', fontSize: '18px' }}
                    />
                </PieChart>
            </ResponsiveContainer>

            <div className="mt-3 d-flex justify-content-center gap-5 flex-wrap p-3">
            {selectedLote && (
                <div className="">
                    <h3 className='fs-4'>Detalhes do Tipo de ingresso Selecionado</h3>
                    <p className="fs-5"><strong>Tipo:</strong> {selectedLote.name}</p>
                    <p className="fs-5"><strong>Quantidade:</strong> {selectedLote.quantidade}</p>
                    <p className="fs-5"><strong>Receita:</strong> R$ {(selectedLote.quantidade * selectedLote.valor).toFixed(2)}</p>
                    <p className="fs-5"><strong>Valor:</strong> R$ {selectedLote.valor.toFixed(2)}</p>
                </div>
            )}

            {/* Informações de todos os selecionados */}
            <div className=''>
                <h3 className='fs-4'>Informações de todos os tipos ingressos</h3>
                <p className="fs-5"><strong>Total ingressos comprados:</strong> {allIngressos.length}</p>
                <p className="fs-5"><strong>Receita total:</strong> R$ {allIngressos.reduce((acc, ingresso) => acc + ingresso.valor, 0).toFixed(2)}</p>
                <p className="fs-5"><strong>Quantidade por tipo:</strong></p>
                <ul>
                    {quantidadeIngressos.map((ingresso, index) => (
                        <li className="fs-5" key={index}>{ingresso.name}: {ingresso.value}</li>
                    ))}
                </ul>

                <p className='fs-5'><strong>Receita por tipo:</strong></p>
                <ul>
                    {quantidadeIngressos.map((ingresso, index) => (
                        <li className="fs-5" key={index}>{ingresso.name}: R$ {(ingressos[ingresso.name]?.quantidade * ingressos[ingresso.name]?.valor).toFixed(2)}</li>
                    ))}
                </ul>
            </div>
            </div>
            
        </div>
    );
};

export default Grafico;
