const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const filePath = "./public/manual.html";
  const content = fs.readFileSync(filePath);

  response.writeHead(200, { "content-type": "text/html; chartset=utf-8" });
  response.write(content);
  response.end();
  /*const users = [
    {
      name: "user01",
    },
    {
      name: "user02",
    },
  ];*/
  //response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  //response.write("Hola, cómo estás?");
  //response.write("<strong>Aquí</strong> aún hace frio");
  //response.writeHead(200, { "content-type": "application/json" });
  //response.write(JSON.stringify(users));
  //response.end();
});

server.listen(3000, () => console.log("Server is running on port 3000"));
