import React, {useContext, useState, useEffect,useRef} from 'react'
import {Input, AutoComplete, Tooltip} from 'antd'

import clienteContext from '../context/cliente/clienteContext'
import {notificacion} from './../Notificacion';


const FormCliente = ({boton, activarBoton}) => {

     //Extrae datos del context de cliente
     const clientesContext = useContext(clienteContext);
     const{cliente,agregarCliente, buscarClienteNombre, buscarClienteId} = clientesContext;
     
     
     //State del formulario
     const [datoscliente, guardarCliente] = useState({
          id: '', 
          nombre: '',
          email: '',
          direccion: '',
          telefono: ''
     })

     const[resultadoBusqueda, guardarResultado] = useState({
          id: '', 
          nombre: '',
          email: '',
          direccion: '',
          telefono: ''
     })

     const [clase, setClase] = useState(false);

     //Destructuring 

     const{id, nombre, email,direccion,telefono} = datoscliente;
     const{id_, nombre_, email_,direccion_,telefono_} = resultadoBusqueda;

     //Espera que se envie todos los datos de orden de servicio
     //para agregar los datos del cliente

     useEffect(() => {
          if(boton === true){
               //validar();
              // if(id !== 0 && nombre !== '' && email !== '' && direccion !== '' && telefono !== 0 ){
                   // if(id_ !== '' && nombre_ !== ''){
                    if(id !== '' && nombre !== ''){
                        // cambiarValores()  
                       //  console.log('si coge')             
                         agregarCliente(datoscliente);
                    }
          //}
          
               activarBoton(false);
          }
     })


     const onChange = e => {                
          guardarCliente({
               ...datoscliente,
               [e.target.name] : e.target.value
          })                    
     }
     
     const onName = value => {                
          buscarClienteNombre(value);
          guardarCliente({
               ...datoscliente,
               nombre: value
          })
     }

     const onId = e =>  {       
          const valor = Number(e);
          
          if(isNaN(valor)){      
               errorInput(e,'Solo campos numericos');
               return;
          }
          buscarClienteId(valor);
          guardarCliente({
               ...datoscliente,
               id: valor
          })
     }

     //Evalua si se encuentra el cliente al hacer la busqueda
     const existeRetorno = () => {
          if(cliente !== null){
               if(cliente[0]  !== undefined){                  
                    return true;
               }else{
                    return false;
               }              
          }              
     }

     //Si hay una coincidencia llena el resultado
     const cambiarValores = () => {
          if(existeRetorno()){
               guardarResultado({
                    ...resultadoBusqueda,
                    id_: cliente[0].id, 
                    nombre_: cliente[0].nombre,
                    email_: cliente[0].email,
                    direccion_: cliente[0].direccion,
                    telefono_:cliente[0].telefono
               })
          }
     }
    //console.log(cliente);
     /* CODIGO PARA COMPAR EL LABEL
    const onFocus = e =>{     
     
     if(e.target.value === null){
          console.log(typeof(e.target.value))
          //setClase(true);
         }else{
         // setClase(false);
         } 
    }

    const onBlur = e => {
         if(e.target.value !== null){
          console.log(typeof(e.target.value))
          //setClase(true);
         }else{
          //setClase(false);
         }        
    }
    */
    /* CUANDO LO RESUELVA 
     <label className={clase? 'active': 'no_active'}>Nombre</label>

     <label className={clase? 'active': 'no_active'}>Identificación</label>

      <label className={clase? 'active': 'no_active'}>Dirección</label>

      <label className={clase? 'active': 'no_active'}>Teléfono</label>
      <label className={clase? 'active': 'no_active'}>Correo electronico</label>  
    */
    /*
    const inputRef = useRef();
    const onFocus = e => {
          const input = inputRef.current;
          input.focus();

          console.log(input.value)
    }
    */

  
     return ( 
          <>
               <div className="clientForm">
                    <div className="titleLine titleMargin">          
                         <p>Cliente</p>
                    </div>
                    <Input.Group compact>
                                       
                         <AutoComplete
                              //value={(existeRetorno)? nombre_: nombre}
                              value={nombre}
                              style={{ width: '195px', margin: '0 2% 2% 0' }}                            placeholder="Nombre"                              
                             /* onFocus={e => onFocus(e)}
                              onBlur={e => onBlur(e)}*/
                              onChange={onName}
                              //options={[{ value: 'text 1' }, { value: 'text 2' }]}
                         />
                   
                         <AutoComplete
                              style={{ width: '195px', margin: '0 0 2% 0' }}
                              placeholder="Cédula"
                              /*onFocus={onFocus}
                              onBlur={onBlur}*/
                              //value={(existeRetorno)? id_: id}
                              value={id}
                              onChange={onId}
                              //options={[{ value: 'text 1' }, { value: 'text 2' }]}
                         /> 
                         
                    
                         <Input
                              type="text"
                              style={{ width: '195px', margin: '0 2% 2% 0' }}
                              name="direccion"
                              //value={(existeRetorno)? direccion_: direccion}
                              value={direccion}
                              /*onFocus={onFocus}
                              onBlur={onBlur}*/
                              onChange={onChange}
                              placeholder="Dirección"
                         />
                        
                    
                         <Input
                              type="number"
                              style={{ width: '195px', margin: '0 0 2% 0' }}
                              //value={(existeRetorno)? telefono_: telefono}
                              value={telefono}
                              name="telefono"
                             /* onFocus={onFocus}
                              onBlur={onBlur}*/
                              onChange={onChange}
                              placeholder="Teléfono"
                         />
                         
                         <Input
                              type="email"
                              style={{ width: '195px', margin: '0 2% 0 0' }}
                              name="email"
                              //value={(existeRetorno)? email_: email}
                              value={email}
                              /*onFocus={onFocus}
                              onBlur={onBlur}*/
                              onChange={onChange}
                              
                              placeholder="Correo Electronico"
                         />  
                         
                     
                    </Input.Group>
               </div>
               
          </>
     );
}
 
export default FormCliente;