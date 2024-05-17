import { Lote } from '../../components/Lote/Lote.jsx';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from '../../components/Utils/msgToast.jsx';
import Rodape from "../../components/Rodape/index.jsx";
import Cabecalho from "../../../projeto_reserva/Components/Cabecalho/Cabecalho.jsx";
import Menu from "../../components/Menu/index.jsx";

import {useNavigate} from 'react-router-dom';
import { isAuthenticated } from '../../components/Utils/auth.jsx';

const CriarEvento = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [sucessMessage, setSucessMessage] = useState('');
    const today = new Date().toISOString().split('T')[0];
    
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

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const lotes = [];
        for (let i = 0; i < formData.get("quantidadeLotes"); i++) {
            const tipoLote = formData.get('tipoLote');
            const preco = formData.getAll('valorIngresso')[i];
            const quantidadeIngressos = formData.getAll('quantidadeIngressos')[i];
            const dataInicio = formData.getAll('dataInicio')[i];
            const dataTermino = formData.getAll('dataTermino')[i];
            const nomeLote = formData.getAll('nomeLote')[i];
            if (tipoLote === 'quantidade' && (quantidadeIngressos === '' || preco === '')) {
                setErrorMessage('Por favor preencha todos os campos dos lotes.');
                window.scrollTo(0, document.body.scrollHeight);
                return;
            } else {
                lotes.push({
                    tipoLote,
                    preco,
                    quantidadeIngressos,
                    dataInicio,
                    dataTermino,
                    nomeLote,
                });
            }
        }

        if (lotes.length === 0) {
            setErrorMessage('Por favor adicione ao menos um lote.');
            return;
        } else {
            setErrorMessage('');
        }

        const file = formData.get('imagemDivulgacao');
        if (file.size > 2 * 1024 * 1024) {
            setErrorMessage('A imagem deve ter no máximo 2MB.');
            return;
        }

        const eventoData = {
            idEvento: 0,
            dataEvento: formData.get('dataEvento'),
            descricao: formData.get('descricao'),
            imagemUrl: "",
            local: formData.get('local'),
            ativo: 1,
            nomeEvento: formData.get('nomeEvento'),
            totalIngressos: lotes.reduce((acc, lote) => acc + parseInt(lote.quantidadeIngressos), 0),
        };
        const url = "https://www.senailp.com.br/eventos-api/api/evento"
        //const url = "http://localhost:5236/api/evento"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventoData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                lotes.forEach(lote => {
                    const loteData = {
                        idLote: 0,
                        eventoId: data,
                        valorUnitario: lote.preco ? lote.preco : 0,
                        quantidadeTotal: lote.quantidadeIngressos,
                        saldo: lote.quantidadeIngressos,
                        ativo: 1,
                        dataFinal: lote.dataTermino ? lote.dataTermino : null,
                        dataInicio: lote.dataInicio ? lote.dataInicio : null,
                        tipo: lote.tipoLote,
                        nome: lote.nomeLote,
                    };
                    console.log(loteData)
                    console.log(`Data: ${data}`)
                    const loteUrl = "https://www.senailp.com.br/eventos-api/api/lote"
                    //const loteUrl = "http://localhost:5236/api/lote"
                    fetch(loteUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loteData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            setSucessMessage('Evento criado com sucesso!');
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
    }

    const [lotes, setLotes] = useState([]);
    const [tipoLote, setTipoLote] = useState('quantidade');
    const [quantidadeLotes, setQuantidadeLotes] = useState(1);

    const handleAddLotes = (event) => {
        event.preventDefault();

        const newLotes = Array.from({ length: quantidadeLotes }, () => ({ tipo: tipoLote }));
        setLotes(newLotes);
        toast.info('Lote adicionado com sucesso!');
    };

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }
        if (sucessMessage) {
            toast.success(sucessMessage);
        }
    }, [errorMessage, sucessMessage]);

    return (
        <div>
            <Menu/>
            <form onSubmit={handleSubmit} className="p-4">
                <h1 className="mb-4">Criar evento</h1>
                <fieldset className="border border-primary rounded p-4 mb-4">
                    <legend className="text-primary fs-3">1. Informações básicas</legend>
                    <p>Adicione as principais informações do evento</p>
                    <div className="mb-3">
                        <label htmlFor="nomeEvento" className="form-label">Nome do evento <strong style={{color: 'red', fontWeight: 'normal' }}>*</strong></label>
                        <input type="text" className="form-control w-25" placeholder="Nome do evento" required name={"nomeEvento"} />
                    </div>

                    <h3>Imagem de divulgação (opcional)</h3>
                    <div className="mb-3">
                        <input type="file" accept="image/*" className="form-control w-25" name="imagemDivulgacao" />
                        <p>A dimensão recomendada é de 1600 x 838 (mesma proporção do formato utilizado nas páginas de evento no Facebook). Formato JPEG, GIF ou PNG de no máximo 2MB. Imagens com dimensões diferentes serão redimensionadas.</p>
                    </div>
                </fieldset>

                <fieldset className="border border-primary rounded p-4 mb-4">
                    <legend className="text-primary fs-3">2. Descrição do evento</legend>
                    <p>Adicione informações detalhadas sobre o evento</p>
                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição <strong style={{color: 'red', fontWeight: 'normal' }}>*</strong></label>
                        <textarea className="form-control" placeholder="Descrição do evento" required name={"descricao"}></textarea>
                    </div>
                </fieldset>

                <fieldset className="border border-primary rounded p-4 mb-4">
                    <legend className="text-primary fs-3">3. Data do evento</legend>
                    <p>Quando o seu evento irá acontecer?</p>
                    <div className="mb-3">
                        <label htmlFor="dataEvento" className="form-label">Data <strong style={{color: 'red', fontWeight: 'normal' }}>*</strong></label>
                        <input type="date" min={today} required name={"dataEvento"} className={"form-control DataInput w-25"} />
                    </div>
                </fieldset>

                <fieldset className="border border-primary rounded p-4 mb-4">
                    <legend className="text-primary fs-3">4. Criar lote(s)</legend>
                    <p>Adicione ingressos para o seu evento</p>

                    <div className={"mb-3 TipoLote"}>
                        <label htmlFor="tipoLote" className="form-label">Qual tipo de lote o seu evento irá ter?</label>
                        <select value={tipoLote} onChange={(e) => setTipoLote(e.target.value)} required name={"tipoLote"} className="form-select w-25">
                            <option value="quantidade">Quantidade</option>
                            <option value="tempo">Tempo</option>
                            <option value="gratis">Grátis</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantidadeLotes" className="form-label">Quantidade de lotes</label>
                        <input type="number" value={quantidadeLotes} min={1} onChange={(e) => setQuantidadeLotes(e.target.value)} required name={"quantidadeLotes"} className={"form-control QuantidadeLote w-25"} />
                    </div>

                    <button onClick={handleAddLotes} className="btn btn-primary AdicionarLote mb-4">Adicionar lote</button>

                    {lotes.map((lote, index) => (
                        <Lote key={index} tipo={lote.tipo} />
                    ))}
                </fieldset>

                <fieldset className="border border-primary rounded p-4 mb-4">
                    <legend className="text-primary fs-3">5. Local do evento</legend>
                    <p>Onde o seu evento irá acontecer?</p>
                    <div className="mb-3">
                        <label htmlFor="local" className="form-label">Local <strong style={{color: 'red', fontWeight: 'normal' }}>*</strong></label>
                        <input type="text" className="form-control w-50" placeholder="Local do evento" name={"local"} required />
                    </div>
                </fieldset>

                <button type="submit" className={"btn btn-primary me-2"}>Criar evento</button>
                <ToastContainer />
            </form>
            <Rodape/>
        </div>
    );
}

export default CriarEvento