import React, {useContext} from 'react';
import { Table } from 'antd';
import {MinusCircleOutlined, EditOutlined } from '@ant-design/icons';
import materialContext from '../../ordenDeServicio/context/materiales/materialContext';

const ListaMateriales = () => {

     //Extraer proyectos del state inicial
     const materialesContext = useContext(materialContext);
     const {materialesenuso,eliminarMaterial} = materialesContext;
     
     const columns = [
          {title: 'Referencia', dataIndex: 'ref', width: 150,},
          {title: 'Material', dataIndex: 'material',width: 320,},
          {title: 'Precio Unitario',dataIndex: 'unitPrice', width: 200},
          {title: 'Cantidad',dataIndex: 'cant', width: 120},
          {title: 'Total',dataIndex: 'total', width: 200},
          {title: '', dataIndex: '',
          render: (text, record) => materialesenuso.length >= 1 ? (
               <EditOutlined 
                    //className="espacio"
                    style={{ margin: '0 2% 2% 0' }}
                    onClick={() => console.log('Click')}
               />
               
               ):null
          },
          {title: '', dataIndex: '',
          render: (text, record) => materialesenuso.length >= 1 ? (
               <MinusCircleOutlined 
                    //className="espacio"
                    style={{ color: 'red', margin: '0 2% 2% 0' }}
                    onClick={() => eliminarMaterial(record.material)}
               />
               
               ):null
          }
     ];
     
      const data = [];
      if(materialesenuso !== null){
          materialesenuso.forEach(uso => {        
                    data.push({key: uso.material, ref: uso.ref, material:  uso.material, unitPrice: uso.unitPrice, cant: uso.cantidad, total: uso.total})                  
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
 
export default ListaMateriales;