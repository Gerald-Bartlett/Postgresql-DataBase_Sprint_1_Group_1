const crc32 = require("crc/crc32");
const { format } = require("date-fns");
const fs = require("fs");
const path = require("path");

//**********************************************************INITIALIZING EMMITTER*************************************************************** */
// defining and intializing events emitter. turn emmiter on to listen for event
const logEvents = require("./logEvents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

const myArgs = process.argv.slice(2);
function tokenCount() {
  fs.readFile(__dirname + "/json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    let count = Object.keys(tokens).length;
    console.log(`count is ${count}`);
    myEmitter.emit(
      "log",
      "token.tokenCount()",
      "INFO",
      `token count: ${count}`
    );
  });
}
function listTokens() {
  fs.readFile(__dirname + "/json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    tokens.forEach((obj) => console.log(`${obj.username} token: ${obj.token}`));
  });
  myEmitter.emit(
    "log",
    "token.listTokens()",
    "INFO",
    `display full list of tokens`
  );
}
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function updateToken() {
  fs.readFile(__dirname + "/json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    tokens.forEach((obj) => {
      if (obj.username === myArgs[2]) {
        switch (myArgs[3]) {
          case "p":
          case "P":
            obj.phone = myArgs[4];
            break;
          case "e":
          case "E":
            obj.email = myArgs[4];
            break;
          default:
        }
        console.log(obj);
      }
    });
    userTokens = JSON.stringify(tokens);
    fs.writeFile(__dirname + "/json/tokens.json", userTokens, (err) => {
      if (err) console.log(err);
      else console.log(`Token ${myArgs[2]} updated ${myArgs[3]}`);
      myEmitter.emit(
        "log",
        "token.updateToken()",
        "INFO",
        `updated ${myArgs[2]} : ${myArgs[3]}`
      );
    });
  });
}

function newToken(username) {
  let newToken = JSON.parse(`{
    "created": "2022-02-21 12:30:00",
    "username": "username",
    "token": "token",
    "phone": "phonenumber",
    "email":"emailaddress",
    "expires": "2022-02-24 12:30:00"
}`);
  let now = new Date();
  let expires = addDays(now, 3);
  newToken.created = `${format(now, "yyyy-MM-dd HH:mm:ss")}`;
  newToken.username = username;
  newToken.token = crc32(username).toString(16);
  newToken.expires = `${format(expires, "yyyy-MM-dd HH:mm:ss")}`;

  //console.log(userTokens);
  fs.readFile(__dirname + "/json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    tokens.push(newToken);
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
    return newToken.token;
  });
}

/**********************************************************TOKEN APP FUNCTION ******************************* */
function tokenApp() {
  // set arg to capture anything after the second arg
  const myArgs = process.argv.slice(2);
  if (DEBUG) console.log("tokeneApp()");
  myEmitter.emit("log", "token.tokenApp()", "INFO", "token called by CLI");
  switch (myArgs[1]) {
    case "--count":
    case "--c":
      tokenCount();
      listTokens();
      break;
    case `--new`:
      newToken(myArgs[2]);
      break;
    case "--mk":
      updateToken();
      break;
    default:
      fs.readFile(__dirname + "/default.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
      myEmitter.emit(
        "log",
        "init.initializationApp()",
        "INFO",
        "invalid selection"
      );
  }
}

module.exports = { tokenApp, newToken };
