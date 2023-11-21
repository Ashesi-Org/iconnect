import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "SLE",
    Resolved: 4000,
    Pending: 2400,
    amt: 2400
  },
  {
    name: "Support",
    Resolved: 3000,
    Pending: 1398,
    amt: 2210
  },
  {
    name: "Academics",
    Resolved: 2000,
    Pending: 9800,
    amt: 2290
  },
  {
    name: "Finance",
    Resolved: 2780,
    Pending: 3908,
    amt: 2000
  },
  {
    name: "Logistics",
    Resolved: 3490,
    Pending: 4300,
    amt: 2100
  }
];

export default function StatusChart() {
  return (
    <BarChart
      width={500}
      height={350}
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Resolved" stackId="a" fill="#FF75A4" />
      <Bar dataKey="Pending" stackId="a" fill="#c9a0f4" />
    </BarChart>
  );
}
