export type DiscussionLeader = {
  name: string;
  bio?: string;
  profileUrl?: string;
  portraitUrl?: string;
};

export type DiscussionResource = {
  label: string;
  href: string;
};

export type DiscussionEvent = {
  dateTime?: string;
  title: string;
  source?: DiscussionResource;
  supplementalReading?: DiscussionResource;
  recordingUrl?: string;
  leader?: DiscussionLeader;
};

export const discussionEvents: readonly DiscussionEvent[] = [
  {
    dateTime: '2026-08-29',
    title: "Augustine's Confessions (Books XI-XIII)",
    source: {
      label: "Augustine's Confessions (Books XI-XIII)",
      href: 'https://www.loebclassics.com/view/LCL026/1912/volume.xml',
    },
    recordingUrl: 'https://www.youtube.com/embed/rGLoiybEiVQ',
    leader: {
      name: 'Sam Garner',
      profileUrl: 'https://nsa.academia.edu/SamuelJGarner',
    },
  },
  {
    dateTime: '2026-09-26',
    title: 'Quomodo Substantiae',
    source: {
      label: 'Boethius, The Theological Tractates',
      href: 'https://www.loebclassics.com/display/boethius-theological_tractates_quomodo_substantiae/1973/pb_LCL074.47.xml',
    },
    supplementalReading: {
      label: "Dr. Kemp's supplemental reading",
      href: 'https://drive.google.com/file/d/1qq8WRg5BsYBK7xp4jyNT99J5YB_Qt9Og/view?usp=sharing',
    },
    recordingUrl: 'https://www.youtube.com/embed/H2_iy-H_aj4',
    leader: {
      name: 'Dr. Dan Kemp',
      bio: 'Dr. Kemp is a Junior Fellow of Philosophy at New Saint Andrews College. He teaches philosophy colloquia and electives in ethics and aesthetics; his research focuses on morality and normativity.',
      profileUrl: 'https://nsa.edu/contributors/dan-kemp',
      portraitUrl: 'https://nsa.edu/api/media/file/DKemp_5.jpg',
    },
  },
];
