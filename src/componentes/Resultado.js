import React from 'react';

const Resultado = ({ resultado }) => {

    if (Object.entries(resultado).length === 0) {
        return null;
    }

    return (
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio">Precio: <span>{resultado.PRICE}</span></p>
            <p>Precio más alto del día: <span>{resultado.HIGHDAY}</span></p>
            <p>Precio más bajo del día: <span>{resultado.LOWDAY}</span></p>
        </div>
    );
}

export default Resultado;