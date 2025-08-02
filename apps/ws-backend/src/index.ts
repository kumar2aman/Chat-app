import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  rooms: string[];
  userId: string;
  ws: WebSocket;
}

const users: User[] = [];   // you can use redux or sekliton, which is a good approch...

function checkUser(token: string): string | null {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  console.log("decoded is ", decoded);

  if (typeof decoded == "string") {
    return null;
  }

  if (!decoded || !decoded.userId) {
    return null;
  }

  return decoded.userId;
}

wss.on("connection", (ws, request) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || authHeader.startsWith("Bearer")) {
    wss.close();
  }

  const token = authHeader?.split(" ")[1];

  const userId = checkUser(token as string); // TODO: fix this error

  if (!userId) {
    wss.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  console.log(userId);

  ws.on("message", (message) => {
    const parsedData = JSON.parse(message as unknown as string); // ex:- "{type:"join_room", roomId: "123"}"

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws); // TODO: check if the user's roomId exists or not...
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.roomId);
    }


    //db call to save chats but i not good approch you should use queue.

    

    if(parsedData.type === "chat"){    // ex:- {type:"chat", roomId:"123", message:"hello world"}
        const roomId = parsedData.roomId
        const message = parsedData.message

        users.forEach(user =>{
            if(user.rooms.includes(roomId)){
                user.ws.send(JSON.stringify({
                    type:"chat",
                    message:message,
                    roomId
                }))
            }
        })
    }
  });
});
