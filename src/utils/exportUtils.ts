import { DailyRecord } from '../types/records';

export function exportRecordsToCSV(records: DailyRecord[]): void {
  const headers = ['Metric', ...records.map(r => r.date)];
  const metrics = [
    ['Session Score', ...records.map(r => r.sessionScore)],
    ['Shadow Score', ...records.map(r => r.shadowScore)],
    ['Amarie Score', ...records.map(r => r.competitiveScores.amarie)],
    ['Adam Score', ...records.map(r => r.competitiveScores.adam)],
    ...Object.keys(records[0]?.skills || {}).map(skillName => [
      skillName.charAt(0).toUpperCase() + skillName.slice(1),
      ...records.map(r => r.skills?.[skillName] || 0)
    ])
  ];

  const csvContent = [
    headers.join(','),
    ...metrics.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'overall_record.csv';
  link.click();
}