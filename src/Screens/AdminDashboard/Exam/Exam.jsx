import React from 'react'
import CreateExam from './Components/CreateExam';
import ResultModal from './Components/Result';
import Layout from '@/Components/Sidebar/Layout';
import { Tabs } from 'antd';
import GetExams from './Components/GetExams';

const onChange = (key) => {
    console.log(key);
};

export const Exam = () => {
    const items = [
        {
            key: '1',
            label: 'Exam',
            children: <GetExams />,
        },
        {
            key: '2',
            label: 'Create Exam',
            children: <CreateExam />,
        },
        // {
        //     key: '3',
        //     label: 'Result',
        //     children: <ResultModal />,
        // },
    ];

    return (
        <>
            <Layout />
            <div className='mx-10'>
                <Tabs defaultActiveKey="1"
                 onChange={onChange}
                 tabBarStyle={{ color: '#0561a6' }}
                    tabBarActiveLineStyle={{ backgroundColor: '#0561a6' }}
                 >
                    {items.map(item => (
                        <Tabs.TabPane key={item.key} 
                        tab={<span className="text-[#0561a6]">{item.label}</span>}
                        >
                            {item.children}
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </div>
        </>
    );
}
