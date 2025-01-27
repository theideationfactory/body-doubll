import { Need } from '../types/needs';

export const defaultNeeds: Need[] = [
  {
    id: 'bathroom',
    name: 'Do you need to use the bathroom?',
    emoji: '🚽',
    checkInOptions: [
      'I need to use the bathroom',
      'I need to check if I need to use the bathroom',
      'I should try to use the bathroom'
    ],
    priority: 1
  },
  {
    id: 'hydration',
    name: 'Are you thirsty?',
    emoji: '💧',
    checkInOptions: [
      'I need to drink water',
      'I need to check my water bottle',
      'I should try to drink some water'
    ],
    priority: 1
  },
  {
    id: 'hunger',
    name: 'Are you hungry?',
    emoji: '🍽️',
    checkInOptions: [
      'I need to eat something',
      'I need to check if I\'m hungry',
      'I should try to eat something'
    ],
    priority: 1
  },
  {
    id: 'movement',
    name: 'Do you feel stiff or need to move?',
    emoji: '🏃‍♂️',
    checkInOptions: [
      'I need to stretch',
      'I need to walk around',
      'I need to change positions',
      'I need to exercise'
    ],
    priority: 2
  },
  {
    id: 'sensory',
    name: 'Is your environment comfortable?',
    emoji: '👀',
    checkInOptions: [
      'I need to adjust lighting',
      'I need to adjust temperature',
      'I need to adjust sound',
      'I need to adjust clothing',
      'I need to adjust seating'
    ],
    priority: 2
  },
  {
    id: 'rest',
    name: 'Do you need a break?',
    emoji: '😴',
    checkInOptions: [
      'I need to take a break',
      'I need to lie down',
      'I need to close my eyes',
      'I need to reduce stimulation'
    ],
    priority: 2
  },
  {
    id: 'productivity',
    name: 'Have you checked your schedule?',
    emoji: '📊',
    checkInOptions: [
      'I need to check my calendar',
      'I need to check my to-do list',
      'I need to set a timer',
      'I need to break down my tasks'
    ],
    priority: 3
  },
  {
    id: 'social',
    name: 'How are your social needs?',
    emoji: '👥',
    checkInOptions: [
      'I need social interaction',
      'I need alone time',
      'I need to communicate a boundary',
      'I need to ask for help'
    ],
    priority: 3
  },
  {
    id: 'emotional',
    name: 'How are you feeling emotionally?',
    emoji: '❤️',
    checkInOptions: [
      'I need emotional support',
      'I need to process feelings',
      'I need to self-soothe',
      'I need to express myself'
    ],
    priority: 2
  },
  {
    id: 'environment',
    name: 'Does your space need attention?',
    emoji: '🏠',
    checkInOptions: [
      'I need to tidy my space',
      'I need to organize',
      'I need to adjust my environment',
      'I need a change of scenery'
    ],
    priority: 3
  },
  {
    id: 'medication',
    name: 'Have you taken your medication?',
    emoji: '💊',
    checkInOptions: [
      'I need to take medication',
      'I need to check if I took medication',
      'I need to refill medication'
    ],
    priority: 1
  },
  {
    id: 'hygiene',
    name: 'Do you need to freshen up?',
    emoji: '🚿',
    checkInOptions: [
      'I need to shower',
      'I need to brush teeth',
      'I need to wash hands',
      'I need to change clothes'
    ],
    priority: 2
  }
];