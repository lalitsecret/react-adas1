import React from "react";
import Demo from './Demo'
import 'antd/dist/antd.css';
const url="https://jsonplaceholder.typicode.com/users"

export default function App() {
  const [a,seta]=React.useState([])


  const abc=() =>fetch(url).then(d=>d.json()).then(d=>seta(d))
  React.useEffect(abc,[])
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <Demo cols={["id","name","email","phone","username","website"]} data={a} />
    </div>
  );
}
