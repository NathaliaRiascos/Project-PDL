import React, {useContext, useState, useEffect} from 'react';
import { Table, Button, circle} from 'antd';
import {MinusCircleOutlined, EditOutlined } from '@ant-design/icons';
import empleadoContext from '../../ordenDeServicio/context/empleado/empleadoContext';


const ListaEmpleado = () => {


     //Extraer proyectos del state inicial
     const empleadosContext = useContext(empleadoContext);
     const {empleados, manodeobra, eliminarEmpleado, seleccionarEmpleado} = empleadosContext;
    

     const columns = [
          {title: 'Identificacion', dataIndex: 'cedula',  width: 150,},
          {title: 'Nombre', dataIndex: 'nombre', width: 205,},
          {title: 'Pago', dataIndex: 'pago', width: 195,},
          {title: '', dataIndex: '',
          render: (text, record) => manodeobra.length >= 1 ? (
               <EditOutlined 
                    //className="espacio"
                    style={{ margin: '0 2% 2% 0' }}
                    onClick={() => seleccionarEmpleado(record)}
               />
               
               ):null
          },
          {title: '', dataIndex: '',
          render: (text, record) => manodeobra.length >= 1 ? (
               <MinusCircleOutlined 
                    //className="espacio"
                    style={{ color: 'red', margin: '0 2% 2% 0' }}
                    onClick={() => eliminarEmpleado(record.cedula)}
               />
               
               ):null
          }
      ];


     const data = [];
     if(manodeobra !== null){
          manodeobra.forEach(mano => {        
                    data.push({cedula: mano.cedula, nombre:  mano.nombre, pago: mano.pago})                  
          })   
     }
     
    
     return ( 
          <> 
               <Table columns={columns}
                    dataSource={data}
                    showHeader={false}
                    scroll={{
                    y: 150  
                    }}
                    size='small'
                    pagination={false}
               />
          </>
     );
}
 
export default ListaEmpleado;