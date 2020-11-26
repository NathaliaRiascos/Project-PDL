import React, {useReducer} from 'react'

import clienteReducer from './clienteReducer'
import clienteContext from './clienteContext'
import {
     AGREGAR_CLIENTE,
     OBTENER_CLIENTES,
     BUSCAR_CLIENTE 
}from '../../types'

const ClienteState = props => {
     const initialState = {
          clientes: [ 
               {    id: 123456789,
                    nombre: 'natha', 
                    email: 'correo@correo.com',
                    direccion: 'cll 11', 
                    telefono: 12234
               }
          ],
          cliente: null
     }

     //Dispath para ejecutar las acciones
     const [state, dispatch] = useReducer(clienteReducer, initialState)


     //Agregar, obtener y mostrar clientes
     //Insertar cliente al state
     const agregarCliente = cliente => {       
          dispatch({
               type: AGREGAR_CLIENTE,
               payload: cliente 
          })
     }

     //Obtener los clientes
     const obtenerClientes = ()  => {
          dispatch({
               type: OBTENER_CLIENTES,
               payload: clientes
          })
     }

     const buscarCliente = date => {
          //Busca cliente por nombre y id
          dispatch({
               type: BUSCAR_CLIENTE,
               payload: date
          })
     }
    
     return(
          <clienteContext.Provider
               value={{
                    clientes: state.clientes,
                    errorformulario: state.errorformulario,
                    cliente: state.cliente,
                    agregarCliente,
                    obtenerClientes,
                    buscarCliente
               }}
          >
               {props.children}
          </clienteContext.Provider>
     )
}

export default ClienteState;

