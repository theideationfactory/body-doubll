import React from 'react';
import { HighLevelMetricsChart } from './HighLevelMetricsChart';
import { SkillsBreakdownChart } from './SkillsBreakdownChart';
import type { DailyRecord } from '../../types/records';

interface ChartContainerProps {
  records: DailyRecord[];
}

export function ChartContainer({ records }: ChartContainerProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <HighLevelMetricsChart records={records} />
      </div>
      
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <SkillsBreakdownChart records={records} />
      </div>
    </div>
  );
}