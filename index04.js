const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method.toUpperCase();

  if (url === "/" && method === "GET") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Home</h1>");
  } else if (url === "/user" && method === "GET") {
    const users = [{ name: "user01" }, { name: "user02" }];
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(users));
  } else if (url === "/user/10/detail" && method === "POST") {
    const info = {
      firstname: "Pedro",
      lastname: "Aguila",
    };
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(info));
  } else if (url === "/video/200" && method === "PUT") {
    const filePath = "./public/Clase05.mp4";

    response.writeHead(200, { "content-type": "video/mp4" });
    const stream = fs.createReadStream(filePath);
    stream.pipe(response);
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Ruta no existe</h1>");
  }
});

server.listen(3000, () => console.log("Server is running on port 3000"));
