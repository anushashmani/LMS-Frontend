import React from 'react';
import { Tabs } from 'antd';
import Layout from '@/Components/Sidebar/Layout';
import AnnouncementForm from './components/AnnouncementForm'
import AnnouncementList from './components/AnnouncementList'
import { PersonalAnnouncementPage } from './components/PersonalAnnouncement';

const onChange = (key) => {
    console.log(key);
};

export const Announcement = () => {
    const items = [
        {
            key: '1',
            label: 'Announcemen',
            children: <AnnouncementList />,
        },
        {
            key: '2',
            label: 'Create Announcement',
            children: <AnnouncementForm />,
        },
        {
            key: '3',
            label: 'Class Announcement',
            children: <PersonalAnnouncementPage />,
        },
    ];

    return (
        <>
            <Layout />
           <div className='mx-10'>
           <Tabs defaultActiveKey="1" onChange={onChange}>
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
