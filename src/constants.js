// Each D&D class (category) restricts which specializations are available,
// plus metadata used for stats and the success metric.
export const CLASSES = {
  Fighter: {
    color: '#c0392b',
    isCaster: false,
    isHealer: false,
    icon: '⚔️',
    specializations: ['Champion', 'Battle Master', 'Eldritch Knight'],
    blurb: 'A relentless master of weapons and armor who thrives on the front line.',
  },
  Wizard: {
    color: '#2980b9',
    isCaster: true,
    isHealer: false,
    icon: '🔮',
    specializations: ['Evocation', 'Abjuration', 'Necromancy'],
    blurb: 'A scholar of the arcane, bending raw magical energy to their will.',
  },
  Rogue: {
    color: '#7f8c8d',
    isCaster: false,
    isHealer: false,
    icon: '🗡️',
    specializations: ['Thief', 'Assassin', 'Arcane Trickster'],
    blurb: 'A cunning trickster who strikes from the shadows and picks any lock.',
  },
  Cleric: {
    color: '#f1c40f',
    isCaster: true,
    isHealer: true,
    icon: '✨',
    specializations: ['Life Domain', 'War Domain', 'Light Domain'],
    blurb: 'A divine channel of healing and holy power, the backbone of any party.',
  },
  Ranger: {
    color: '#27ae60',
    isCaster: false,
    isHealer: false,
    icon: '🏹',
    specializations: ['Hunter', 'Beast Master', 'Gloom Stalker'],
    blurb: 'A wilderness warrior, deadly with a bow and at home in the wilds.',
  },
  Bard: {
    color: '#9b59b6',
    isCaster: true,
    isHealer: true,
    icon: '🎵',
    specializations: ['College of Lore', 'College of Valor', 'College of Glamour'],
    blurb: 'A charismatic performer who weaves magic through music and words.',
  },
}

export const CLASS_NAMES = Object.keys(CLASSES)

// Levels are set by clicking one of several values (required feature)
export const LEVELS = [1, 3, 5, 8, 12, 16, 20]

export const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
]