import React from "react";
import { Table, Typography } from 'antd';

const { Text } = Typography;

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
  let {data,cols,totals}=props
  const subtotalsofall=key=> data.map(x=>x[key]).reduce((sum,next) =>sum+next)
  if(data?.length>0)
  {
    let columns=cols.map(x=>p1(data,x))
    return <Table 
    columns={columns} 
    dataSource={data} 
    onChange={onChange}  
    summary={data => {
            let totalBorrow = 0;
            let totalRepayment = 0;

            // pageData.forEach(({ borrow, repayment }) => {
            //   totalBorrow += borrow;
            //   totalRepayment += repayment;
            // });

            return (
              <>
                <Table.Summary.Row>
                  {cols.map(x=>
                    <Table.Summary.Cell>
                      <Text>{totals.some(y=>y===x)?subtotalsofall(x):null}</Text>
                    </Table.Summary.Cell>
                    
                  )}
                </Table.Summary.Row>
              </>
            );
          }}

    />;
  }
  else
  {
    return <h1>loading..</h1>
  }
}
export default App;
