import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useMoneda from './Hooks/useMoneda';
import useCriptomoneda from './Hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;
border: none;
width: 100%;
border-radius: 10px;
color: #FFF;
transition: background-color .3& ease;

&:hover {
    background-color: #326AC0;
    cursor: pointer;
}
`;
const Formulario = () => {

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
    ]

    const [listacripto, guardarCriptomonedas] = useState([])
    // Extraer datos
    // Utilizar hook useMoneda
    // debe estar en el orden del return, 
    // no importa el nombre, puede ser el mismo o diferente
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda: ', '', MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto)
    const [error, seterror] = useState(false)

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI()
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();
        if (moneda === '' || criptomoneda === '') {
            seterror(true)
            return;
        }

        seterror(false)
    }

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <SelectMoneda />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcula" />
        </form>
    );
}

export default Formulario;