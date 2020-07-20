const music = [
  {
    title: "Paradise (feat. Benjamin Ingrosso)",
    singer: "Ofenbach",
    thumbnail: "https://img.youtube.com/vi/MTAMDZ0kii0/",
    desktop: "hqdefault.jpg",
    tablet: "mqdefault.jpg",
    mobile: "default.jpg",
    source:
      "assets/music/Ofenbach - Paradise (feat. Benjamin Ingrosso) (Official Video).mp3",
  },
  {
    title: "Bad Buy",
    singer: "Billie Eilish",
    thumbnail: "https://img.youtube.com/vi/DyDfgMOUjCI/",
    source: "assets/music/Billie Eilish - bad guy.mp3",
  },
  {
    title: "Checklist (feat. Chromeo)",
    singer: "MAX",
    thumbnail: "https://img.youtube.com/vi/g5WaJyEPP5g/",
    source: "assets/music/MAX - Checklist (feat. Chromeo) (Official Video).mp3",
  },
  {
    title: "Nice To Meet Ya",
    singer: "Niall Horan",
    thumbnail: "https://img.youtube.com/vi/k7jeYJA9bgY/",
    source: "assets/music/Niall Horan - Nice To Meet Ya (Alternate Video).mp3",
  },
];

export const getMusicInfo = (idx) => {
  return { data: music[idx], total: music.length };
};
