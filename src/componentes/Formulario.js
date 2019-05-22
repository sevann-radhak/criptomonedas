import React, { Component } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

class Formulario extends Component {
    state = {
        criptomonedas: [],
        moneda: '',
        criptomoneda: '',
        error: false
    }

    async componentWillMount() {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

        await axios.get(url)
            .then(respuesta => {
                this.setState({ criptomonedas: respuesta.data.Data });
            })
    }

    // Se ejecuta cada vez que el usuario cambia de opción del select
    obtenerValor = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    // Validar que usuario elija las monedas
    cotizarModeda = (e) => {
        e.preventDefault();

        // Validar que haya elegido las monedas
        const { moneda, criptomoneda } = this.state;

        if (moneda === "" || criptomoneda === "") {
            this.setState({ error: true },
                () => {
                    setTimeout(() => {
                        this.setState({ error: false })
                    }, 3000);
                });

            return;
        }

        // Crear el objeto
        const cotizacion = { moneda, criptomoneda };

        // Enviar los datos al componente App
        this.props.cotizarCriptomoneda(cotizacion);
    }

    render() {
        const mensaje = (this.state.error) ? <Error mensaje="Ambos campos son obligatorios." /> : '';
        return (
            <form
                onSubmit={this.cotizarModeda}>

                {mensaje}

                <div className="row">
                    <label>Elige tu Moneda</label>
                    <select
                        name="moneda"
                        onChange={this.obtenerValor}
                        className="u-full-width">
                        <option value="">Elige tu moneda</option>
                        <option value="COP">Peso Colombianos</option>
                        <option value="USD">Dolar Estadounidense</option>
                        <option value="EUR">Euros</option>
                        <option value="GBP">Libras</option>
                        <option value="MXN">Peso Mexicano</option>
                    </select>
                </div>

                <div className="row">
                    <div>
                        <label>Elige tu Criptomoneda</label>
                        <select
                            name="criptomoneda"
                            onChange={this.obtenerValor}
                            className="u-full-width">
                            <option value="">Elige tu criptomoneda</option>
                            {Object.keys(this.state.criptomonedas).map(key => (
                                <Criptomoneda
                                    key={key}
                                    criptomoneda={this.state.criptomonedas[key]} />
                            ))}
                        </select>
                    </div>
                </div>
                <input className="button-primary u-full-width" type="submit" value="Cotizar" />
            </form>
        );
    }
}

export default Formulario;