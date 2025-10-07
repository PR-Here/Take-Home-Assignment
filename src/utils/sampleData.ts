import {Cow, CowEvent, CowSex, CowStatus} from '../types/cow';

export const generateSampleCows = (): Cow[] => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  return [
    {
      id: '1',
      earTag: 'COW-001',
      sex: 'Female' as CowSex,
      pen: 'A1',
      status: 'Active' as CowStatus,
      weight: 450,
      dailyWeightGain: 1.2,
      createdAt: fourteenDaysAgo.toISOString(),
      lastEventDate: sevenDaysAgo.toISOString(),
      events: [
        {
          id: '1-1',
          type: 'Weight Check',
          date: sevenDaysAgo.toISOString(),
          description: 'Regular weight check',
          metadata: {weight: 450},
        },
        {
          id: '1-2',
          type: 'Created',
          date: fourteenDaysAgo.toISOString(),
          description: 'Cow COW-001 created',
        },
      ],
    },
    {
      id: '2',
      earTag: 'COW-002',
      sex: 'Male' as CowSex,
      pen: 'A1',
      status: 'In Treatment' as CowStatus,
      weight: 520,
      dailyWeightGain: 0.8,
      createdAt: fourteenDaysAgo.toISOString(),
      lastEventDate: now.toISOString(),
      events: [
        {
          id: '2-1',
          type: 'Treatment',
          date: now.toISOString(),
          description: 'Started antibiotic treatment',
          metadata: {treatmentType: 'Antibiotics'},
        },
        {
          id: '2-2',
          type: 'Created',
          date: fourteenDaysAgo.toISOString(),
          description: 'Cow COW-002 created',
        },
      ],
    },
    {
      id: '3',
      earTag: 'COW-003',
      sex: 'Female' as CowSex,
      pen: 'B2',
      status: 'Active' as CowStatus,
      weight: 380,
      createdAt: sevenDaysAgo.toISOString(),
      lastEventDate: sevenDaysAgo.toISOString(),
      events: [
        {
          id: '3-1',
          type: 'Created',
          date: sevenDaysAgo.toISOString(),
          description: 'Cow COW-003 created',
        },
      ],
    },
  ];
};

