const template = ({
  data,
  title,
  content = '',
  componentType = 'home'
}) => `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
            <title> ${title} </title>
            <link rel="stylesheet" href="/assets/main.css" type="text/css" />
            <link rel="stylesheet" href="/assets/${componentType}.css" type="text/css" />
          </head>
          <body>
            <div id="app">${content}</div>
            <script> window.__client = \`${data}\`;</script>
            <script src="/dist/${componentType}.client.js"></script>
          </body>
          </html>
          `;

module.exports = template;
