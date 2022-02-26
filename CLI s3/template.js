// set const so folders can be reference using 'folders'
const folders = ["models", "views", "routes", "logs"];

//setting to display in config
const config = {
  name: "Team 1 - App config",
  version: "1.0.0",
  description: "Command Line Interface of Sprint#1 by Team#1",
  main: "app.js",
  superuser: "admin",
}; // set menu to be display on init

const init = `myapp init <command>

Usage:

myapp init --all          creates the folder structure and config file
myapp init --mk           creates the folder structure
myapp init --cat          creates the config file with default settings
myapp config --show             displays a list of the current config settings
myapp config --reset            resets the config file with default settings
myapp config --set              sets a specific config setting`;

module.exports = { folders, config, init };
