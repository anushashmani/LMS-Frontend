import React from 'react';
import { Tabs } from 'antd';
import AssignmentList from './Components/AssignmentList';
import UploadAssignment from './Components/UploadAssignment';
import ReviewAssignment from './Components/ReviewAssignment';

const onChange = (key) => {
	console.log(key);
};

export const Assignment = () => {
    const items = [
        {
            key: '1',
            label: 'Assignment',
            children: <AssignmentList />,
        },
        {
            key: '2',
            label: 'Create Assignment',
            children: <UploadAssignment />,
        },
        {
            key: '3',
            label: 'Submitted Detail',
            children: <ReviewAssignment />,
        },
    ];

	return (
		<>
			<div className="mx-10">
				<Tabs
					defaultActiveKey="1"
					onChange={onChange}
					tabBarStyle={{ color: "#0561a6" }}
					tabBarActiveLineStyle={{ backgroundColor: "#0561a6" }}
				>
					{items.map((item) => (
						<Tabs.TabPane
							key={item.key}
							tab={<span className="text-[#0561a6]">{item.label}</span>}
						>
							{item.children}
						</Tabs.TabPane>
					))}
				</Tabs>
			</div>
		</>
	);
};
