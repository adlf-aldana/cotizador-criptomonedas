import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
color: #FFF;
font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
font-size: 18px;
span{
    font-weight:bold;
}
`;
const Precio = styled.p`
font-size: 30px
`;

const Cotizacion = ({ resultado }) => {
    if (Object.keys(resultado).length === 0) return null;
    
    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El precio más alto del día es: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio más bajo del día es: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación las últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    );
}
Cotizacion.propTypes = {
    resultado: PropTypes.any.isRequired
};

export default Cotizacion;