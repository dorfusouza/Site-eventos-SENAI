import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Modal from 'bootstrap/js/dist/modal';

export const ValidateButton = ({ id, validate, status, setSuccessMessage, setErrorMessage }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleValidate = () => {
        setShowConfirmationModal(true);
    };

    const handleConfirmValidation = () => {
        validate(id);
        setShowConfirmationModal(false);
    };

    useEffect(() => {
        const modal = new Modal(document.getElementById(`confirmationModal-${id}`));
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                            Tem certeza de que deseja {
                                status === 'Validado' ? 'invalidar' : status === 'Pendente' ? 'validar ' : 'invalidar '
                            } o pedido?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
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
};
