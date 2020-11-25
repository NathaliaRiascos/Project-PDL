import React, {useReducer} from 'react'

import clienteReducer from './clienteReducer'
import clienteContext from './clienteContext'
import {
     AGREGAR_CLIENTE,
     OBTENER_CLIENTES,
     BUSCAR_CLIENTE 
}from '../../types'

const ClienteState = props => {
     const clientes = [
          { 
               id: 123456789, 
               nombre: 'Juan pérez', 
               email: 'correo@correo.com',
               direccion: 'cll 112 26K 120',
               telefono: '4235676' 
          }
     ]
     const initialState = {
          clientes: [],
          errorformulario: false,
          cliente: null
     }

     //Dispath para ejecutar las acciones
     const [state, dispatch] = useReducer(clienteReducer, initialState)

     //Agregar, obtener y mostrar clientes
     const agregarCliente = cliente => {
          
          //Insertar cliente al state
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

