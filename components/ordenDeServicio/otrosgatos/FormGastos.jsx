import React,{useContext, useState} from 'react';
import { Input, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Swal from 'sweetalert2';

import otrosgastosContext from '../context/otrosgastos/otrosgastosContext'
import ListaGastos from './ListaGastos'

const FormGastos = () => {

    //Extraer proyectos del state inicial
    const OtrosgastosContext = useContext(otrosgastosContext);
    const{otrosgastos,agregarGastos} = OtrosgastosContext;

    const[gastos, guardarGastos] = useState({
        descripcion: '', 
        precio: 0
    })

    //Destructuring
    const{descripcion, precio} = gastos;

    //Evalua si los input estan vacios
    const mostrarMensaje = () => {
        Swal.fire({
             icon: 'error',
             text: 'No pueden quedar campos sin llenar'
        })
   } 

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
  
  
const errorInput = (value, texto) => {
    //value.target.className = 'error'
    Toast.fire({
         icon: 'error',
         title: texto
    })

}
   //Extrae los valores del input y los guarda
    const onChange = e => {
  
         const valor = Number(e.target.value);
          
        if(isNaN(valor)){      
             errorInput(e,'Solo campos numericos');
             return;
        }
       
        guardarGastos({
            ...gastos,
            [e.target.name] : valor
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Si los campos estan vacios parará la ejecución
        if(descripcion === '' || precio === 0){            
                 mostrarMensaje();
                 return;
            }

        let existe = false;
       
        //Comprobar existencia en gastos
        otrosgastos.find(e => {
            if(e.descripcion === descripcion){
                existe = true;
            }
        });

        //Si no existe lo agrega a materiales y a materialesenuso
        if(existe === false){
            agregarGastos(gastos);
        }
       
                
         
    }
    
     return ( 
          <>
               <div className="titleLine">
                    <p>Otros gastos</p>
                </div>
                <Input.Group style={{display: 'flex'}}>
                    <Input
                        style={{ width: '70%', margin: '0 2% 2% 0' }}
                        name='descripcion'
                        value={descripcion}
                        onChange={e => {guardarGastos({
                                    ...gastos,
                                    [e.target.name] : e.target.value
                                 })}
                                }
                        placeholder="Descripcion"
                    />
                    <Input
                        name='precio'
                        className='precio'
                        value={precio}
                        style={{ width: '30%', margin: '0 2% 2% 0' }}
                        placeholder="Precio"
                        onChange={onChange}
                    />
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} 
                    onClick={onSubmit}/>
                </Input.Group>
                <ListaGastos />
          </>
      );
}
 
export default FormGastos;