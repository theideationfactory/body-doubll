import { Coffee, Droplet, Battery, Activity, Eye, Sun } from 'lucide-react';

export const needIcons = {
  hunger: Coffee,
  thirst: Droplet,
  fatigue: Battery,
  restless: Activity,
  focus: Eye,
  environment: Sun
} as const;