import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, BarChart2, Table2, RefreshCw } from 'lucide-react';
import { ChartContainer } from '../components/charts/ChartContainer';
import { exportRecordsToCSV } from '../utils/exportUtils';

export function OverallRecord() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'graph'>('table');
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('dailyRecords');
    return saved ? JSON.parse(saved) : [];
  });

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all records? This cannot be undone.')) {
      localStorage.removeItem('dailyRecords');
      setRecords([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/skills')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Scorecard</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode(viewMode === 'table' ? 'graph' : 'table')}
              className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 hover:text-violet-300 rounded-lg transition-colors ring-1 ring-violet-500/50"
            >
              {viewMode === 'table' ? (
                <>
                  <BarChart2 size={16} />
                  Show Graph
                </>
              ) : (
                <>
                  <Table2 size={16} />
                  Show Table
                </>
              )}
            </button>

            <button
              onClick={() => exportRecordsToCSV(records)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 rounded-lg transition-colors ring-1 ring-emerald-500/50"
            >
              <Download size={16} />
              Export CSV
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-colors ring-1 ring-red-500/50"
            >
              <RefreshCw size={16} />
              Reset Records
            </button>
          </div>
        </div>

        {viewMode === 'graph' ? (
          <div className="space-y-8">
            {records.length > 0 ? (
              <ChartContainer records={records} />
            ) : (
              <div className="py-12 text-center text-white/60">
                No records yet. Submit your daily scores to see them here!
              </div>
            )}
          </div>
        ) : (
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-slate-900/90">
                  <th className="p-4 text-left min-w-[200px] bg-slate-900/90 sticky left-0 z-10">
                    <span className="font-medium text-white">Metrics</span>
                  </th>
                  {records.map((record, index) => (
                    <th key={index} className="p-4 text-left min-w-[160px] font-medium text-white">
                      {record.date}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {/* Session Score */}
                <tr>
                  <td className="p-4 bg-slate-900/90 sticky left-0 z-10">
                    <span className="font-medium text-white">Session Score</span>
                  </td>
                  {records.map((record, index) => (
                    <td key={index} className="p-4 bg-slate-900/50">
                      <span className="text-yellow-400 font-medium">{record.sessionScore}</span>
                    </td>
                  ))}
                </tr>

                {/* Shadow Score */}
                <tr>
                  <td className="p-4 bg-slate-900/90 sticky left-0 z-10">
                    <span className="font-medium text-white">Shadow Score</span>
                  </td>
                  {records.map((record, index) => (
                    <td key={index} className="p-4 bg-slate-900/50">
                      <span className="text-gray-400 font-medium">{record.shadowScore}</span>
                    </td>
                  ))}
                </tr>

                {/* Individual Skills */}
                {Object.keys(records[0]?.skills || {}).map(skillName => (
                  <tr key={skillName}>
                    <td className="p-4 bg-slate-900/90 sticky left-0 z-10">
                      <span className="font-medium text-white">
                        {skillName.charAt(0).toUpperCase() + skillName.slice(1)}
                      </span>
                    </td>
                    {records.map((record, index) => (
                      <td key={index} className="p-4 bg-slate-900/50">
                        <span className="font-medium text-blue-400">
                          {record.skills?.[skillName] || 0}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Competition Scores */}
                <tr>
                  <td className="p-4 bg-slate-900/90 sticky left-0 z-10">
                    <span className="font-medium text-white">Amarie Score</span>
                  </td>
                  {records.map((record, index) => (
                    <td key={index} className="p-4 bg-slate-900/50">
                      <span className={`font-medium ${
                        record.competitiveScores.amarie >= record.competitiveScores.adam
                          ? 'text-emerald-400'
                          : 'text-white/60'
                      }`}>
                        {record.competitiveScores.amarie}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 bg-slate-900/90 sticky left-0 z-10">
                    <span className="font-medium text-white">Adam Score</span>
                  </td>
                  {records.map((record, index) => (
                    <td key={index} className="p-4 bg-slate-900/50">
                      <span className={`font-medium ${
                        record.competitiveScores.adam >= record.competitiveScores.amarie
                          ? 'text-violet-400'
                          : 'text-white/60'
                      }`}>
                        {record.competitiveScores.adam}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            {records.length === 0 && (
              <div className="py-12 text-center text-white/60">
                No records yet. Submit your daily scores to see them here!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}