import { useState, useEffect } from 'react';
import { DailyRecord } from '../types/records';
import { skillRecordService } from '../services/skillRecordService';

export function useSkillRecords() {
  const [records, setRecords] = useState<DailyRecord[]>(() => 
    skillRecordService.getDailyRecords()
  );

  const addRecord = (record: DailyRecord) => {
    skillRecordService.saveDailyRecord(record);
    setRecords(prev => [...prev, record]);
  };

  return {
    records,
    addRecord
  };
}