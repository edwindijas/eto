const path = require("path");
module.exports = {
    resolve: {
        alias: {
            "@Src" : "./src/*",
            "@Components": path.resolve(__dirname, "./src/components"),
            "@Wrapper": path.resolve(__dirname, "./src/components/wrappers"),
            "@Style": path.resolve(__dirname, "./src/style"),
            "@Pages": path.resolve(__dirname, "./src/pages")
        }
    }
}