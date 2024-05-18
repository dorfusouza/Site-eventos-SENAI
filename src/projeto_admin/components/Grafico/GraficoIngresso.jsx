import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useParams } from "react-router-dom";

const COLORS = ['#2F5F98', '#2D8BBA', '#41B8D5', '#6CE5E8'];

const Grafico = () => {
  const idEvento = useParams().idEvento;
  const [quantidadeIngressos, setQuantidadeIngressos] = useState([]);
  const inDevelopment = localStorage.getItem('inDevelopment');
  var url = '';
  if (inDevelopment === 'true') {
    url = 'http://localhost:5236/api/';
  } else {
    url = 'https://www.senailp.com.br/eventos-api/api/';
  }

  async function fetchQuantidadeIngressos() {
    try {
      const response = await fetch(url + 'Ingresso/quantidadeByTipoByEvento/' + idEvento);
      const data = await response.json();

      // Converter objeto em array de objetos
      const dataArray = Object.entries(data).map(([name, value]) => ({ name, value }));

      setQuantidadeIngressos(dataArray);
    } catch (error) {
      console.error('Erro ao buscar quantidade de ingressos por tipo:', error);
    }
  }

  useEffect(() => {
    fetchQuantidadeIngressos();
  }, []);

  return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
              data={quantidadeIngressos}
              cx="30%"
              cy="55%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
          >
            {quantidadeIngressos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Legend
              align="center"
              verticalAlign="middle"
              layout="vertical"
              fontSize={70}
              iconSize={28}
              iconType="circle"
              wrapperStyle={{ lineHeight: '60px', marginLeft: '200px', marginTop: '25px',fontSize: '18px'}}
          />

        </PieChart>
      </ResponsiveContainer>
  );
};

export default Grafico;
