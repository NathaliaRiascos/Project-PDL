import React,{useContext} from 'react';
import { Table } from 'antd';
import {MinusCircleOutlined, EditOutlined } from '@ant-design/icons';
import otrosgastosContext from '../../ordenDeServicio/context/otrosgastos/otrosgastosContext';

const ListaGastos = () => {

     //Extraer proyectos del state inicial
     const OtrosgastosContext = useContext(otrosgastosContext);
     const{otrosgastos, eliminarGastos} = OtrosgastosContext;

     const columns = [

          {title: 'Descripción', dataIndex: 'descripcion',width: '60%',},
          {title: 'Precio',dataIndex: 'precio',width: '30%',},
          {title: '', dataIndex: '',
          render: (text, record) => otrosgastos.length >= 1 ? (
               <MinusCircleOutlined 
                    //className="espacio"
                    style={{ color: 'red', margin: '0 2% 2% 0' }}
                    onClick={() => eliminarGastos(record.id)}
               />
               
               ):null
          }
          ];

     const data = [];
      if(otrosgastos !== null){
          otrosgastos.forEach(otros => {        
                    data.push({id: otros.id, descripcion: otros.descripcion, precio: otros.precio})                  
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
 
export default ListaGastos;