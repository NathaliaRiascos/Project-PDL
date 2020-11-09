import React from 'react'
import {
     AGREGAR_CLIENTE
     } from '../../types'

export default (state, action) => {
     switch(action.type){
          case AGREGAR_CLIENTE:
               return{
                    ...state,
                    clientes: [...state.clientes, action.payload],
                     
               }
          default:
               return state;
     }
}