import React from "react";
import { Table } from 'antd';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}


const p2=(data,x) =>{
  return data.map(item=>item[x]).map(item=>({text:item,value:item}))
}

const p1=(data,x) =>{
  if(typeof x==="object")
  {
    return {
    title:x,
    dataIndex:x,
    sorter: (a, b) => JSON.stringify(a[x]).length - JSON.stringify(b[x]).length,
    sortDirections: ['descend'],
    }
  }
  
  else
  {
    return {
    title:x,
    dataIndex:x,
    filters:p2(data,x),
    onFilter: (value, record) => record[x].indexOf(value) === 0,
    sorter: (a, b) => a[x].length - b[x].length,
    sortDirections: ['descend'],
    }  
  }
}

function App(props) {
  let {data,cols}=props
  if(data?.length>0)
  {
    let columns=cols.map(x=>p1(data,x))
    return <Table columns={columns} dataSource={data} onChange={onChange} />;
  }
  else
  {
    return <h1>loading..</h1>
  }
}
export default App;
