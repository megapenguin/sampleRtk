import React, { Suspense } from "react";
import { SyncOutlined } from '@ant-design/icons';
import { StudentChartShit } from "../components/dashboard";

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div className="icons-list"><SyncOutlined spin/></div>}>
        <StudentChartShit />
      </Suspense>
    </div>
  );
}

export default Dashboard;
