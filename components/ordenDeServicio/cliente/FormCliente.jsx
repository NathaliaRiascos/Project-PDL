import React, {useContext, useState, useEffect,useRef} from 'react'
import {Input, AutoComplete, Tooltip} from 'antd'
import Swal from 'sweetalert2';
import clienteContext from '../context/cliente/clienteContext'
import clienteState from '../context/cliente/clienteState';


const FormCliente = ({boton, activarBoton}) => {

     //Extrae datos del context de cliente
     const clientesContext = useContext(clienteContext);
     const{cliente,agregarCliente, buscarClienteNombre, buscarClienteId} = clientesContext;
     
     
     //State del formulario
     const [datoscliente, guardarCliente] = useState({
          id: 0, 
          nombre: '',
          email: '',
          direccion: '',
          telefono: 0
     })

     const[resultadoBusqueda, guardarResultado] = useState({
          id: 0, 
          nombre: '',
          email: '',
          direccion: '',
          telefono: 0
     })

     const [clase, setClase] = useState(false);

     //Destructuring de cliente
     const{id, nombre, email,direccion,telefono} = datoscliente;
    
     //Destructuring de busqueda
     const{id_, nombre_, email_,direccion_,telefono_} = resultadoBusqueda;

     useEffect(() => {
          if(boton === true){
               //validar();
              // if(id !== 0 && nombre !== '' && email !== '' && direccion !== '' && telefono !== 0 ){
                   // if(id_ !== 0 && nombre_ !== '' && email_ !== '' && direccion_ !== '' && telefono_ !== 0 ){
                        // cambiarValores()  
                       //  console.log('si coge')             
                         agregarCliente(datoscliente);
                   // }
          //}
          
               activarBoton(false);
          }
     })

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

     const onId = e => {
          
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

     const existeRetorno = () => {
          if(cliente !== null){
               if(cliente[0]  !== undefined){                  
                    return true;
               }else{
                    return false;
               }              
          }              
     }

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