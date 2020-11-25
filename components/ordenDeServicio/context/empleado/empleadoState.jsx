import React,{useReducer} from 'react'
import empleadoContext from './empleadoContext'
import empleadoReducer from './empleadoReducer'
import {
     AGREGAR_EMPLEADO,
     BUSCAR_EMPLEADO_ID,
     BUSCAR_EMPLEADO_NAME,
     AGREGAR_MANO_OBRA,
     ELIMINAR_EMPLEADO,
     EMPLEADO_ACTUAL,
     ACTUALIZAR_DATOS_EMPLEADO
 
} from '../../types'

const empleadoState = props => {
     const initialState = {
          empleados: [
               {cedula: 12356789, nombre: 'Nathalia', pago: 1000}
          ],
          empleado: null,
          empleadoseleccionado: null,
          manodeobra: [],
          //busquedahecha: false
     }

     //Dispath para ejecutar las acciones
     const [state, dispatch] = useReducer(empleadoReducer, initialState)

     const agregarEmpleado = empleado => {
          //Insertar cliente al state
          dispatch({
               type: AGREGAR_EMPLEADO,
               payload: empleado 
          })
     }

     const buscarEmpleadoId = id =>{
          dispatch({
               type: BUSCAR_EMPLEADO_ID,
               payload: id
          })
     }

     const buscarEmpleadoNombre = nombre =>{
          dispatch({
               type: BUSCAR_EMPLEADO_NAME,
               payload: nombre
          })
     }

     const agregarManoObra = empleado => {
          dispatch({
               type: AGREGAR_MANO_OBRA,
               payload: empleado

          })
     }
     
     const eliminarEmpleado = cedula => {
          dispatch({
               type: ELIMINAR_EMPLEADO,
               payload: cedula
          })
     }

     const seleccionarEmpleado = empleado => {
          dispatch({
               type: EMPLEADO_ACTUAL,
               payload: empleado
          })
     }

     const actualizarDatosEmpleado = empleado => {
          dispatch({
               type: ACTUALIZAR_DATOS_EMPLEADO,
               payload: empleado
          })
     }
     return(
          <empleadoContext.Provider
               value={{
                    empleados: state.empleados,
                    empleado: state.empleado,
                    errorformulario: state.errorformulario,
                    manodeobra: state.manodeobra,
                    empleadoseleccionado: state.empleadoseleccionado,
                    agregarEmpleado,
                    buscarEmpleadoId,
                    buscarEmpleadoNombre,
                    agregarManoObra,
                    eliminarEmpleado,
                    seleccionarEmpleado
                   
                    
               }}
          >
               {props.children}
          </empleadoContext.Provider>
     )

}
 
export default empleadoState;