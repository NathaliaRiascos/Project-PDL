import React, {useContext, useState, useEffect,useMemo, useCallback} from 'react'
import {Input, AutoComplete} from 'antd'
import clienteContext from '../context/cliente/clienteContext'
import clienteState from '../context/cliente/clienteState';


const FormCliente = () => {

     //Extrae datos del context de cliente
     const clientesContext = useContext(clienteContext);
     const{clientes, obtenerClientes, } = clientesContext;
     
     
     //State del formulario
     const [datoscliente, guardarCliente] = useState({
          id: '', 
          nombre: '',
          email: '',
          direccion: '',
          telefono: ''
     })

     //Destrucutring de cliente
     const{id, nombre, email,direccion,telefono} = datoscliente;

     //Valores del formulario
     
     /*useEffect(() => {
          if(id !== '' && nombre !== '' ){
               agregarCliente(datoscliente);
               //console.log(clientes)
          }
     });
     */
     useEffect(() => {
          if(id !== '' && nombre !== '' && email !== '' && direccion !== '' && telefono !== '' ){
               agregarCliente(datoscliente);
               console.log(clientes)
          }
    })
    
     const onChange = e => {  
                    
          guardarCliente({
               ...datoscliente,
               [e.target.name] : e.target.value
          })
     }
     
     const onName = value => {
          guardarCliente({
               ...datoscliente,
               nombre: value
          })
     }

     const onId = value => {
          guardarCliente({
               ...datoscliente,
               id: value
          })
     }
     
     /*
     const validar = e => {
          e.preventDefault();
          
           if(id !== '' && nombre !== '' && email !== '' && direccion !== '' && telefono !== '' ){
               agregarCliente(datoscliente);
               console.log(clientes)
          }
          
     }
     */
  
   
     return ( 
          <>
               <div className="clientForm">
                    <div className="titleLine titleMargin">
                         <p>Cliente</p>
                    </div>
                    <form 
                       //onSubmit={validar}
                    >
                    <Input.Group compact>
                         <AutoComplete
                              style={{ width: '195px', margin: '0 2% 2% 0' }}
                              placeholder="Nombre"
                              onChange={onName}
                              
                              
                              options={[{ value: 'text 1' }, { value: 'text 2' }]}
                         />
                         
                         <AutoComplete
                              style={{ width: '195px', margin: '0 0 2% 0' }}
                              placeholder="Identificación"
                              onChange={onId}
                              
                              options={[{ value: 'text 1' }, { value: 'text 2' }]}
                         /> 
                         <Input
                         type="text"
                              style={{ width: '195px', margin: '0 2% 2% 0' }}
                              name="direccion"
                              value={direccion}
                              onChange={onChange}
                              placeholder="Dirección"
                         />
                         <Input
                         type="number"
                              style={{ width: '195px', margin: '0 0 2% 0' }}
                              value={telefono}
                              name="telefono"
                              onChange={onChange}
                              placeholder="Teléfono"
                         />
                         <Input
                         type="email"
                              style={{ width: '195px', margin: '0 2% 2% 0' }}
                              name="email"
                              value={email}
                              onChange={onChange}
                              placeholder="Correo Electronico"
                         />    
                         <input type="submit" value="Enviar"/>        
                    </Input.Group>
                    </form>
               </div>
               
          </>
     );
}
 
export default FormCliente;