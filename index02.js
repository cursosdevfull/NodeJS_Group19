const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const filePath = "./public/Clase05.mp4";
  //const content = fs.readFileSync(filePath);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log("An error happened", err);
      response.writeHead(500, { "content-type": "text/plain" });
      response.end("Hay un error");
      return;
    }

    response.writeHead(200, { "content-type": "video/mp4" });
    response.write(content);
    response.end();
  });
});

server.listen(3000, () => console.log("Server is running on port 3000"));
