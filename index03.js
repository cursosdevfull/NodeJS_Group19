const fs = require("fs");

const server = http.createServer((request, response) => {
  const filePath = "./public/Clase05.mp4";

  response.writeHead(200, { "content-type": "video/mp4" });
  const stream = fs.createReadStream(filePath);
  stream.pipe(response);
});

server.listen(3000, () => console.log("Server is running on port 3000"));
