import { Tabs } from 'antd';
import React from 'react'

const Attendence = () => {
  const onChange = (key) => {
    console.log(`Selected Tab: ${key}`);
  };

  const items = [
    {
      key: '1',
      label: 'Present',
      children: 'Content of Tab Enrolled',
    },
    {
      key: '2',
      label: 'Absence',
      children: 'Content of Tab Completed',
    },
    {
      key: '3',
      label: 'Leave',
      children: 'Content of Tab Pending',
    },
  ];

  return (

    <div>
      <h2>Attendence</h2>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>  
  )
}

export default Attendence;
