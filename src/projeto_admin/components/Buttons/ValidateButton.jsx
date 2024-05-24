import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Modal from 'bootstrap/js/dist/modal';

export const ValidateButton = ({ id, validate, status, pedido}) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleValidate = () => {
        setShowConfirmationModal(true);
    };

    const handleConfirmValidation = () => {
        validate(id);
        setShowConfirmationModal(false);
    };

    useEffect(() => {
        const modal = new Modal(
            document.getElementById(`confirmationModal-${id}`),
            {
                keyboard: false,
                backdrop: 'static'
            }
        );

        if (showConfirmationModal) {
            modal.show();
        } else {
            modal.hide();
        }
    }, [showConfirmationModal, id]);

    return (
        <>
            <button
                type="button"
                className={
                    status === 'Validado' ? 'btn btn-success' : status === 'Pendente' ? 'btn btn-warning' : 'btn btn-danger'
                }
                id={id}
                onClick={handleValidate}
                disabled={status === 'Cancelado'}>
                {status === 'Validado' ? 'Validado' : status === 'Pendente' ? 'Pendente' : 'Cancelado'}
            </button>

            <div className="modal fade" id={`confirmationModal-${id}`} tabIndex="-1" aria-labelledby={`confirmationModalLabel-${id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`confirmationModalLabel-${id}`}>Confirmar {
                                status === 'Validado' ? 'Invalidação' : status === 'Pendente' ? 'Validação' : 'Invalidação'
                            }</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowConfirmationModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>
                            Tem certeza de que deseja {
                                status === 'Validado' ? 'invalidar' : status === 'Pendente' ? 'validar ' : 'invalidar '
                            } o pedido?
                            </p>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Pedido</h5>
                                    <p className="card-text">ID: {id}</p>
                                    <p className="card-text">Status: {status}</p>
                                    <p className="card-text">Data: {pedido.dataCadastro}</p>
                                    <p className="card-text">Total: {pedido.total}</p>
                                    <p className="card-text">Quantidade: {pedido.quantidade}</p>
                                    <p className="card-text">Forma de pagamento: {pedido.formaPagamento}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowConfirmationModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleConfirmValidation} data-bs-dismiss="modal">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ValidateButton.propTypes = {
    id: propTypes.number.isRequired,
    validate: propTypes.func.isRequired,
    status: propTypes.string.isRequired,
    pedido: propTypes.object.isRequired
};
