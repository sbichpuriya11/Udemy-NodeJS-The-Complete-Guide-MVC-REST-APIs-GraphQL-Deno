const http = require("http"); // refers core node module
// const http = require("./http.js") // refer local js module

// function rqListener(req, res) { }
// http.createServer(rqListener);

const server = http.createServer((req, res) => {
  console.log({ url: req.url, method: req.method, headers: req.headers });
  //process.exit(); //hard exits the event loop
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Server App</title></head>");
  res.write(
    "<body><h3 style='font-family:sf pro display'>Hello World</h3></body>"
  );
  res.write("</html>");
  res.end();
  // res.write("Dummy Text"); // once res is end, can't write anything more
});

server.listen(3000);
