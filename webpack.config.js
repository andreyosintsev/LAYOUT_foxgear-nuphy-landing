const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');

module.exports = {
  entry: './src/index.html',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],  // Для обработки HTML файлов
      },
    ],
  },
  plugins: [
    // Шаблон для главной страницы с использованием EJS
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Указываем путь к основному шаблону
      filename: 'index.html',
      inject: 'body',
      templateParameters: {
        header: fs.readFileSync(path.resolve(__dirname, 'src/blocks/header/header.html'), 'utf8'),
        footer: fs.readFileSync(path.resolve(__dirname, 'src/blocks/footer/footer.html'), 'utf8'),
      },
      // Используем EJS для обработки шаблона
      templateContent: (data) => {
        const { header, footer } = data;
        const html = fs.readFileSync(path.resolve(__dirname, 'src/index.html'), 'utf8');
        return html
          .replace('<!-- HEADER -->', header)  // Заменяем комментарий на содержимое шапки
          .replace('<!-- FOOTER -->', footer);  // Заменяем комментарий на содержимое подвала
      },
    }),
    new CleanWebpackPlugin(),
    // Шаблон для страницы "О нас"
    // new HtmlWebpackPlugin({
    //   template: './src/html/about.html',
    //   filename: 'about.html',
    //   inject: 'body',
    //   templateParameters: {
    //     header: fs.readFileSync(path.resolve(__dirname, 'src/partials/header.html'), 'utf8'),
    //     footer: fs.readFileSync(path.resolve(__dirname, 'src/partials/footer.html'), 'utf8'),
    //   },
    //   templateContent: (data) => {
    //     const { header, footer } = data;
    //     const html = fs.readFileSync(path.resolve(__dirname, 'src/html/about.html'), 'utf8');
    //     return html
    //       .replace('<!-- HEADER -->', header)
    //       .replace('<!-- FOOTER -->', footer);
    //   },
    // }),
  ],
};
