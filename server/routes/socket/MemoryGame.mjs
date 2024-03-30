export const handleJoinMemoryGame = async (io,userData,room) => {
    const gameId = userData.gameId;
    const userId = userData.userId;
    if (room.find(player => player.userId === userId)) {
        console.log(`User ${userId} is already in the game room ${gameId}`);
        return;
    }

    userData.best_play_time = Infinity; // Initialize with null, assuming best_time is a number representing milliseconds
    userData.attempt = 0; // Initialize with 0
    userData.join_time = new Date(); // Set join_time to the current date and time
    room.push(userData);
    console.log("room: ");
    console.log(room);
}

export const handleMemoryUpdatePlayerGameResult = async (io,userData, room) => {
    const gameId = userData.gameId;
    const userId = userData.userId;
    const player = room.find(player => player.userId === userId);
    if (!player) {
        console.log(`User ${userId} is not in the game room ${gameId}`);
        return;
    }

    // Check if the new best play time is greater than the existing best play time
    console.log(`${userData.time} - ${player.best_play_time}`);
    if (userData.time < player.best_play_time) {
        // Update the player's best play time and attempt
        player.best_play_time = userData.time;
        player.attempt = userData.attempt;
        console.log(`Updated best play time for user ${userId} in game room ${gameId}`);
    } else {
        console.log(`New play time for user ${userId} in game room ${gameId} is not lower. Keeping existing data.`);
    }
}