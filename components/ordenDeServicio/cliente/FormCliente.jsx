import React, {useContext, useState} from 'react'
import {Input, AutoComplete} from 'antd'
import clienteContext from '../context/cliente/clienteContext'


const FormCliente = () => {

     //Extrae datos del context de cliente
     const clientesContext = useContext(clienteContext);
     const{agregarCliente} = clientesContext;
     

     //State del formulario
     const [cliente, guardarCliente] = useState({
          id: '', 
          nombre: '', 
          email: '',
          direccion: '',
          telefono: ''
     })

     //Destrucutring de cliente
     const{id,nombre,email,direccion,telefono} = cliente;

     //Valores del formulario
     const onChange = e => {

          guardarCliente({
               ...cliente,
               [e.target.name] : e.target.value
          })
     }

     const onSubmit = e => {          
          e.preventDefault();
          agregarCliente(cliente);
          console.log(cliente);         
     }
     
    

     return ( 
          <>
               <div className="clientForm">
                    <div className="titleLine titleMargin">
                         <p>Cliente</p>
                    </div>
                    <form 
                         onSubmit={onSubmit}
                    >
                    <Input.Group compact>
                         <Input
                              type="text"
                              style={{ width: '195px', margin: '0 2% 2% 0' }}
                              placeholder="Nombre"
                              name="nombre"
                              value={nombre}
                              onChange={onChange}
                              options={[{ value: 'text 1' }, { value: 'text 2' }]}
                         />
                         
                         <Input
                         type="number"
                              style={{ width: '195px', margin: '0 0 2% 0' }}
                              placeholder="Identificación"
                              name="id"
                              value={id}
                              onChange={onChange}
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