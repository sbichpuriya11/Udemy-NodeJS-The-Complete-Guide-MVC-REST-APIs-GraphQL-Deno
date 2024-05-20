const http = require("http");

const server = http.createServer((req, res) => {
  console.log("started..");
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("ContentType", "text/html");
    res.write(`<!DOCTYPE html>
        <html>
        <head>
           <title>Welcome</title>
        </head>
        <body style="font-family:sf pro display">
            <h3>Greetings from assignment!</h3>
            <br/>
            <form method="POST" action="/create-user">
                <label>Please enter username</label>
                <input type = "text" name="username"/>
                <br/>
                   <button type = "submit">Submit</button> 
            </form>
        </body>
        </html>`);
    res.end();
  } else if (url === "/create-user" && method === "POST") {
    console.log("data received..");
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split("=")[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else if (url === "/users") {
    res.setHeader("ContentType", "text/html");
    res.write(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dummy Users List</title>
</head>
<body  style="font-family:sf pro display">

    <h1>Dummy Users List</h1>
    <ul>
        <li>
            <h2>John Doe</h2>
            <p>john.doe@example.com</p>
        </li>
        <li>
            <h2>Jane Smith</h2>
            <p>jane.smith@example.com</p>
        </li>
        <li>
            <h2>Michael Brown</h2>
            <p>michael.brown@example.com</p>
        </li>
        <li>
            <h2>Emily Davis</h2>
            <p>emily.davis@example.com</p>
        </li>
    </ul>

</body>
</html>

`);
    res.end();
  }
});

server.listen(3000);
