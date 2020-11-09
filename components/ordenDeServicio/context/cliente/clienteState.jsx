import React, {useReducer} from 'react'
import clienteReducer from './clienteReducer'
import clienteContext from './clienteContext'
import {
     AGREGAR_CLIENTE 
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
          errorformulario: false
     }

     //Dispath para ejecurtar las acciones
     const [state, dispatch] = useReducer(clienteReducer, initialState)

     //Agregar, obtener y mostrar clientes
     const agregarCliente = cliente => {

          //Insertar cliente al state
          dispatch({
               type: AGREGAR_CLIENTE,
               payload: cliente 
          })
     }
    
     return(
          <clienteContext.Provider
               value={{
                    clientes: state.clientes,
                    agregarCliente
               }}
          >
               {props.children}
          </clienteContext.Provider>
     )
}

export default ClienteState;

