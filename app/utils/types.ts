export interface Participant {
  id: string;
  name: string;
  isWillingToLead: boolean;
  isBigGroupLeader: boolean;
  groupId?: string;
  testament?: 'old' | 'new'; // To track which testament group they belong to
}

export interface Group {
  id: string;
  name: string;
  participants: Participant[];
  hasLeader: boolean;
  testament: 'old' | 'new'; // Whether this is an Old Testament or New Testament group
}

export const OLD_TESTAMENT_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms",
  "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
  "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
];

export const NEW_TESTAMENT_BOOKS = [
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
  "James", "1 Peter", "2 Peter", "1 John", "2 John",
  "3 John", "Jude", "Revelation"
];

export const BIBLE_BOOKS = [...OLD_TESTAMENT_BOOKS, ...NEW_TESTAMENT_BOOKS];

export function getRandomBibleBook(testament: 'old' | 'new'): string {
  const books = testament === 'old' ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
  return books[Math.floor(Math.random() * books.length)];
}

export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 9);
}
