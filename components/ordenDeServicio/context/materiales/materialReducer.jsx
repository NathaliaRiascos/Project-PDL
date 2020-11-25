import React from 'react'
import{ 
     AGREGAR_MATERIAL,
     AGREGAR_MATERIAL_USO,
     ELIMINAR_MATERIAL 
}from '../../types'

export default(state, action) => {
     switch(action.type){
          case AGREGAR_MATERIAL: 
               return{
                    ...state,
                    materiales: [...state.materiales, action.payload],
                    materialesenuso: [...state.materialesenuso, action.payload],
               }
          case AGREGAR_MATERIAL_USO:
               return{
                    ...state,
                    materialesenuso: [...state.materialesenuso, action.payload]
               }
          case ELIMINAR_MATERIAL: 
               return{
                    ...state,
                    materialesenuso: state.materialesenuso.filter(uso => uso.material !== action.payload),
               }
          default:
               return state;
     }
}