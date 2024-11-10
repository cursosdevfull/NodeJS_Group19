const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../", "public")));

app.use((request, response, next) => {
  console.log("middleware download");
  const { auth } = request.query;
  if (!auth || auth !== "admin") {
    console.log("auth", auth);
    response.status(401).send("User is not authorized");
  } else {
    next();
  }
});

app.get("/", (request, response) => {
  const users = ["user01", "user02", "user03", "user04"];
  //response.type("application/json").status(200).send(JSON.stringify(users));
  //response.type("application/json").send(JSON.stringify(users));
  //response.type("application/json").json(users);
  response.json(users);
});

app.get("/file", (request, response) => {
  fs.readFile("./public/index.html", (err, content) => {
    if (err) return response.type(500).send("An error happened");

    response.type("text/html").send(content);
  });
});

app.get("/file-html", (request, response) => {
  const pathFile = path.join(__dirname, "../", "/public/index.html");
  response.sendFile(pathFile);
});

/* app.use("/file-download", (request, response, next) => {
  console.log("middleware download");
  const { auth } = request.query;
  if (!auth || auth !== "admin") {
    console.log("auth", auth);
    response.status(401).send("User is not authorized to download files");
  } else {
    next();
  }
}); */

app.get("/file-download", (request, response) => {
  const pathFile = path.join(__dirname, "../", "/public/index.html");
  response.download(pathFile);
});

app.get(
  "/user",
  /*   (request, response, next) => {
    const { auth } = request.query;
    if (!auth || auth !== "admin") {
      response.status(401).send("User is not authorized");
    } else {
      next();
    }
    //response.send("response from final /user");
    //console.log("Este es una función llamada Middleware");
    //next();
  }, */
  (request, response) => {
    response.send("response from path /user");
  }
);

const server = http.createServer(app);
server.listen(3000, () => console.log("Server is running on port 3000"));

//app.listen(3000, () => console.log("Server is running on port 3000"));
