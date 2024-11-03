const http = require("http");
const fs = require("fs");

const paths = [
  {
    url: "/",
    method: "GET",
    callback: (request, response) => {
      response.writeHead(200, { "content-type": "text/html" });
      response.end("<h1>Home</h1>");
    },
  },
  {
    url: "/user",
    method: "GET",
    callback: (request, response) => {
      const users = [{ name: "user01" }, { name: "user02" }];
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(users));
    },
  },
  {
    url: "/user/10/detail",
    method: "POST",
    callback: (request, response) => {
      const info = {
        firstname: "Pedro",
        lastname: "Aguila",
      };
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(info));
    },
  },
  {
    url: "/video/200",
    method: "PUT",
    callback: (request, response) => {
      const filePath = "./public/Clase05.mp4";

      response.writeHead(200, { "content-type": "video/mp4" });
      const stream = fs.createReadStream(filePath);
      stream.pipe(response);
    },
  },
];

const execute = (request, response) => {
  const path = paths.find(
    (el) => el.url === request.url && el.method === request.method.toUpperCase()
  );

  if (path) {
    path.callback(request, response);
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Ruta no existe</h1>");
  }
};

const server = http.createServer(execute);

server.listen(3000, () => console.log("Server is running on port 3000"));

test("/ should returned the word 'home'", () => {
  // Preparación
  const request = { url: "/", method: "GET" };
  let responseContent = "";

  const response = {
    writeHead: () => {},
    end: (content) => {
      responseContent = content;
    },
  };

  // Ejecución
  execute(request, response);

  // Comprobación
  if (responseContent !== "<h1>Home</h1>") {
    throw new Error(`Expected '<h1>Home</h1>' but got '${responseContent}'`);
  } else {
    console.log("Test passed!");
  }
});
