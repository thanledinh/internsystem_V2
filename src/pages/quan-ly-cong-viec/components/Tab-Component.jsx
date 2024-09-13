import React from 'react';
import { Tabs } from 'antd';

const TabsComponent = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: <span>Tất cả</span>,
      children: <div>Content of Tab Pane 1</div>,
    },
    {
      key: '2',
      label: <span>Back-End</span>,
      children: <div>Content of Tab Pane 2</div>,
    },
    {
      key: '3',
      label: <span>Front-End</span>,
      children: <div>Content of Tab Pane 3</div>,
    },
    {
      key: '4',
      label: <span>Business Analyst</span>,
      children: <div>Content of Tab Pane 4</div>,
    },
    {
      key: '5',
      label: <span>Marketing</span>,
      children: <div>Content of Tab Pane 5</div>,
    },
    {
      key: '6',
      label: <span>Design</span>,
      children: <div>Content of Tab Pane 6</div>,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default TabsComponent;
