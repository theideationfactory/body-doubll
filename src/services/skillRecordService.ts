import { SkillScores, DailyRecord } from '../types/records';

export const skillRecordService = {
  getDailyRecords(): DailyRecord[] {
    const saved = localStorage.getItem('dailyRecords');
    return saved ? JSON.parse(saved) : [];
  },

  getCompetitiveScores() {
    const saved = localStorage.getItem('competitiveScores');
    return saved ? JSON.parse(saved) : { amarie: 0, adam: 0 };
  },

  saveDailyRecord(record: DailyRecord) {
    const records = this.getDailyRecords();
    localStorage.setItem('dailyRecords', JSON.stringify([...records, record]));
  },

  createDailyRecord(
    sessionScore: number,
    shadowScore: number,
    skillScores: SkillScores,
    customSkills: Array<{ name: string; points: number }>
  ): DailyRecord {
    // Create skills object with all current skill scores
    const skills = { ...skillScores };

    // Add custom skills if they exist
    customSkills.forEach(skill => {
      const key = skill.name.toLowerCase().replace(/\s+/g, '');
      skills[key] = skill.points;
    });

    return {
      date: new Date().toLocaleString(),
      sessionScore,
      shadowScore,
      competitiveScores: this.getCompetitiveScores(),
      skills
    };
  }
};