import React,{useState,useContext} from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const Descripcion = () => {

     const[description, setDescription] = useState('');
     console.log(description);

     const onChange = e => {
          setDescription(e.target.value);
     }
     return (  
          <>
                <div className="titleLine">
                    <p>Descripcion</p>
                </div>
                <TextArea showCount autoSize={false} style={{width:'400px', height: '200px'}}
                onChange={onChange}
                />
              
          </>
     );
}
 
export default Descripcion;