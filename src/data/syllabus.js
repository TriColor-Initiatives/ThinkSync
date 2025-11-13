import { subjectId } from './curriculum'

export const syllabus = {
  6: {
    [subjectId('English')]: {
      summary: 'Build strong foundations in reading comprehension, grammar, and creative writing.',
      topics: [
        'Reading comprehension passages and poems',
        'Grammar essentials: nouns, pronouns, verbs, adjectives, adverbs',
        'Letter and diary writing formats',
        'Story writing and paragraph structuring',
        'Listening and speaking activities for pronunciation',
      ],
    },
    [subjectId('Hindi')]: {
      summary: 'Improve Hindi language skills through literature, grammar, and writing practice.',
      topics: [
        'Prose and poetry lessons from NCERT textbook',
        'Vyakaran: sangya, sarvanaam, kriya, visheshan',
        'Letter writing and application formats',
        'Anuchhed lekhan (paragraph writing)',
        'Bhasha kaushal (listening and speaking exercises)',
      ],
    },
    [subjectId('Maths')]: {
      summary: 'Understand key mathematical concepts with real-world examples and practice problems.',
      topics: [
        'Knowing our numbers & whole numbers',
        'Basic geometrical ideas',
        'Playing with numbers and factors',
        'Fractions and decimals',
        'Integers and introduction to algebra',
      ],
    },
    [subjectId('Science')]: {
      summary: 'Explore the world of science through experiments, observations, and critical thinking.',
      topics: [
        'Food: where does it come from?',
        'Components of food and separation of substances',
        'Body movements and living organisms',
        'Light, shadows, and reflection',
        'Electricity and circuits; water and air around us',
      ],
    },
    [subjectId('Social Science')]: {
      summary: 'Discover history, geography, and civics to understand our world and society.',
      topics: [
        'History: What, Where, How and When?',
        'Geography: The Earth in the Solar System',
        'Civics: Understanding Diversity and Government',
        'History: The earliest societies and first cities',
        'Geography: Maps, major landforms; Civics: Panchayati Raj',
      ],
    },
  },
}

export function getSyllabus(classId, subjectKey) {
  const classData = syllabus[classId]
  return classData ? classData[subjectKey] : undefined
}
