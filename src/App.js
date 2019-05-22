import React, { Component } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './componentes/Formulario';
import axios from 'axios';
import Resultado from './componentes/Resultado';
import Spinner from './componentes/Spinner';

class App extends Component {
  state = {
    resultado: {},
    monedaSeleccionada: '',
    criptomonedaSeleccionada: '',
    cargando: false
  }

  cotizarCriptomoneda = async (cotizacion) => {
    // Optener los valores
    const { moneda, criptomoneda } = cotizacion;

    // Realizar consulta con axios a la api 
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          resultado: respuesta.data.DISPLAY[criptomoneda][moneda],
          cargando: true
        }, () => {
          setTimeout(() => {
            this.setState({ cargando: false })
          }, 3000);
        })
      });
  }

  render() {
    const resultado = (this.state.cargando) ?
      <Spinner />
      :
      <Resultado
        resultado={this.state.resultado} />

    return (
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={imagen} alt="Criptomonedas" className="logotipo" />
          </div>
          <div className="one-half column">
            <h1>Cotiza criptomonedas al instante</h1>
            <Formulario
              cotizarCriptomoneda={this.cotizarCriptomoneda} />
            {resultado}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
