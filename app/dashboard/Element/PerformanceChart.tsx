'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const subjectColors = {
  Physics: 'green',
  Chemistry: 'red',
  Biology: 'blue',
  Mathematics: 'purple',
};

const defaultData = [
  {
    exam: 'Term 1',
    Physics: 0,
    Chemistry: 0,
    Biology: 0,
    Mathematics: 0,
  },
  {
    exam: 'Term 2',
    Physics: 0,
    Chemistry: 0,
    Biology: 0,
    Mathematics: 0,
  },
];

export default function PerformanceChart({ data = defaultData }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Science Student Exam Performance
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="exam" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(subjectColors).map((subject) => (
            <Line
              key={subject}
              type="monotone"
              dataKey={subject}
              stroke={subjectColors[subject]}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
