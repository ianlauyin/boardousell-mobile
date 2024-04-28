/** @type {import('tailwindcss').Config} */
const fs = require("fs");
const path = require("path");
const componentFiles = [];
const getAllJSFile = (currentPath) => {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    if (file.slice(-3) === ".js") {
      componentFiles.push(currentPath + "/" + file);
    }
    if (!path.extname(file).length) {
      getAllJSFile(currentPath + "/" + file);
    }
  }
};
getAllJSFile("./src/components");
getAllJSFile("./src/screens");
module.exports = {
  content: componentFiles,
  theme: {
    extend: {
      colors: {
        accent: "#88c0d0",
        base: {
          100: "#e5e9f0",
          300: "#d8dee9",
        },
        footer: "#4c566a",
      },
    },
  },
  plugins: [],
};
