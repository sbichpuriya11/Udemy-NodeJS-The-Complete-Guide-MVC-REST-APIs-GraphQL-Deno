const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>SignUp Form</title></head>");
    res.write(
      `<body style='font-family:sf pro display'>
          <form action = '/message' method = 'POST' >
              <input type='text' name='message'/>
              <button  type='submit'>Submit</button>
          </form >
      </body >`
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      console.log(2);
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(parsedBody);
      // fs.writeFileSync("message.txt", message);

      fs.writeFile("message.txt", message, (err) => {
        // res.writeHead(302, {Headers goes here});
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Server App</title></head>");
  res.write(
    "<body><h3 style='font-family:sf pro display'>Hello World</h3></body>"
  );
  res.write("</html>");
  res.end();
});

server.listen(3000);
