#!/usr/bin/env node
const exec = require("child_process").exec;
const open = require("open");

const isRunning = (query, cb) => {
  let platform = process.platform;
  let cmd = "";
  switch (platform) {
    case "win32":
      cmd = `tasklist`;
      break;
    case "darwin":
      cmd = `ps -ax | grep ${query}`;
      break;
    case "linux":
      cmd = `ps -A`;
      break;
    default:
      break;
  }
  exec(cmd, (err, stdout, stderr) => {
    cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
  });
};

isRunning("chrome.exe", (status) => {
  console.log(status);
  if (status === true) {
    open("www.google.com", function (err) {
      if (err) throw err;
    });
  } else {
    exec("start chrome", function (err, stdout, stderr) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      process.exit(0); // exit process once it is opened
    });
  }
});
