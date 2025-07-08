'use client';

import PerformanceChart from '@/E';

export default function DashboardPage() {
  // Example fetched or static performance data
  const performanceData = [
    {
      exam: 'Term 1',
      Physics: 70,
      Chemistry: 60,
      Biology: 80,
      Mathematics: 75,
    },
    {
      exam: 'Term 2',
      Physics: 85,
      Chemistry: 65,
      Biology: 70,
      Mathematics: 88,
    },
  ];

  return (
    <main className="p-4">
      <PerformanceChart data={performanceData} />
    </main>
  );
}
