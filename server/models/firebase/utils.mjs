export async function generateUniqueImageName() {
    // Define characters that can be used in the ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
  
    // Generate a random character from the chars string and append to uniqueId
    for (let i = 0; i < 12; i++) {
      uniqueId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return uniqueId;
  }
  