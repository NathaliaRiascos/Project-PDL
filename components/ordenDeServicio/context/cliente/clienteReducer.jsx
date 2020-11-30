import React from 'react'
import {AGREGAR_CLIENTE,
     OBTENER_CLIENTES,
     BUSCAR_CLIENTE_ID,
     BUSCAR_CLIENTE_NOMBRE 
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
          case BUSCAR_CLIENTE_ID:
               return{
                    ...state,
                    cliente: state.clientes.filter(cliente => cliente.id === action.payload)                                  
               }
          case BUSCAR_CLIENTE_NOMBRE:
               return{
                    ...state,
                    cliente: state.clientes.filter(cliente => cliente.nombre === action.payload) 
               }
          default:
               return state;
     }
}