const http = require("http");
const { parse } = require("querystring");
const { newToken } = require("./token");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    // collect data from post request. request goes in, produces result
    collectRequestData(req, (result) => {
      var theToken = newToken(result.username);
      res.end(` ${result.username} token number: ${theToken}`);
    });
    userTokens = JSON.stringify(tokens);
    fs.writeFile(__dirname + "/json/tokens.json", userTokens, (err) => {
      if (err) console.log(err);
      else console.log(`New Token ${newToken.token} created for ${username}`);
      myEmitter.emit(
        "log",
        "token.newToken()",
        "INFO",
        `New token ${newToken.token}`
      );
    });
  } else {
    res.end(`
            <!doctype html>
            <html>w
            <body>
                <form action="/" method="post">
                    <span>Enter Username:<span><input type="text" name="username" /><br />
                    <button>Generate new token</button>
                </form>
            </body>
            </html>
        `);
  }
});
server.listen(3000);

function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}
