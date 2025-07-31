import { WebSocketServer } from "ws";
import  jwt  from 'jsonwebtoken';


const wss = new WebSocketServer({port: 8080})



function checkUser(token:string):string | null {

    const decoded  = jwt.verify(token, secret as string )


  if(typeof decoded == "string"){
    return null
  }

  if(!decoded || !decoded.userId){
    return null
  }

  return decoded.userId


}


wss.on("connection", (ws,request )=>{

    const  authHeader = request.headers.authorization

     if(!authHeader || authHeader.startsWith("Bearer")){
        wss.close()
        
     }

     const token = authHeader?.split(" ")[1];


     const userId = checkUser(token as string) // TODO: fix this error

    ws.on("message", (message)=>{
        ws.send("pong")
    })
})