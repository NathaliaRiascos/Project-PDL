import React,{useReducer} from 'react';
import materialContext from './materialContext'
import materialReducer from './materialReducer'
import{ 
     AGREGAR_MATERIAL,
     AGREGAR_MATERIAL_USO,
     ELIMINAR_MATERIAL
}from '../../types'


const materialState = props => {
     const initialState = {
          materiales: [
               { ref: 55667, material: 'Lamina de aluminio', unitPrice: 100000, cantidad: 1, total: 100000 }
          ],
          materialesenuso: []
     }

     //Dispatch para ejecutar las acciones
     const [state, dispatch] = useReducer(materialReducer, initialState)

     const agregarMaterial = material => {
          dispatch({
               type: AGREGAR_MATERIAL,
               payload: material
          })
     }

     const agregarMaterialEnUso = material => {
          dispatch({
               type: AGREGAR_MATERIAL_USO,
               payload: material
          })
     }

     const eliminarMaterial = material =>{
          dispatch({
               type: ELIMINAR_MATERIAL,
               payload: material
          })
     }

     return(
          <materialContext.Provider
               value={{
                    materiales: state.materiales,
                    materialesenuso: state.materialesenuso,
                    agregarMaterial,
                    agregarMaterialEnUso,
                    eliminarMaterial
                   
                   
                    
               }}
          >
               {props.children}
          </materialContext.Provider>
     )

}
 
export default materialState;