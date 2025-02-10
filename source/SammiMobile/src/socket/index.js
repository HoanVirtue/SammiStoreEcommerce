import io from "socket.io-client";
import { baseURL } from "../api/axiosClient";

export default function connectSocketIo() {
  const socket = io(baseURL, { transports: ["websocket"] });
  handleListentSocket(socket, io);

  return socket;
}

function handleListentSocket(socket, io) {
  socket.on("connect", () => {
    console.log("connect io oke");
    socket.emit("join_room_customer");
  });
}
