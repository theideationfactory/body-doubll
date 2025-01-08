export interface BasicNeed {
  id: string;
  title: string;
  icon: 'hunger' | 'thirst' | 'fatigue' | 'restless' | 'focus' | 'environment';
  gradient: string;
  actionText: string;
}