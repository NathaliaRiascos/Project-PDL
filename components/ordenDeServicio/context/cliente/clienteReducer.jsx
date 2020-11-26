import React from 'react'
import {AGREGAR_CLIENTE,
     OBTENER_CLIENTES,
     BUSCAR_CLIENTE
     } from '../../types'

export default (state, action) => {
     switch(action.type){ 
          case AGREGAR_CLIENTE:
               return{
                    ...state,
                    clientes: [...state.clientes, action.payload],  
                    cliente: action.payload       
               }
          case OBTENER_CLIENTES:
               return{
                    ...state,
                    clientes: action.payload
               }
          case BUSCAR_CLIENTE:
               return{
                    ...state,
                    cliente: state.clientes.filter(cliente => cliente.id === action.payload)
                                    
               }
          default:
               return state;
     }
}