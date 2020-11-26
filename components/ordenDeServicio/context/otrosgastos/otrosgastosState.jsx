import React,{useReducer} from 'react'
import otrosgastosContext from './otrosgastosContext'
import otrosgastosReducer from './otrosgastosReducer'
import { v4 as uuidv4 } from 'uuid';
import {
     AGREGAR_GASTOS,
     ELIMINAR_GASTO
 
} from '../../types'


const otrosgastosState = props => {
     
     const initialState = {
          otrosgastos: [],
          listagastos: []
     }

     //Dispath para ejecutar las acciones
     const [state, dispatch] = useReducer(otrosgastosReducer, initialState)

     const agregarGastos = gastos => {
          gastos.id = uuidv4();
          dispatch({
               type: AGREGAR_GASTOS,
               payload: gastos
          })
     }

     const eliminarGastos = id => {
          dispatch({
               type: ELIMINAR_GASTO,
               payload: id
          })
     }



     return(
          <otrosgastosContext.Provider
               value={{
                    otrosgastos: state.otrosgastos,
                    agregarGastos,
                    eliminarGastos
                    
               }}
          >
               {props.children}
          </otrosgastosContext.Provider>
     )
}
 
export default otrosgastosState;