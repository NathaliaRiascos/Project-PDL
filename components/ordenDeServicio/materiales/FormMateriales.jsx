import React, {useState,useContext} from 'react'
import { Input, AutoComplete,Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Swal from 'sweetalert2';
import ListaMateriales from './ListaMateriales'
import materialContext from '../../ordenDeServicio/context/materiales/materialContext';

const FormMateriales = () => {

    //Extrae datos del context de materiales
    const materialesContext = useContext(materialContext);
    const{materiales,materialesenuso, agregarMaterial, agregarMaterialEnUso} = materialesContext;

    //
    const[material_, guardarMaterial] = useState({
        ref: '', 
        material: '', 
        unitPrice: 0, 
        cantidad: 0, 
        total: 0 
    })

    //Destructuring
    const{ref, material,unitPrice,cantidad,total} = material_;
  
    
    // Para mostrar el mensaje pequeño
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
    //Evalua si los input estan vacios
    const mostrarMensaje = () => {
        Swal.fire({
             icon: 'error',
             text: 'No pueden quedar campos sin llenar'
        })
    } 
      
    //Se mostrará si se ingresa un valor no permitido
    const errorInput = (value, texto) => {
        Toast.fire({
             icon: 'error',
             title: texto
        })
   }

   const existeRetorno = () => {
    if(materiales !== null){
         if(materiales[0]  !== undefined){                  
              return true;
         }else{
              return false;
         }              
    }              
}

   //Guarda el valor de cantidad, unitPrice y total
    const onChange = e => {
        const valor = Number(e.target.value);
          
          if(isNaN(valor)){      
               errorInput(e,'Solo campos numericos');
               return;
          }

        guardarMaterial({
            ...material_,
            [e.target.name] : valor
        })
    }

    //Guarda y valida dato de Material
    const onMaterial = e => {
        let isNumber = false;
        const numeros="0123456789";

        for(let i=0; i<e.length; i++){
            if (numeros.indexOf(e.charAt(i),0)!=-1){
                isNumber = true;
            }
        }

        //Si no es un número mostrará un mensaje y termina ejecución
        if(isNumber){
            errorInput(e,'El nombre no puede tener numeros');
            return;
        }
        //Al pasar la validación se guardara
        guardarMaterial({
            ...material_,
            material : e
        })
    }

    const onRef = e => {
        guardarMaterial({
            ...material_,
            ref : e
        })
    }

    //Validación general, aqui se guardarán los datos
    const onSubmit = e => {
        e.preventDefault();

         //Si los campos estan vacios parará la ejecución
         if(ref === '' || material === ''|| unitPrice === 0 
         || cantidad === 0 || total === 0){  
            
                 mostrarMensaje();
                 return;
          
       }

       let existe = false;
       
       //Comprobar existencia en materialesenuso
       materialesenuso.find(e => {
            if(e.material === material){
                existe = true;
            }
        });

        //Si no existe lo agrega a materiales y a materialesenuso
        if(existe === false){
            agregarMaterial(material_);
        }
       
    }


     return (  
          <>
          <div className="MaterialTable">
                <div className="titleLine">
                    <p>Materiales</p>
                </div>
                <div className="tabla" > 
                <form>
                    <Input.Group style={{display: 'flex'}}>
                        <AutoComplete
                            style={{ width: '150px', margin: '0 2% 2% 0' }}
                            placeholder="Referencia"
                            
                            onChange={onRef}
                        />
                        <AutoComplete
                            style={{ width: '350px', margin: '0 2% 2% 0' }}
                            placeholder="Material"
                            onChange={onMaterial}
                        />
                        <Input
                            style={{ width: '200px', margin: '0 2% 2% 0' }}
                            name='unitPrice'
                            value={unitPrice}
                            placeholder="Precio unit."
                            onChange={onChange}
                        />
                        <Input
                            style={{ width: '120px', margin: '0 2% 2% 0' }}
                            name='cantidad'
                            value={cantidad}
                            placeholder="Cant."
                            onChange={onChange}
                        />
                        <Input
                            style={{ width: '200px', margin: '0 10% 2% 0' }}
                            name='total'
                            value={total}
                            placeholder="Total"
                            onChange={onChange}
                            
                        />
                        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={onSubmit}/>
                    </Input.Group>
                </form>
                </div>
               <ListaMateriales />
          </div>
     </>
     );
}
 
export default FormMateriales;