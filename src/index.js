const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./certificates/curso-nodejs19.pem"),
  cert: fs.readFileSync("./certificates/curso-nodejs19-public.pem"),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Hola. Este es un servidor con https");
});

server.listen(443, () => console.log("Server is running on port 443"));
