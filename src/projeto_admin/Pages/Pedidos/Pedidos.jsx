import {useEffect, useState} from "react";
import {CampoFiltro} from "../../components/CampoFiltro/CampoFiltro.jsx";
import {ButtonFiltro} from "../../components/Buttons/ButtonFiltro.jsx";
import {TabelaFiltro} from "../../components/TabelaFiltro/TabelaFiltro.jsx";
import {ValidateButton} from "../../components/Buttons/ValidateButton.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rodape from "../../components/Rodape/index.jsx";
import Menu from "../../components/Menu/index.jsx";

function Pedidos(){
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const inDevelopment = localStorage.getItem('inDevelopment');
    var url = '';
    if (inDevelopment === 'true') {
        url = 'http://localhost:5236/api/';
    } else {
        url = 'https://www.senailp.com.br/eventos-api/api/';
    }

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

    useEffect(() => {
        fetchUsuarios();
        fetchPedidos();
    }, []);

    const handleValidate = (id) => {
        let idUsuario = localStorage.getItem('id')
        fetch(url + 'Pedido/validar/' + id + `?validacaoIdUsuario=${idUsuario}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage(`Pedido ${id} validado com sucesso!`)
                const newPedidos = pedidos.map((pedido) => {
                    if(pedido.idPedido === id){
                        return data;
                    }
                    return pedido;
                });

                setPedidos(newPedidos);
                setFilteredPedidos(newPedidos);
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage("Erro ao validar pedido!")
            });
    }


    const handleClear = () => {
        setFiltrosSelecionados([]);
    }

    const handleFilter = (value) => {
        let filtros = [...filtrosSelecionados];
        if (value === "Validado" && (filtrosSelecionados.includes("Pendente") || filtrosSelecionados.includes("Cancelado"))) {
            filtros = filtros.filter((item) => item !== "Pendente" && item !== "Cancelado");
        } else if (value === "Pendente" && (filtrosSelecionados.includes("Validado") || filtrosSelecionados.includes("Cancelado"))) {
            filtros = filtros.filter((item) => item !== "Validado" && item !== "Cancelado");
        } else if (value === "Cancelado" && (filtrosSelecionados.includes("Validado") || filtrosSelecionados.includes("Pendente"))) {
            filtros = filtros.filter((item) => item !== "Validado" && item !== "Pendente");
        }
        setFiltrosSelecionados([...filtros, value]);
    }

    function renderizarDados(){
        return filteredPedidos.filter((item) => {
            let nomeCompleto = usuarios.find((usuario) => usuario.idUsuario === item.usuariosId).nomeCompleto;
            if(filterText === ""){
                return item;
            } else if(nomeCompleto.toLowerCase().includes(filterText.toLowerCase())){
                return item;
            }
        }).filter((item) => {
            if(!filtrosSelecionados.includes("Validado") && !filtrosSelecionados.includes("Pendente") && !filtrosSelecionados.includes("Cancelado")){
                return item;
            } else if(filtrosSelecionados.includes("Validado") && !filtrosSelecionados.includes("Pendente") && !filtrosSelecionados.includes("Cancelado")){
                return item.status === "Validado";
            } else if(filtrosSelecionados.includes("Pendente") && !filtrosSelecionados.includes("Validado") && !filtrosSelecionados.includes("Cancelado")){
                return item.status === "Pendente";
            } else if(filtrosSelecionados.includes("Cancelado") && !filtrosSelecionados.includes("Validado") && !filtrosSelecionados.includes("Pendente")){
                return item.status === "Cancelado";
            } else {
                return item;
            }
        }).map((item) => {
            let nomeCompleto = null
            let nomeAdmin = null
            if (usuarios === null || usuarios === undefined) {
                nomeCompleto = null
                nomeAdmin = null
            } else {
                nomeCompleto = usuarios.find((usuario) => usuario.idUsuario === item.usuariosId).nomeCompleto;
                if (item.validacaoIdUsuario === 0) {
                    nomeAdmin = "Não validado";
                } else {
                    usuarios.forEach((usuario) => {
                        if (usuario.idUsuario === item.validacaoIdUsuario) {
                            nomeAdmin = usuario.nomeCompleto
                        }
                    })
                }
            }
            return(
                <>
                    <tr key={item.id}>
                        <td>{item.idPedido}</td>
                        <td>{nomeCompleto}</td>
                        <td>{item.dataCadastro}</td>
                        <td>{item.total}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.formaPagamento}</td>
                        <td>{item.status}</td>
                        <td>{nomeAdmin}</td>
                        <td><ValidateButton id={item.idPedido} validate={   handleValidate} status={item.status} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/></td>
                    </tr>
                </>
            )
        })
    }

    const tableFields = ["ID Pedido", "Nome", "Data Cadastro", "Total", "Quantidade", "Forma de Pagamento", "Status", "Quem validou", "Validar pedido"];

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
            <Menu/>
            <div className="container">
                <h3 className="text-center">Pedidos</h3>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <CampoFiltro placeholder="Pesquisar pedido de usuário" handleFilter={setFilterText} />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12 col-md-6">
                        <ButtonFiltro opcoes={["Validado", "Pendente", "Cancelado"]} handleFilter={handleFilter} handleClear={handleClear}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <TabelaFiltro renderizarDados={renderizarDados} tableFields={tableFields} filteredData={filteredPedidos}/>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}

export default Pedidos 