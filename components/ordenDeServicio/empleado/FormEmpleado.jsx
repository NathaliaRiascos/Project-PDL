import React, {useContext, useState, useRef, useEffect} from 'react'
import { Input, AutoComplete,Button } from 'antd';
import Swal from 'sweetalert2';
import {PlusOutlined} from '@ant-design/icons';
import empleadoContext from '../context/empleado/empleadoContext'
import ListaEmpleado from './ListaEmpleado';

const FormEmpleado = () => {

     //Extrae datos del context de empleado

     const empleadosContext = useContext(empleadoContext);
     const{empleados,empleado,empleadoseleccionado, manodeobra, agregarEmpleado, buscarEmpleadoId, buscarEmpleadoNombre, agregarManoObra} = empleadosContext;

     //Optiones para mostrar en inputs

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
          cedula: 0, 
          nombre: '', 
          pago: 0
     })

     const[resultadoBusqueda, guardarResultado] = useState({
          cedula_: 0, 
          nombre_: '', 
          pago_: 0
     })

     //Destructuring

     const{cedula, nombre, pago} = datosempleado;

     const{cedula_, nombre_, pago_} = resultadoBusqueda;


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
          Toast.fire({
               icon: 'error',
               title: texto
          })

     }

     //Extraen los valores de los inputs

     const onName = valor=> {

          let isNumber = false;
          const numeros="0123456789";
          for(let i=0; i<valor.length; i++){
               if (numeros.indexOf(valor.charAt(i),0)!=-1){
                    isNumber = true;
               }
            }
  
          if(isNumber){
               errorInput(valor,'El nombre no puede tener numeros');
               return;
          }

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

     const existeRetorno = () => {
          if(empleado !== null){
               if(empleado[0]  !== undefined){                  
                    return true;
               }else{
                    return false;
               }              
          }              
     }

     const haySeleccion = () => {
          if(empleadoseleccionado !== null){             
               return true;
          }else{
               return false;
          }
     }

     /*
      guardarEmpleado({
                    ...datosempleado,
                    nombre: empleado[0].nombre,
                    cedula: empleado[0].cedula,
                    pago: empleado[0].pago
               })

               guardarEmpleado({
                    ...datosempleado,
                    nombre: empleadoseleccionado.nombre,
                    cedula: empleadoseleccionado.cedula,
                    pago: empleadoseleccionado.pago
               })

     guardarResultado({
                   ...resultadoBusqueda,
                   nombre_: empleado[0].nombre,
                   cedula_: empleado[0].cedula,
                   pago_: empleado[0].pago
              })

              guardarResultado({
                    ...resultadoBusqueda,
                    nombre_: empleadoseleccionado.nombre,
                    cedula_: empleadoseleccionado.cedula,
                    pago_: empleadoseleccionado.pago
               })
     */
   
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
     
     //console.log(existeRetorno(), haySeleccion(),resultadoBusqueda);
 
     const hayResultado = () =>{
          if(existeRetorno() || haySeleccion()){
               return true;
          }else{
               return false
          }
          /*if(cedula_ !== 0 || nombre_ !== ''|| pago_ !== 0 ){
               
               return true;
               
          }else{
               return false;
          }*/
     } 



     //Validación general 

     const onSubmit = e => {

          e.preventDefault();
          
          //Si los campos estan vacios parará la ejecución
          if(cedula === 0 || nombre === ''|| pago === 0 ){  
               if(cedula_ === 0 || nombre_ === ''|| pago_ === 0 ){             
                    mostrarMensaje();
                    return;
               }
          }
         
         
         let existe = false;

         //Comprobar existencia del empleado
         
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
        
               guardarEmpleado({
                    ...datosempleado,
                    nombre: '',
                    cedula: 0,
                    pago: 0
               })
          }
           
     }
     
     const inputRef = useRef();
    // const onClick = () => {
         /*
          const input = inputRef.current;

          if(hayResultado){
               inputRef.current = nombre_;
          }else{
               inputRef.current = nombre;
          }*/
         /* input.select();
          document.execCommand('copy');*/
          
    // }
     
     
     useEffect(() => {
          cambiarValores()
          console.log(empleado);
          console.log(resultadoBusqueda);
          console.log(hayResultado());
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