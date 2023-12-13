import React, { FunctionComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
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

const CustomizedLabel = (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function StatusLineChart() {
  return (
    <LineChart
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
      <XAxis dataKey="name" height={50} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Resolved" stroke="#FF75A4">
        <LabelList content={<CustomizedLabel />} />
      </Line>
      <Line type="monotone" dataKey="Pending" stroke="#c9a0f4" />
    </LineChart>
  );
}
