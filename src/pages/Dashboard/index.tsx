import React from 'react';
import { ResponsiveGrid } from '@alifd/next';

const { Cell } = ResponsiveGrid;

const Dashboard = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>hello world</Cell>
    </ResponsiveGrid>
  );
};

export default Dashboard;
