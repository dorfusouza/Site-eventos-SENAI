import propTypes from 'prop-types';

export function TabelaFiltro({ renderizarDados, tableFields }) {
    return (
        <div className='container'>
            <div className="table-responsive">
                <table className="table table-striped text-center mt-4">
                    <thead className="thead-dark">
                        <tr>
                            {tableFields.map((field, index) => (
                                <th key={index}>{field}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {renderizarDados()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

TabelaFiltro.propTypes = {
    renderizarDados: propTypes.func.isRequired,
    tableFields: propTypes.array.isRequired,
};

