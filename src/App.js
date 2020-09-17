import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const { ciudad, pais} = busqueda;
  const [resultado, guardarResultado] = useState({});

  const [ consultar, guardarConsultar] = useState(false);
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      if(consultar) {
        const appId = "2a492176e27d9de4dddc4922097514a2";
        const url = ` https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);
        if(resultado.cod === "404") {
          guardarError(true)
        } else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
  }, [consultar])
  let componente;
  if(error) {
    componente = <Error mensaje="La ciudad que buscaste no existe"/>
  } else {
    componente = <Clima 
      resultado={resultado}
    />
  }
  return (
    <Fragment>
      <Header
        titulo="Clima App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 sm12">
              <Form
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 sm12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
