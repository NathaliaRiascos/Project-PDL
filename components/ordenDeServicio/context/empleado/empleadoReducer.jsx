import React from 'react'
import {
     AGREGAR_EMPLEADO,
     OBTENER_EMPLEADOS,
     BUSCAR_EMPLEADO_ID,
     COMPROBAR_BUSQUEDA,
     BUSCAR_EMPLEADO_NAME,
     AGREGAR_MANO_OBRA,
     ELIMINAR_EMPLEADO,
     EMPLEADO_ACTUAL,
     ACTUALIZAR_DATOS_EMPLEADO
 
} from '../../types'

export default (state, action) => {
     switch(action.type){
          case AGREGAR_EMPLEADO:
               return{
                    ...state,
                    empleados: [...state.empleados, action.payload],
                    manodeobra: [...state.manodeobra, action.payload],
                    errorformulario: false,  
                    empleadoseleccionado: null,
                 
                                
               }
          case BUSCAR_EMPLEADO_ID:
               return{
                    ...state,
                    empleado: state.empleados.filter(empleado => empleado.cedula === action.payload),
                    empleadoseleccionado: null
                   
               }
          case BUSCAR_EMPLEADO_NAME:
               return{
                    ...state,
                    empleado: state.empleados.filter(empleado => empleado.nombre === action.payload),
                    empleadoseleccionado: null
                    
               }
          case AGREGAR_MANO_OBRA:
               return{
                    ...state,
                    manodeobra: [...state.manodeobra, action.payload],
                    empleadoseleccionado: null
                   
               }
          case ELIMINAR_EMPLEADO:
               return{
                    ...state,
                    manodeobra: state.manodeobra.filter(empleado => empleado.cedula !== action.payload),
                    empleadoseleccionado: null
                    

               }
          case ACTUALIZAR_DATOS_EMPLEADO:
               return{
                    ...state,
                    empleados: state.empleados.map(empleado => empleado.cedula === action.payload.cedula ? action.payload: empleado)
                   
               }
          case EMPLEADO_ACTUAL:
               return{
                    ...state,
                    empleadoseleccionado: action.payload,
                    
               }
               default:
                    return state;
          }
}