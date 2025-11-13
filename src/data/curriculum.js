function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const subjectId = (subject) => slugify(subject)
export const streamId = (stream) => slugify(stream)

const seniorSecondaryStreams = [
  {
    name: 'Arts',
    id: streamId('Arts'),
    subjects: ['English', 'Political Science', 'History', 'Geography', 'Sociology', 'Hindi'],
  },
  {
    name: 'Commerce',
    id: streamId('Commerce'),
    subjects: ['English', 'Accountancy', 'Business Studies', 'Economics', 'Maths', 'Hindi'],
  },
  {
    name: 'Non-Medical',
    id: streamId('Non-Medical'),
    subjects: ['English', 'Physics', 'Chemistry', 'Maths', 'Computer Science'],
  },
  {
    name: 'Medical',
    id: streamId('Medical'),
    subjects: ['English', 'Physics', 'Chemistry', 'Biology', 'Hindi'],
  },
]

const duplicateStreams = () =>
  seniorSecondaryStreams.map((stream) => ({
    ...stream,
    subjects: [...stream.subjects],
  }))

export const curriculum = {
  6: {
    type: 'subjects',
    subjects: ['English', 'Hindi', 'Maths', 'Science', 'Social Science'],
  },
  7: {
    type: 'subjects',
    subjects: ['English', 'Hindi', 'Maths', 'Science', 'Social Science'],
  },
  8: {
    type: 'subjects',
    subjects: ['English', 'Hindi', 'Maths', 'Science', 'Social Science'],
  },
  9: {
    type: 'subjects',
    subjects: ['English', 'Hindi', 'Maths', 'Science', 'Social Science'],
  },
  10: {
    type: 'subjects',
    subjects: ['English', 'Hindi', 'Maths', 'Science', 'Social Science'],
  },
  11: {
    type: 'streams',
    streams: duplicateStreams(),
  },
  12: {
    type: 'streams',
    streams: duplicateStreams(),
  },
}

export const classIds = Object.keys(curriculum).sort((a, b) => Number(a) - Number(b))

export function getClassStructure(classId) {
  const entry = curriculum[classId]
  if (!entry) {
    return { type: 'unknown', subjects: [], streams: [] }
  }
  if (entry.type === 'streams') {
    return { type: 'streams', streams: entry.streams }
  }
  return { type: 'subjects', subjects: entry.subjects || [] }
}

export function findStream(classId, streamKey) {
  const entry = curriculum[classId]
  if (!entry || entry.type !== 'streams') return undefined
  return entry.streams.find((stream) => stream.id === streamKey || streamId(stream.name) === streamKey)
}

export function findSubjectName(classId, subjectKey, streamKey) {
  const entry = curriculum[classId]
  if (!entry) return undefined

  if (entry.type === 'streams') {
    const streamsToSearch =
      streamKey != null
        ? entry.streams.filter((stream) => stream.id === streamKey || streamId(stream.name) === streamKey)
        : entry.streams

    for (const stream of streamsToSearch) {
      const match = stream.subjects.find((name) => subjectId(name) === subjectKey)
      if (match) return match
    }
    return undefined
  }

  return (entry.subjects || []).find((name) => subjectId(name) === subjectKey)
}
