import React, {useContext, useState, useEffect} from 'react'
import { Input, AutoComplete,Button } from 'antd';

import {PlusOutlined} from '@ant-design/icons';
import empleadoContext from '../context/empleado/empleadoContext'
import ListaEmpleado from './ListaEmpleado';
import {notificacion, camposVacios} from './../Notificacion';

const FormEmpleado = () => {

     //Extrae datos del context de empleado 

     const empleadosContext = useContext(empleadoContext);
     const{empleados,empleado,empleadoseleccionado, manodeobra, agregarEmpleado, buscarEmpleadoId, buscarEmpleadoNombre, agregarManoObra} = empleadosContext;


     //Opciones para mostrar en los inputs 

     const cedulas = [];
     empleados.forEach(empleado => {        
          cedulas.push({value: empleado.cedula})                  
     })

     const nombres = [];
     empleados.forEach(empleado => {        
          nombres.push({value: empleado.nombre})                  
     })
     
     
     //Guarda los nuevos empleados

     const[datosempleado, guardarEmpleado] = useState({
          cedula: '', 
          nombre: '', 
          pago: ''
     })

     const[resultadoBusqueda, guardarResultado] = useState({
          cedula_: '', 
          nombre_: '', 
          pago_: ''
     })


     //Destructuring

     const{cedula, nombre, pago} = datosempleado;
     const{cedula_, nombre_, pago_} = resultadoBusqueda;

     //Extraen todos los valores del input

     const onName = valor=> {

          //Evalua si el nombre contiene numeros
          let isNumber = false;
          const numeros="0123456789";
          for(let i=0; i<valor.length; i++){
               if (numeros.indexOf(valor.charAt(i),0)!=-1){
                    isNumber = true;
               }
            }
  
          if(isNumber){
               notificacion('error','El nombre no puede tener numeros')
               return;
          }

          //Si no contiene números guarda los datos
          buscarEmpleadoNombre(valor);
          guardarEmpleado({
               ...datosempleado,
               nombre: valor
          })
     }

     const onId = e => { 
          const valor = Number(e);

          if(isNaN(valor)){      
               errorInput(e,'Solo campos numericos');
               return;
          }
               buscarEmpleadoId(valor);
               
               guardarEmpleado({
                    ...datosempleado,
                    cedula: valor
               })        
     }

     const onPago = e => { 

          const valor = Number(e.target.value);
          
          if(isNaN(valor)){      
               errorInput(e,'Solo campos numericos');
               return;
          }

          guardarEmpleado({
               ...datosempleado,
          [e.target.name]: valor
          })
     }

     //Validaciones

     //Evalua si se encuentra el empleado al hacer la busqueda
     const existeRetorno = () => {
          if(empleado !== null){
               if(empleado[0]  !== undefined){                  
                    return true;
               }else{
                    return false;
               }              
          }              
     }

     //Evalua si se selecciono un empleado en la lista
     const haySeleccion = () => {
          if(empleadoseleccionado !== null){             
               return true;
          }else{
               return false;
          }
     }

     //Si alguna de las validaciones anteriores da true 
     //guarda los datos en resultado

     const cambiarValores = () => {
          if(existeRetorno()){
               guardarResultado({
                    ...resultadoBusqueda,
                    nombre_: empleado[0].nombre,
                    cedula_: empleado[0].cedula,
                    pago_: empleado[0].pago
               })
          }
          if(haySeleccion()){
               guardarResultado({
                   ...resultadoBusqueda,
                    nombre_: empleadoseleccionado.nombre,
                    cedula_: empleadoseleccionado.cedula,
                    pago_: empleadoseleccionado.pago
               })
          }
     }
     
     //Evalua si hubo una seleccion en la lista 
     //o si se hizo una respectiva busqueda 
     //Para cambiar los valores en input
     const hayResultado = () =>{
          if(existeRetorno() || haySeleccion()){
               return true;
          }else{
               return false
          }       
     } 


     //Validación general 

     const onSubmit = e => {

          e.preventDefault();
          
          //Si los campos estan vacios parará la ejecución

          if(cedula === '' || nombre === ''|| pago === '' ){  
               if(cedula_ === '' || nombre_ === ''|| pago_ === '' ){ 
                    camposVacios();            
                    return;
               }
          }
         
         //Comprobar existencia del empleado
         let existe = false;
     
         if(existeRetorno() === true){

              //Comprobar existencia en mano de obra
               manodeobra.find(e => {
                    if(e.cedula === empleado[0].cedula){
                         existe = true;
                    }
               });

               //Si existe lo agrega a  mano de obra
               if(existe === false){
                    agregarManoObra(empleado[0]);
               }
               
         }else{
          
               //Comprobar existencia en mano de obra
               manodeobra.find(e => {
                    if(e.cedula === cedula){
                         existe = true;
                    }
               });

               //Si existe lo agrega a empleados y a mano de obra
               if(existe === false){
                    agregarEmpleado(datosempleado);
               }
        
               //Resetea el formulario
               guardarEmpleado({
                    ...datosempleado,
                    nombre: '',
                    cedula: '',
                    pago: ''
               })

               guardarResultado({
                    ...resultadoBusqueda,
                     nombre_:'',
                     cedula_: '',
                     pago_: ''
                })
          }
           
     }
     
     
     useEffect(() => {
          cambiarValores()
          //console.log(empleado);
          //console.log(resultadoBusqueda);
         // console.log(hayResultado());
     },[empleado, empleadoseleccionado])
     
     return ( 
          <>
               
               <div className="titleLine">
                    <p>Empleados</p>
                </div>
                <div className="table">
                     <form>
                         <Input.Group 
                              style={{display: 'flex'}}>
                              
                              <AutoComplete
                              
                              style={{ width: '140px', margin: '0 2% 2% 0' }}
                              placeholder="Cedula"
                              value={(hayResultado())? cedula_:cedula}
                              onChange={e=> {
                                   onId(e);
                                   
                                  // cambiarValores();
                              }}
                         
                              options={cedulas}
                              allowClear={true}
                              />

                              <AutoComplete
                             
                              //value={inputRef.current}
                              value={(hayResultado())? nombre_: nombre}
                              style={{ width: '195px', margin: '0 2% 2% 0' }}
                              placeholder="Nombre"
                              //value={e => {(hayResultado)? nombre_: e}}
                              //value={(hayResultado())? nombre_ : nombre}
                              onChange={e => {
                                   onName(e);
                                   
                              }}  
                              allowClear={true}                         
                              //options={nombres}   
                              />

                              <Input
                              value={(hayResultado())? pago_: pago}
                              style={{ width: '190px', margin: '0 5% 2% 0' }}
                              placeholder="Pago"
                              id="pago"
                              name="pago"
                              onChange={onPago}
                              allowClear={true} 
                              />
                              
                              <Button type="primary" shape="circle" icon={<PlusOutlined /
                                   
                              >} onClick={onSubmit} />
                              
                         </Input.Group>
                    </form>
               
                <ListaEmpleado />
               </div> 
               
          </>
     );
}
 
export default FormEmpleado;