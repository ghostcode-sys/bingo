import { createContext } from "react"
import io from "socket.io-client"

export const socket = io.connect("http://localhost:8080")

const SocketContext = createContext(socket);

export default SocketContext