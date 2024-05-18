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
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../components/Utils/auth.jsx';
import 'bootstrap'

const EditarEvento = () => {
    const [eventos, setEventos] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [formData, setFormData] = useState(null);

    const [filteredEventos, setFilteredEventos] = useState([]);
    const [lotes, setLotes] = useState([]);
    const [selectedLote, setSelectedLote] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [lotesRenderizar, setLotesRenderizar] = useState([])
    const navigate = useNavigate();
    const inDevelopment = localStorage.getItem('inDevelopment');
    var url = '';
    if (inDevelopment === 'true') {
        url = 'http://localhost:5236/api/';
    } else {
        url = 'https://www.senailp.com.br/eventos-api/api/';
    }
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
        const response = await fetch(url + 'Evento');
        const data = await response.json();
        setEventos(data);
        setFilteredEventos(data);
    }

    async function fetchLotes() {
        const response = await fetch(url + 'Lote');
        const data = await response.json();
        setLotesRenderizar(data);
    }

    async function fetchImagem(idEvento) {
        const response = await fetch(url + `Evento/${idEvento}/image`);
        let data = await response.blob();
        const urlImage = URL.createObjectURL(data);
        document.getElementById('imagem-preview').src = urlImage;
        data = new Blob([data], { type: 'image/png' });
        const file = new File([data], 'imagem.png', { type: 'image/png' });
        return file;
    }

    useEffect(() => {
        fetchEventos();
        fetchLotes()
    }, []);

    function handleSalvarEvento() {
        const idEvento = parseInt(localStorage.getItem('idEvento'));
        const nome = formData.get('nome');
        let dataEvento = formData.get('data');
        const local = formData.get('local');
        const descricao = formData.get('descricao');
        let ativo = formData.get('ativo');
        let imagem = formData.get('imagem');
        
        if (ativo === 'true') {
            ativo = 1;
        } else {
            ativo = 0;
        }
    
        // Format date to ISO string
        dataEvento = new Date(dataEvento).toISOString();
    
        // Create FormData object
        const dataInput = new FormData();
        dataInput.append('id', 0)
        dataInput.append('idEvento', idEvento);
        dataInput.append('nomeEvento', nome);
        dataInput.append('dataEvento', dataEvento);
        dataInput.append('local', local);
        dataInput.append('descricao', descricao);
        dataInput.append('ativo', ativo);
        dataInput.append('imagemUrl', '');
        dataInput.append('totalIngressos', parseInt(0));
        dataInput.append('imagem', imagem);
        console.log(dataInput);
        fetch(url + 'Evento/' + idEvento, {
            method: 'PUT',
            body: dataInput, // Use FormData object
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setSuccessMessage('Evento editado com sucesso!');
            const updatedEventos = eventos.map(evento => {
                if (evento.idEvento === parseInt(idEvento)) {
                    return {
                        ...evento,
                        nomeEvento: data.nomeEvento,
                        dataEvento: data.dataEvento,
                        local: data.local,
                        descricao: data.descricao,
                        ativo: data.ativo,
                        imagemUrl: data.imagemUrl,
                        totalIngressos: data.totalIngressos,
                    };
                }
                return evento;
            });
            setEventos(updatedEventos);
            setFilteredEventos(updatedEventos);
        })
        .catch(error => {
            console.error('Error:', error);
            setErrorMessage('Erro ao editar evento!');
        });
    }
    

    function handleDeletarEvento() {
        const idEvento = localStorage.getItem('idEvento');
        fetch(url + 'Lote/evento/' + idEvento, {
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

        fetch(url + 'Evento/' + idEvento, {
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
        fetch(url + 'Lote/evento/' + idEvento)
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
        


        const formData = new FormData();
        //Pega a imagem do evento do servidor e coloca ela no modal
        formData.append('id', item.idEvento);
        formData.append('image', fetchImagem(item.idEvento))
        formData.append('nome', item.nomeEvento);
        formData.append('data', data);
        formData.append('local', item.local);
        formData.append('descricao', item.descricao);
        formData.append('ativo', item.ativo.toString()); // Convert boolean to string
        formData.append('totalIngressos', item.totalIngressos.toString()); // Convert to string
        
        setFormData(formData);

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
        let ativo = document.getElementById('ativo_loteAdicionarLote').checked;
        let dataInicio = document.getElementById('dataInicioAdicionarLote').value;
        let dataFinal = document.getElementById('dataFinalAdicionarLote').value;
        const tipo = document.getElementById('tipoAdicionarLote').value;
        const nome = document.getElementById('nomeLoteAdicionarLote').value;


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
            saldo: quantidadeTotal,
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
        setFilteredEventos(eventos);
    }, [eventos]);

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
                <TabelaFiltro renderizarDados={renderizarDados} tableFields={tableFields} filteredData={filteredEventos} />
                <ModalEventos handleSalvar={handleSalvarEvento} handleDeletar={handleDeletarEvento} fetchImagem={fetchImagem} />
                <ModalEditarLotes handleSalvar={handleSalvarLote} handleDeletar={handleDeletarLote} lotes={lotes} setSelectedLote={setSelectedLote} />
                <ModalAdicionarLote handleAdicionar={handleAdicionarLote}/>
            </div>
            <Rodape/>
            <ToastContainer />
        </div>
    );

}

export default EditarEvento