import { useState, useEffect } from 'react';
import { ModalEventos } from '../../components/Modal/ModalEventos';
import { ModalEditarLotes } from '../../components/Modal/ModalEditarLotes';
import { ModalAdicionarLote } from '../../components/Modal/ModalAdicionarLote';
import {TabelaFiltro} from '../../components/TabelaFiltro/TabelaFiltro';
import {CampoFiltro} from '../../components/CampoFiltro/CampoFiltro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from "../../components/Menu/index.jsx";
import Rodape from "../../components/Rodape/index.jsx";

const EditarEvento = () => {
    const [eventos, setEventos] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [filteredEventos, setFilteredEventos] = useState([]);
    const [lotes, setLotes] = useState([]);
    const [selectedLote, setSelectedLote] = useState(0);
    const loteSelect = document.getElementById('lote');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [lotesRenderizar, setLotesRenderizar] = useState([])
    const navigate = useNavigate();
  
    const verificarAutenticacao = () => {
    if (!isAuthenticated()) {
        console.log('Usuário não autenticado');
        navigate('/admin/');
    }
    }

    useEffect(() => {
    verificarAutenticacao();
    }, []);

    async function fetchEventos() {
        const url = 'https://www.senailp.com.br/eventos-api/api/evento';
        //const url = 'http://localhost:5236/api/Evento';
        const response = await fetch(url);
        const data = await response.json();
        setEventos(data);
        setFilteredEventos(data);
    }

    async function fetchLotes() {
        //const url = 'http://localhost:5236/api/Lote/evento/' + idEvento;
        const url = 'https://www.senailp.com.br/eventos-api/api/Lote/';
        const response = await fetch(url);
        const data = await response.json();
        setLotesRenderizar(data);
    }

    useEffect(() => {
        fetchEventos();
        fetchLotes()
    }, []);


    const handleFilter = (value) => {
        if (filtrosSelecionados.includes(value)) {
            setFiltrosSelecionados(filtrosSelecionados.filter((item) => item !== value));
        } else {
            setFiltrosSelecionados([...filtrosSelecionados, value]);
        }
    }

    const handleClear = (value) => {
        setFiltrosSelecionados(filtrosSelecionados.filter((item) => item !== value));
    }

    function handleSalvarEvento() {
        const nome = document.getElementById('nome').value;
        let dataEvento = document.getElementById('data').value;
        const local = document.getElementById('local').value;
        const descricao = document.getElementById('descricao').value;
        let ativo = document.getElementById('ativo').checked;
        const idEvento = localStorage.getItem('idEvento');
        const imagemUrl = document.getElementById('imagem').value;

        ativo = ativo ? 1 : 0;

        dataEvento = new Date(dataEvento).toISOString();

        const data = {
            idEvento: idEvento,
            nomeEvento: nome,
            dataEvento: dataEvento,
            local: local,
            descricao: descricao,
            ativo: ativo,
            imagemUrl: imagemUrl,
            totalIngressos: 0,
            imagem: ""
        }

        console.log(data)

        //const url = 'http://localhost:5236/api/Evento/' + idEvento;
        const url = 'https://www.senailp.com.br/eventos-api/api/Evento/' + idEvento;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage('Evento editado com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erro ao editar evento!');
            });

        const newEventos = eventos.map((evento) => {
            if (evento.idEvento === idEvento) {
                return data;
            }
            return evento;
        });

        setEventos(newEventos);
        setFilteredEventos(newEventos);
    }

    function handleDeletarEvento() {
        const idEvento = localStorage.getItem('idEvento');
        //const url = 'http://localhost:5236/api/Lote/evento/' + idEvento;
        const url = 'https://www.senailp.com.br/eventos-api/api/Lote/evento/' + idEvento;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage('Lotes deletados com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erro ao deletar lotes!');
            });

        //const urlEvento = 'http://localhost:5236/api/Evento/' + idEvento;
        const urlEvento = 'https://www.senailp.com.br/eventos-api/api/Evento/' + idEvento;
        fetch(urlEvento, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage('Evento deletado com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erro ao deletar evento!');
            });

        const newEventos = eventos.filter((evento) => {
            return evento.idEvento !== idEvento;
        })

        setEventos(newEventos);
        setFilteredEventos(newEventos);
    }

    function handleModalLotes(idEvento) {
        localStorage.setItem('idEvento', idEvento);
        //const url = 'http://localhost:5236/api/Lote/evento/' + idEvento;
        const url = 'https://www.senailp.com.br/eventos-api/api/Lote/evento/' + idEvento;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setLotes(data);
                console.log('Success:', data);
                setSelectedLote(0);
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erro ao buscar lotes!');
            });

        var myModal = new bootstrap.Modal(document.getElementById('modalLotes'), {
            keyboard: false,
            backdrop: 'static'
        });

        const tipo = document.getElementById('tipo').value;


        if (tipo === "quantidade" || tipo === "gratis") {
            document.getElementById('dataInicio').parentElement.style.display = 'none';
            document.getElementById('dataFinal').parentElement.style.display = 'none';
        }

        myModal.show();
    }


    function handleModalEventos(item) {
        localStorage.setItem('idEvento', item.idEvento);
        var myModal = new bootstrap.Modal(document.getElementById('modal'), {
            keyboard: false,
            backdrop: 'static'
        });
        var data = new Date(item.dataEvento).toISOString().split('T')[0];
        document.getElementById('nome').value = item.nomeEvento;
        document.getElementById('data').value = data;
        document.getElementById('local').value = item.local;
        document.getElementById('descricao').value = item.descricao;
        document.getElementById('ativo').checked = item.ativo;
        document.getElementById('totalIngressos').value = item.totalIngressos;
        myModal.show();
    }

    function handleModalAdicionarLote() {
        var myModal = new bootstrap.Modal(document.getElementById('modalAdicionarLote'), {
            keyboard: false,
            backdrop: 'static'
        });
        document.getElementById('dataInicioAdicionarLote').parentElement.style.display = 'none';
        document.getElementById('dataFinalAdicionarLote').parentElement.style.display = 'none';
        myModal.show();
    }

    function renderizarDados() {
        return filteredEventos.filter((item) => {
            if (filterText === "") {
                return item;
            } else if (item.nomeEvento.toLowerCase().includes(filterText.toLowerCase())) {
                return item;
            }
        }).map((item) => {
            var data = new Date(item.dataEvento).toISOString().split('T')[0];
            data = data.split('-').reverse().join('/');
            let qtdLotes = 0;
            lotesRenderizar.map((lote) => {
                if (lote.eventoId === item.idEvento) {
                    qtdLotes++;
                }
            });
            return (
                <tr key={item.idEvento}>
                    <td>{item.nomeEvento}</td>
                    <td>{data}</td>
                    <td>{item.ativo ? "Ativo" : "Inativo"}</td>
                    <td>{item.local}</td>
                    <td style={{ maxWidth: '200px' }}>
                        {item.descricao}</td>
                    <td>{item.totalIngressos}</td>
                    <td>{qtdLotes}</td>
                    <td>
                        <button onClick={() => {
                            handleModalEventos(item);
                        }} className='btn btn-primary'
                        >Editar Evento</button>
                    </td>
                    <td>
                        <button onClick={() => {
                            handleModalLotes(item.idEvento);
                        }} className='btn btn-primary'
                        >Editar Lotes</button>
                    </td>
                    <td>
                        <button onClick={() => {
                            handleModalAdicionarLote(item.idEvento);
                        }} className='btn btn-success'
                        >Adicionar Lote</button>
                    </td>
                </tr>
            )
        });
    }

    function handleSalvarLote() {
        const idLote = parseInt(document.getElementById('lote').value);
        const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);
        const quantidadeTotal = parseInt(document.getElementById('quantidadeTotal').value);
        const saldo = parseInt(document.getElementById('saldo').value);
        let ativo = document.getElementById('ativo_lote').checked;
        let dataInicio = document.getElementById('dataInicio').value;
        let dataFinal = document.getElementById('dataFinal').value;
        const tipo = document.getElementById('tipo').value;
        const nome = document.getElementById('nomeLote').value;

        if (saldo > quantidadeTotal) {
            setErrorMessage('O saldo não pode ser maior que a quantidade total!');
            return;
        }
        
        ativo = ativo ? 1 : 0;

        if (tipo != "tempo") {
            dataInicio = new Date().toISOString().split('T')[0];
            dataFinal = new Date().toISOString().split('T')[0];
        }

        const data = {
            idLote: idLote,
            eventoId: localStorage.getItem('idEvento'),
            valorUnitario: valorUnitario,
            quantidadeTotal: quantidadeTotal,
            saldo: saldo,
            ativo: ativo,
            dataInicio: dataInicio,
            dataFinal: dataFinal,
            tipo: tipo,
            nome: nome
        }

        console.log(data);
        //const url = 'http://localhost:5236/api/Lote/' + idLote;
        const url = 'https://www.senailp.com.br/eventos-api/api/Lote/' + idLote;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage('Lote editado com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erro ao editar lote!');
            });

        const newLotes = lotes.map((lote) => {
            if (lote.idLote === idLote) {
                return data;
            }
            return lote;
        });

        setLotes(newLotes);
    }

    function handleAdicionarLote() {
        const valorUnitario = parseFloat(document.getElementById('valorUnitarioAdicionarLote').value);
        const quantidadeTotal = parseInt(document.getElementById('quantidadeTotalAdicionarLote').value);
        const saldo = parseInt(document.getElementById('saldoAdicionarLote').value);
        let ativo = document.getElementById('ativo_loteAdicionarLote').checked;
        let dataInicio = document.getElementById('dataInicioAdicionarLote').value;
        let dataFinal = document.getElementById('dataFinalAdicionarLote').value;
        const tipo = document.getElementById('tipoAdicionarLote').value;
        const nome = document.getElementById('nomeLoteAdicionarLote').value;

        if (saldo > quantidadeTotal) {
            setErrorMessage('O saldo não pode ser maior que a quantidade total!');
            return;
        }

        ativo = ativo ? 1 : 0;

        if (tipo != "tempo") {
            dataInicio = new Date().toISOString().split('T')[0];
            dataFinal = new Date().toISOString().split('T')[0];
        }

        const data = {
            idLote: 0,
            eventoId: localStorage.getItem('idEvento'),
            valorUnitario: valorUnitario,
            quantidadeTotal: quantidadeTotal,
            saldo: saldo,
            ativo: ativo,
            dataInicio: dataInicio,
            dataFinal: dataFinal,
            tipo: tipo,
            nome: nome
        }

        console.log(data);
        //const url = 'http://localhost:5236/api/Lote';
        const url = 'https://www.senailp.com.br/eventos-api/api/Lote';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage('Lote adicionado com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('Erro ao adicionar lote!');
            });

        const newLotes = [...lotes, data];
        setLotes(newLotes);
    }

    useEffect(() => {
        if (lotes.length === 0) {
            document.getElementById('valorUnitario').value = "";
            document.getElementById('quantidadeTotal').value = "";
            document.getElementById('saldo').value = "";
            document.getElementById('ativo').checked = false;
            document.getElementById('dataInicio').value = "";
            document.getElementById('dataFinal').value = "";
            document.getElementById('tipo').value = "quantidade";
        }
    }, [lotes]);

    useEffect(() => {
        if (selectedLote !== 0) {
            document.getElementById('lote').value = selectedLote;
        }
    }, [selectedLote])

    function handleDeletarLote() {
        const idLote = selectedLote;
        //const url = 'http://localhost:5236/api/Lote/' + idLote;
        const url = 'https://www.senailp.com.br/eventos-api/api/Lote/' + idLote;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSuccessMessage('Lote deletado com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        const newLotes = lotes.filter((lote) => {
            return lote.idLote !== idLote;
        })

        setLotes(newLotes);
        //Tira as informações do lote do modal
        document.getElementById('valorUnitario').value = "";
        document.getElementById('quantidadeTotal').value = "";
        document.getElementById('saldo').value = "";
        document.getElementById('ativo').checked = false;
        document.getElementById('dataInicio').value = "";
        document.getElementById('dataFinal').value = "";
        document.getElementById('tipo').value = "quantidade";
        document.getElementById('nomeLote').value = "";
        setSelectedLote(0);
    }

    const tableFields = ["Nome", "Data", "Ativo", "Local", "Descrição", "Quantidade de ingressos", "Quantidade de lotes", "Editar Evento", "Editar Lotes", "Adicionar Lote"]

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
                <h3 className='text-center'>Eventos cadastrados</h3>
                <div id="containerFiltro">
                    <CampoFiltro placeholder="Pesquisar evento por nome" handleFilter={setFilterText} />
                </div>
                <TabelaFiltro renderizarDados={renderizarDados} tableFields={tableFields} />
                <ModalEventos handleSalvar={handleSalvarEvento} handleDeletar={handleDeletarEvento} />
                <ModalEditarLotes handleSalvar={handleSalvarLote} handleDeletar={handleDeletarLote} lotes={lotes} setSelectedLote={setSelectedLote} />
                <ModalAdicionarLote handleAdicionar={handleAdicionarLote}/>
            </div>
            <Rodape/>
        </div>
    );

}

export default EditarEvento