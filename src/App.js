import React from "react";
import Demo from './Demo'
import 'antd/dist/antd.css';
const url="https://jsonplaceholder.typicode.com/users"

export default function App() {
  const [a,seta]=React.useState([])
  const cols=["name","email","phone","username","website","id"]
  const subtotal=["id"]



  const [b,setb]=React.useState(cols)

  const abc=() =>fetch(url).then(d=>d.json()).then(d=>seta(d))
  React.useEffect(abc,[])

  const p1=(item,status) =>{
  	if(status)
  	{
  		setb(b.filter(x=>x!==item))
  	}
  	else
  	{
  		setb([...b,item])
  	}
  }
  return (
    <div>
    	{cols.map(x=>
    		<>
    			{x}
    			<input onClick={e=>p1(x,b.some(y=>y===x))} checked={b.some(y=>y===x)} type="checkbox"/>
    		</>
    	)}
      <Demo totals={subtotal} cols={cols.filter(x=>b.some(y=>y===x))} data={a} />
    </div>
  );
}
