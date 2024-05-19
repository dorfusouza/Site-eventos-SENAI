import { useState, useEffect } from 'react';
import { CampoFiltro } from "../../components/CampoFiltro/CampoFiltro.jsx";
import { ButtonFiltro } from "../../components/Buttons/ButtonFiltro.jsx";
import { TabelaFiltro } from "../../components/TabelaFiltro/TabelaFiltro.jsx";
import { ValidateButton } from "../../components/Buttons/ValidateButton.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rodape from "../../components/Rodape/index.jsx";
import Menu from "../../components/Menu/index.jsx";
import { CancelButton } from "../../components/Buttons/CancelButton.jsx";

function Pedidos() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState({
        status: null,
        pendingYesterday: false,
    });
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const inDevelopment = localStorage.getItem('inDevelopment');
    const url = inDevelopment === 'true' ? 'http://localhost:5236/api/' : 'https://www.senailp.com.br/eventos-api/api/';

    useEffect(() => {
        async function fetchPedidos() {
            const response = await fetch(url + 'Pedido');
            const data = await response.json();
            setPedidos(data);
            setFilteredPedidos(data);
        }

        async function fetchUsuarios() {
            const response = await fetch(url + 'Usuario');
            const data = await response.json();
            setUsuarios(data);
        }

        fetchUsuarios();
        fetchPedidos();
    }, []);

    const handleFilter = (type, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: prevFilters[type] === value ? null : value,
        }));
    };

    const handlePendingYesterdayFilter = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            pendingYesterday: !prevFilters.pendingYesterday,
        }));
    };

    const applyFilters = (data) => {
        return data.filter((item) => {
            const matchesText = filterText === "" || usuarios.find((usuario) => usuario.idUsuario === item.usuariosId).nomeCompleto.toLowerCase().includes(filterText.toLowerCase());
            const matchesStatus = filters.status === null || item.status === filters.status;

            let matchesPendingYesterday = true;
            if (filters.pendingYesterday) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const itemDate = new Date(item.dataCadastro);
                matchesPendingYesterday = item.status === 'Pendente' && 
                                          itemDate.getDate() === yesterday.getDate() &&
                                          itemDate.getMonth() === yesterday.getMonth() &&
                                          itemDate.getFullYear() === yesterday.getFullYear();
            }

            return matchesText && matchesStatus && matchesPendingYesterday;
        });
    };

    const handleClear = (type) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: null,
        }));
    };

    useEffect(() => {
        setFilteredPedidos(applyFilters(pedidos));
    }, [filterText, filters, pedidos]);

    const handleValidate = (id) => {
        let idUsuario = localStorage.getItem('id');
        fetch(url + 'Pedido/validar/' + id + `?validacaoIdUsuario=${idUsuario}`, {
            method: 'PUT',
        })
        .then(response => response.json())
        .then(data => {
            setSuccessMessage(`Pedido ${id} validado com sucesso!`);
            const newPedidos = pedidos.map((pedido) => pedido.idPedido === id ? data : pedido);
            setPedidos(newPedidos);
            setFilteredPedidos(newPedidos);
        })
        .catch((error) => {
            setErrorMessage("Erro ao validar pedido!");
        });
    }

    const handleCancel = (id) => {
        fetch(url + 'Pedido/cancelar/' + id, {
            method: 'PUT',
        })
        .then(response => response.json())
        .then(data => {
            setSuccessMessage(`Pedido ${id} cancelado com sucesso!`);
            const newPedidos = pedidos.map((pedido) => pedido.idPedido === id ? data : pedido);
            setPedidos(newPedidos);
            setFilteredPedidos(newPedidos);
        })
        .catch((error) => {
            setErrorMessage("Erro ao cancelar pedido!");
        });
    }

    const renderizarDados = () => {
        return filteredPedidos.map((item) => {
            const nomeCompleto = usuarios.find((usuario) => usuario.idUsuario === item.usuariosId).nomeCompleto;
            const nomeAdmin = item.validacaoIdUsuario === 0 ? "Não validado" : usuarios.find((usuario) => usuario.idUsuario === item.validacaoIdUsuario).nomeCompleto;
            return (
                <tr key={item.idPedido}>
                    <td>{item.idPedido}</td>
                    <td>{nomeCompleto}</td>
                    <td>{item.dataCadastro}</td>
                    <td>{item.total}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.formaPagamento}</td>
                    <td>{item.status}</td>
                    <td>{nomeAdmin}</td>
                    <td><ValidateButton id={item.idPedido} validate={handleValidate} status={item.status} pedido={item} /></td>
                    <td><CancelButton id={item.idPedido} cancel={handleCancel} status={item.status} pedido={item} /></td>
                </tr>
            );
        });
    };

    const tableFields = ["ID Pedido", "Nome", "Data Cadastro", "Total", "Quantidade", "Forma de Pagamento", "Status", "Quem validou", "Validar pedido", "Cancelar pedido"];

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }
        if (successMessage) {
            toast.success(successMessage);
        }
    }, [errorMessage, successMessage]);

    return (
        <div>
            <Menu />
            <div className="container">
                <h3 className="text-center">Pedidos</h3>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <CampoFiltro placeholder="Pesquisar pedido de usuário" handleFilter={setFilterText} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <ButtonFiltro opcoes={["Validado", "Pendente", "Cancelado"]} handleFilter={(value) => handleFilter("status", value)} handleClear={() => handleClear("status")} />
                    </div>
                    <div className="col-12 col-md-6">
                        <ButtonFiltro opcoes={["Pendentes de Ontem"]} handleFilter={handlePendingYesterdayFilter} handleClear={() => handleClear("pendingYesterday")} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <TabelaFiltro renderizarDados={renderizarDados} tableFields={tableFields} filteredData={filteredPedidos} />
                    </div>
                </div>
            </div>
            <Rodape />
            <ToastContainer />
        </div>
    );
}

export default Pedidos;
