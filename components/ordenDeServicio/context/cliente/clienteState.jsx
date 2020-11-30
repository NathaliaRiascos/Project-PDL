import React, {useReducer} from 'react'

import clienteReducer from './clienteReducer'
import clienteContext from './clienteContext'
import {
     AGREGAR_CLIENTE,
     OBTENER_CLIENTES,
     BUSCAR_CLIENTE_ID,
     BUSCAR_CLIENTE_NOMBRE  
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

     //Busca cliente por id
     const buscarClienteId = id => {
          
          dispatch({
               type: BUSCAR_CLIENTE_ID,
               payload: id
          })
     }
    
     const buscarClienteNombre = nombre => {
          dispatch({
               type: BUSCAR_CLIENTE_NOMBRE,
               payload: nombre
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
                    buscarClienteId,
                    buscarClienteNombre
               }}
          >
               {props.children}
          </clienteContext.Provider>
     )
}

export default ClienteState;

