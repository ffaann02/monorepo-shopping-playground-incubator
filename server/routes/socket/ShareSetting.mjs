
const TEST_MINUTE = 10;

export const createRoom = async (io,gameRooms,gamesTracker,data) =>{
    const gameId = data.gameId;
    const time = data.time;
    console.log("created game room");
    gameRooms[gameId] = [];

    const currentTime = Date.now();
    const nextMinuteTime = currentTime + (60 * 1000 * time); // Adding 1 minute in milliseconds

    gamesTracker[gameId] = {
        create_time: currentTime,
        end_time: nextMinuteTime,
        active: false,
    };

    console.log("Game room created:", gameRooms[gameId]);

    // Calculate time remaining until end_time
    console.log(currentTime);
    const timeRemaining = nextMinuteTime - currentTime;
}

export const SetRoomActive = async (io,gameRooms,gamesTracker,data) =>{
    const gameId = data.gameId;
    console.log("set room active");
    gamesTracker[gameId].active = true;
    console.log("Game room active:", gameRooms[gameId]);
}

export const SetRoomInActive = async (io, gameRooms, gamesTracker, data) => {
    const gameId = data.gameId;
    console.log("set room inactive");

    // Record the current time when the room is set inactive
    gamesTracker[gameId].lastInactiveTime = Date.now();

    gamesTracker[gameId].active = false;
    console.log("Game room inactive:", gameRooms[gameId]);
}

export const SendUpdateGameRoomStatus = async (io,gameRooms,gamesTracker,data) =>{
    const gameId = data.gameId;
    io.emit("update_room_status", { room:gameRooms[gameId], tracker: gamesTracker[gameId] });
}