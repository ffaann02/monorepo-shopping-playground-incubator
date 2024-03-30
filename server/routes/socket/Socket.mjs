import {
  handleJoinMemoryGame,
  handleMemoryUpdatePlayerGameResult,
} from "./MemoryGame.mjs";
import { SendUpdateGameRoomStatus, SetRoomActive, SetRoomInActive, createRoom } from "./ShareSetting.mjs";

// socketRoute.mjs
const setupSocketRoutes = (io) => {
  const gameRooms = {};
  const gamesTracker = {};

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Live
    socket.on("create_room", async (data) => {
      console.log("create room: ",data.gameId);
      await createRoom(io, gameRooms, gamesTracker, data);
      await SendUpdateGameRoomStatus(io, gameRooms, gamesTracker, data);
    });

    socket.on("set_room_active", async (data) => {
      console.log("set room active: ",data.gameId);
      await SetRoomActive(io, gameRooms, gamesTracker, data);
      await SendUpdateGameRoomStatus(io, gameRooms, gamesTracker, data);
    });

    socket.on("set_room_inactive", async (data) => {
      console.log("set room active: ",data.gameId);
      await SetRoomInActive(io, gameRooms, gamesTracker, data);
      await SendUpdateGameRoomStatus(io, gameRooms, gamesTracker, data);
    });

    socket.on("find_game_room", async (data) => {
      const gameId = data.gameId;
      let flag = null;
      if (!gameRooms[gameId]) {
        flag = -1;
      } else {
        if (gamesTracker[gameId].active) {
          flag = 1;
        } else {
          flag = 0;
        }
      }
      io.emit("game_room_status", { flag });
    });

    socket.on("join_game_memory", async (userData) => {
      console.log(gameRooms);
      const gameId = userData.gameId;
      const userId = userData.userId;
      console.log(userId);
      if (!gameRooms[gameId]) {
        io.emit("room_not_found");
        return;
      }
      const room = gameRooms[gameId];
      const tracker = gamesTracker[gameId];
      await handleJoinMemoryGame(io, userData, room);
      io.emit("game_memory_player_game_result", { room, tracker });
    });

    socket.on("game_memory_player_send_result", async (userData) => {
      console.log(userData);
      const gameId = userData.gameId;
      const room = gameRooms[gameId];
      const tracker = gamesTracker[gameId];
      await handleMemoryUpdatePlayerGameResult(io, userData, room);
      io.emit("game_memory_player_game_result", { room, tracker });
    });

    socket.on("append_log_message", async (data) => {
      const gameId = data.gameId;
      const room = gameRooms[gameId];

    })

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocketRoutes;
