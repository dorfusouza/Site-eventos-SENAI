export const ModalEventos = ({handleSalvar, handleDeletar}) => {

    return (
        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar Evento</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="data" className="form-label">Data</label>
                                <input type="date" className="form-control" id="data"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="local" className="form-label">Local</label>
                                <input type="text" className="form-control" id="local"/>    
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descricao" className="form-label">Descrição</label>
                                <input type="text" className="form-control" id="descricao"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="totalIngressos" className="form-label">Total Ingressos</label>
                                <input type="number" className="form-control" id="totalIngressos" disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ativo" className="form-label">Imagem</label>
                                <input type="file" className="form-control" id="imagem"/>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="ativo"/>
                                <label className="form-check-label" htmlFor="ativo">Ativo</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSalvar}>Salvar</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeletar}>Deletar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}