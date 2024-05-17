import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useParams } from "react-router-dom";

const COLORS = ['#2DB63A', '#2F5F98'];

const Grafico = () => {
  const idEvento = useParams().idEvento;
  const [lotes, setLotes] = useState([]);
  const [selectedLote, setSelectedLote] = useState(null);

  useEffect(() => {
    fetchLotes();
  }, []);

  const fetchLotes = async () => {
    try {
      const response = await fetch(`https://www.senailp.com.br/eventos-api/api/Lote/quantidadeIngressos/${idEvento}`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        idLote: item[0],
        quantidade_total: item[1],
        saldo: item[2],
        vendas: item[3],
        nome: item[4],
      }));
      setLotes(formattedData);
      setSelectedLote(formattedData[0]); // Selecionando o primeiro lote por padrão
    } catch (error) {
      console.error('Erro ao buscar quantidade de ingressos por tipo:', error);
    }
  }

  const handleLoteChange = (event) => {
    const selectedIdLote = parseInt(event.target.value);
    const selected = lotes.find(lote => lote.idLote === selectedIdLote);

    setSelectedLote(selected);
  }

  return (
      <div className="container">
        <div className="mb-3">
          <label htmlFor="lotes" className="form-label">Escolha um lote:</label>
          <div className="form-check form-check-inline">
            {lotes.map(lote => (
                <div key={lote.idLote} className="form-check">
                  <input
                      className="form-check-input"
                      type="radio"
                      name="lote"
                      value={lote.idLote}
                      checked={selectedLote && selectedLote.idLote === lote.idLote}
                      onChange={handleLoteChange}
                  />
                  <label className="form-check-label">{`Lote ${lote.nome}`}</label>
                </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
                data={selectedLote ? [
                  { name: 'Vendas', value: selectedLote.vendas },
                  { name: 'Ingressos disponíveis', value: selectedLote.saldo },
                ] : []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={160}
                fill="#8884d8"
                dataKey="value"
            >
              {selectedLote && (
                  <>
                    <Cell key="cell-0" fill={COLORS[0]} />
                    <Cell key="cell-1" fill={COLORS[1]} />
                  </>
              )}
            </Pie>
            <Legend
                align="center"
                verticalAlign="middle"
                layout="vertical"
                fontSize={14}
                iconSize={14}
                iconType="circle"
                wrapperStyle={{ lineHeight: '30px', marginLeft: '200px', marginTop: '25px', fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        {selectedLote && (
            <div className="mt-3">
              <p>{`Vendas: ${selectedLote.vendas}`}</p>
              <p>{`Ingressos disponíveis: ${selectedLote.saldo}`}</p>
            </div>
        )}
      </div>
  );
};

export default Grafico;
