import { v4 as uuidv4 } from 'uuid';

export interface BagItem {
  id: string;
  name: string;
  section?: string;
  checked: boolean;
  needsAttention: boolean;
}

export interface BagSection {
  id: string;
  name: string;
  items: BagItem[];
}

export interface Bag {
  id: string;
  name: string;
  sections?: BagSection[];
  items?: BagItem[];
  gradient: string;
  icon: string;
}

export const defaultBags: Bag[] = [
  {
    id: 'work-bag',
    name: 'Work Bag',
    gradient: 'from-blue-500 to-indigo-500',
    icon: '💼',
    sections: [
      {
        id: uuidv4(),
        name: 'Main Pocket',
        items: [
          { id: uuidv4(), name: 'Phone block', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'iPad', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Work cord', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Laptop', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Work phone', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Snacks', checked: false, needsAttention: false }
        ]
      },
      {
        id: uuidv4(),
        name: 'Medium Pocket',
        items: [
          { id: uuidv4(), name: 'Personal phone cord', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Wrist board and marker', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Work folder', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Six poker chips', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Client folders', checked: false, needsAttention: false }
        ]
      },
      {
        id: uuidv4(),
        name: 'Small Pocket',
        items: [
          { id: uuidv4(), name: 'Work badge', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'iPad pencil', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Client items', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Pencil folder', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Pen', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Note cards', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Laptop', checked: false, needsAttention: false }
        ]
      },
      {
        id: uuidv4(),
        name: 'Side Pocket',
        items: [
          { id: uuidv4(), name: 'Zipped work bag', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Water bottle', checked: false, needsAttention: false },
          { id: uuidv4(), name: 'Bag clip', checked: false, needsAttention: false }
        ]
      }
    ]
  },
  {
    id: 'gym-bag',
    name: 'Gym Bag',
    gradient: 'from-emerald-500 to-green-500',
    icon: '🏋️‍♂️',
    items: [
      { id: uuidv4(), name: 'Climbing shoes', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Gym shorts', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Gym shirt', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Towel', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Toiletry bag', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Tennis shoes', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Water bottle', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Fancy shirt', checked: false, needsAttention: false }
    ]
  },
  {
    id: 'murse',
    name: 'Murse',
    gradient: 'from-violet-500 to-purple-500',
    icon: '👝',
    items: [
      { id: uuidv4(), name: 'Phone battery pack', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Notebook', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Pen', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Cash', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Credit cards', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'ID', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Benadryl', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Retractable hook', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Hand sanitizer', checked: false, needsAttention: false },
      { id: uuidv4(), name: 'Chapstick', checked: false, needsAttention: false }
    ]
  }
];