const path = require('path');

module.exports = {
    devServer: {
        historyApiFallback: true,
        
    },
    entry: path.resolve(__dirname, './public/src/index.js'),
    output
}
