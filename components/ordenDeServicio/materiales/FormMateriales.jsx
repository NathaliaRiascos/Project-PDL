import React, {useState,useContext,useEffect} from 'react'
import { Input, AutoComplete,Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import {notificacion, camposVacios} from './../Notificacion';
import ListaMateriales from './ListaMateriales'
import materialContext from '../../ordenDeServicio/context/materiales/materialContext';

const FormMateriales = () => {

    //Extrae datos del context de materiales

    const materialesContext = useContext(materialContext);
    const{materiales,materialesenuso, agregarMaterial, agregarMaterialEnUso} = materialesContext;

    //Guardara el total 

    const[operacion, guardarOperacion] = useState('')

    //Datos material

    const[material_, guardarMaterial] = useState({
        ref: '', 
        material: '', 
        unitPrice: '', 
        cantidad: '', 
        total: ''
    })

    //Destructuring

    const{ref, material,unitPrice,cantidad} = material_;
  
   //Cada vez que se cargue va a calcular el total

    useEffect(() => {
        if(unitPrice !== 0 && cantidad !== 0){
            calcularTotal()    
        }      
    },)
     
    

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
            notificacion('error','Solo campos numericos');
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
            notificacion('error','El nombre no puede tener numeros');
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
    
    
    const calcularTotal = () => {
        const precio = Number(unitPrice);
        const cant = Number(cantidad);
        
        if(precio === 0 || cant === 0){        
            return;
        }  
          
        guardarOperacion(cant*precio);
        
    }
    

    //Validación general, aqui se guardarán los datos
    const onSubmit = e => {
        
        e.preventDefault();

        //Asigna el resultado de la operación al total
        material_.total = operacion
        
        //Si los campos estan vacios parará la ejecución
        if(ref === '' || material === ''|| unitPrice === '' 
        || cantidad === '' || material_.total === ''){              
            camposVacios();
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

        //Formatea el formulario
        operacion = ''
        guardarMaterial({
            ref: '', 
            material: '', 
            unitPrice: '', 
            cantidad: '', 
            total: ''
        })
       
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
                            value={operacion}
                            placeholder="Total"
                            
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