import http from "http";
import app from "./app.js";

app.set("port", process.env.PORT);
const server = http.createServer(app);

server.listen(process.env.PORT);

console.log("server connected in port " + process.env.PORT);
