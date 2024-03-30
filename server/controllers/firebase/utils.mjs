export async function filterUpdatedCardsImageUpload(data) {
  return data
    .filter(item => item.url_type === 'upload')
    .map(({ name, pairId }) => ({ name: name.replace(/\s/g, ''), pairId }));
}

export async function filterUpdatedCardsImageLink(data) {
  return data
    .filter(item => item.url_type === 'link')
    .map(({ name, pairId, image }) => ({ name: name.replace(/\s/g, ''), pairId, image }));
} 

const difficultyLevels = [
  { value: 'very_easy', label: 'ง่ายมาก', cardCount: 4 },
  { value: 'easy', label: 'ง่าย', cardCount: 6 },
  { value: 'medium', label: 'ปานกลาง', cardCount: 12 },
  { value: 'hard', label: 'ยาก', cardCount: 16 },
];

export async function getDifficultyInfo(difficultyValue) {
  const difficulty = difficultyLevels.find(level => level.value === difficultyValue);
  if (difficulty) {
    return { value: difficultyValue , label: difficulty.label, cardCount: difficulty.cardCount };
  } else {
    return null; // Return null if the difficulty level is not found
  }
}

export async function generateUniqueId() {
  // Define characters that can be used in the ID
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';

  // Generate a random character from the chars string and append to uniqueId
  for (let i = 0; i < 12; i++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return uniqueId;
}

export async function generateUniqueIdWithTimestamp(gameId) {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomChars = Math.random().toString(36).substring(2, 10); // Generate random characters
  const uniqueId = gameId + timestamp + randomChars; // Combine timestamp and random characters
  return uniqueId;
}

export async function getCurrentTime() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0'); // Get day with leading zero if needed
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get month with leading zero if needed (months are zero-based)
  const year = currentDate.getFullYear(); // Get full year
  const hour = String(currentDate.getHours()).padStart(2, '0'); // Get hour with leading zero if needed
  const minute = String(currentDate.getMinutes()).padStart(2, '0'); // Get minute with leading zero if needed

  return { day, month, year, hour, minute };
}
