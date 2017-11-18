module.exports = {
    entry: './js/script.js',
    output: {
        filename: "./js/out.js"
     },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2'] }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader?sourceMap"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }


        ]
    }
}
