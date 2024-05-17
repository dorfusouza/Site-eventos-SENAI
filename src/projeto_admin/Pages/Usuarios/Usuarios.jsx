import { useState, useEffect } from 'react';
import { CampoFiltro } from "../../components/CampoFiltro/CampoFiltro.jsx";
import { ButtonFiltro } from "../../components/Buttons/ButtonFiltro.jsx";
import { TabelaFiltro } from "../../components/TabelaFiltro/TabelaFiltro.jsx";
import { ModalUsuarios } from "../../components/Modal/ModalUsuarios.jsx";
import {EditButton} from "../../components/Buttons/EditButton.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rodape from "../../components/Rodape/index.jsx";
import Menu from "../../components/Menu/index.jsx";

function Usuarios() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [modalData, setModalData] = useState();

    useEffect(() => {
        async function fetchUsuarios() {
            const url = 'https://www.senailp.com.br/eventos-api/api/Usuario';
            //const url = 'http://localhost:5236/api/Usuario';
            const response = await fetch(url);
            const data = await response.json();
            setUsuarios(data);
            setFilteredUsuarios(data);
        }

        fetchUsuarios();
    }, []);

    useEffect(() => {
        if (modalData) {
            document.getElementById('nomeCompleto').value = modalData.nomeCompleto;
            document.getElementById('email').value = modalData.email;
            document.getElementById('senha').value = modalData.senha;
            document.getElementById('telefone').value = modalData.telefone;
            document.getElementById('perfil').value = modalData.perfil;
            document.getElementById('ativo').checked = modalData.ativo;
            document.getElementById('idUsuario').value = modalData.idUsuario;
        }
    }, [modalData]);

    const handleFilter = (value) => {
        let filtros = [...filtrosSelecionados];
        if (value === "Ativo" && filtrosSelecionados.includes("Inativo")) {
            filtros = filtros.filter((item) => item !== "Inativo");
        } else if (value === "Inativo" && filtrosSelecionados.includes("Ativo")) {
            filtros = filtros.filter((item) => item !== "Ativo");
        }
        if (value === "Usuario" && filtrosSelecionados.includes("Administrador")) {
            filtros = filtros.filter((item) => item !== "Administrador");
        } else if (value === "Administrador" && filtrosSelecionados.includes("Usuario")) {
            filtros = filtros.filter((item) => item !== "Usuario");
        }
        setFiltrosSelecionados([...filtros, value]);
    }

    const handleClear = (value) => {
        setFiltrosSelecionados(filtrosSelecionados.filter((item) => item !== value));
    }

    useEffect(() => {
        setFilteredUsuarios(usuarios);
    }, [usuarios]);

    function renderizarDados() {
        return filteredUsuarios.filter((item) => {
            if (filterText === "") {
                return item;
            } else if (item.nomeCompleto.toLowerCase().includes(filterText.toLowerCase())) {
                return item;
            }
        }).filter((item) => {
            if (!filtrosSelecionados.includes("Ativo") && !filtrosSelecionados.includes("Inativo")) {
                return item;
            } else if (filtrosSelecionados.includes("Ativo") && !filtrosSelecionados.includes("Inativo")) {
                return item.ativo;
            } else if (filtrosSelecionados.includes("Inativo") && !filtrosSelecionados.includes("Ativo")) {
                return !item.ativo;
            } else if (filtrosSelecionados.includes("Ativo") && filtrosSelecionados.includes("Inativo")) {
                return item;
            } else {
                return item;
            }
        }).filter((item) => {
            if (!filtrosSelecionados.includes("Usuario") && !filtrosSelecionados.includes("Administrador")) {
                return item;
            } else if (filtrosSelecionados.includes("Usuario") && !filtrosSelecionados.includes("Administrador")) {
                return item.perfil === "Usuario";
            } else if (filtrosSelecionados.includes("Administrador") && !filtrosSelecionados.includes("Usuario")) {
                return item.perfil === "Administrador";
            } else if (filtrosSelecionados.includes("Usuario") && filtrosSelecionados.includes("Administrador")) {
                return item;
            } else {
                return item;
            }
        }).map((item) => {
            return (
                <tr key={item.idUsuario}>
                    <td>{item.nomeCompleto}</td>
                    <td>{item.email}</td>
                    <td>{item.senha}</td>
                    <td>{item.telefone}</td>
                    <td>{item.perfil}</td>
                    <td>{item.ativo ? "Ativo" : "Inativo"}</td>
                    <td>
                        <EditButton data={item} modalData={modalData} setModalData={setModalData} />
                    </td>
                </tr>
            )
        });
    }

    const tableFields = ["Nome Completo", "Email", "Senha", "Telefone", "Perfil", "Ativo", ""]

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
            <h3 className="text-center">Usuários cadastrados</h3>
            <div className="row justify-content-center">
                <div className="col-12">
                    <CampoFiltro placeholder="Pesquisar usuário por nome" handleFilter={setFilterText} />
                    <div className="btn-group me-2" role="group" aria-label="Basic checkbox toggle button group">
                        <ButtonFiltro opcoes={["Ativo", "Inativo"]} handleFilter={handleFilter} handleClear={handleClear} />
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <ButtonFiltro opcoes={["Usuario", "Administrador"]} handleFilter={handleFilter} handleClear={handleClear} />
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <TabelaFiltro renderizarDados={renderizarDados} tableFields={tableFields}/>
                </div>
            </div>
            <ModalUsuarios modalData={modalData} setModalData={setModalData} usuarios={usuarios} setUsuarios={setUsuarios} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
            </div>
            <Rodape/>
        </div>
    );
}

export default Usuarios;