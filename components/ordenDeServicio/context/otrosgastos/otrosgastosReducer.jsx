import React from 'react'
import {
     AGREGAR_GASTOS,
     ELIMINAR_GASTO
 
} from '../../types'

export default (state, action) => {
     switch(action.type){
     
          case AGREGAR_GASTOS:
               return{
                    ...state,
                    otrosgastos: [...state.otrosgastos, action.payload]
               }
          case ELIMINAR_GASTO:
               return{
                    ...state,
                    otrosgastos: state.otrosgastos.filter(gastos => gastos.id !== action.payload)
               }
          default:
               return state;
     }
}