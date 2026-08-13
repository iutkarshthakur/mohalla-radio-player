export type Track = {
  id: string;
  title: string;
  era: string;
  /** duration in seconds */
  duration: number;
  /** deterministic hue used to paint a generative cover disc (no album art provided) */
  hue: number;
};

const NINETIES = [
  "Tujhe Dekha To Yeh Jaana Sanam",
  "Pehla Nasha",
  "Kuch Kuch Hota Hai",
  "Humko Humise Chura Lo",
  "Dil To Pagal Hai",
  "Keh Do Na Tum",
  "Mera Dil Bhi Kitna Pagal Hai",
  "Chaiyya Chaiyya",
  "Tere Liye",
  "Kal Ho Naa Ho",
  "Tumse Milke Dil Ka Jo Haal",
  "Suraj Hua Maddham",
  "Do Dil Mil Rahe Hain",
  "Is Pyar Se Meri Taraf Na Dekho",
  "Ajeeb Dastan Hai Yeh",
  "O Mere Dil Ke Chain",
  "Kabhi Haan Kabhi Naa",
  "Saathiya",
  "Aankhon Mein Teri",
  "Pyar Kiya To Darna Kya",
  "Ek Ladki Ko Dekha To Aisa Laga",
  "Pyaar Humein Kis Mod Pe",
  "Hothon Se Chhu Lo Tum",
  "Woh Ladki Hai Kahan",
  "Jaane Kyon",
  "Dil Kya Kare",
  "Yeh Kaali Kaali Ankhein",
  "Sapne Mein Milti Hai",
  "Tadap Tadap Ke",
  "Koi Ladki Hai",
  "Hum Dil De Chuke Sanam",
  "Aashiqui Mein Teri",
  "Mujhse Dosti Karoge",
  "Din Shagna Da",
  "Radha Kaise Na Jale",
  "Agar Tum Saath Ho",
  "Zara Sa Jhoom Loon Main",
  "Mehbooba Mehbooba",
  "Yeh Dil Deewana",
  "Maine Pyar Kiya",
  "Dheere Dheere Se",
  "Tu Shayar Hai Main Teri Shayari",
  "Kitna Pyara Wada Hai",
  "Baatein Ye Kabhi Na",
  "Ek Pyar Ka Nagma Hai",
  "Who Wafaa",
  "Mere Mehboob Qayamat Hogi",
  "Humko Sirf Tumse Pyar Hai",
  "Hogi Pyar Ki Jeet",
  "Dholna",
];

const TWO_THOUSANDS = [
  "Tum Hi Ho",
  "Tera Hone Laga Hoon",
  "Zara Zara Touch Me",
  "Khuda Jaane",
  "Pee Loon",
  "Rahe Na Tu",
  "Ishq Sufiyana",
  "Masakali",
  "Agar Tum Saath Ho",
  "Yeh Dooriyan",
  "Pani Da Rang",
  "Student Of The Year",
  "Raanjhanaa",
  "Hummaro Pyaar",
  "Manwa Laage",
  "Naino Ne Baandhi",
  "Deewana Main Deewana",
  "Jaane Kyun",
  "Tere Naina",
  "O Maahi",
  "Ishq Bulava",
  "Chikni Chameli",
  "Sajda (My Name Is Khan)",
  "Hasi (Hamari Adhuri Kahani)",
  "Teri Meri",
  "Mere Sang",
  "Muskurane (City Lights)",
  "Carvaan",
  "Pal",
  "Bulleya",
  "Hawayein",
  "Galliyan",
  "Soch Na Sake",
  "Jab Tak (M.S. Dhoni: The Untold Story)",
  "Zaalima",
  "Enna Sona",
  "Raabta",
  "Tujh Mein Rab Dikhta Hai",
  "Phir Le Aaya Dil",
  "Jiya Re",
  "Sun Raha Hai Na Tu",
  "Tum Se Hi",
  "Mast Magan",
  "Bhula Dena",
  "Mann Mera",
  "Heeriye",
  "Tere Liye",
  "Shukran Allah",
  "Luv Letter",
  "Party On My Mind",
];

function slugify(title: string, i: number): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${i}`
  );
}

// deterministic 3:00-5:15-ish spread, no two neighbours identical
function durationFor(i: number): number {
  return 180 + ((i * 47) % 156);
}

function hueFor(i: number): number {
  return (i * 137.5) % 360;
}

function buildEra(list: string[], era: string, offset: number): Track[] {
  return list.map((title, i) => ({
    id: slugify(title, offset + i),
    title,
    era,
    duration: durationFor(offset + i),
    hue: hueFor(offset + i),
  }));
}

export const TRACKS: Track[] = [
  ...buildEra(NINETIES, "90s", 0),
  ...buildEra(TWO_THOUSANDS, "2009\u201310", NINETIES.length),
];

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
