const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("'/users' endpoint called");
  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>

        <title>Dummy User</title>
    </head>
    <body style='font-family:sf pro display'>
    
        <h1>User Information</h1>
        <div>
            <h2>John Doe</h2>
            <p>Email: john.doe@example.com</p>
        </div>
    </body>
    </html>
    `
  );
});

app.use("/", (req, res, next) => {
  console.log("'/' endpoint called");
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    
      <title>Greetings</title>
  </head>
  <body style='font-family:sf pro display'>
  
      <h1>Welcome!</h1>
      <p>Hello, visitor! We're glad to have you here.</p>
  
  </body>
  </html>
  `);
});

app.listen(3000);
