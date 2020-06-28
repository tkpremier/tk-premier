const template = ({
  data,
  title,
  content = '',
  componentType = 'Main'
}) => `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
            <title> ${title} </title>
            <link rel="stylesheet" href="/assets/home.css" type="text/css" />
          </head>
          <body>
            <div id="app">${content}</div>
          </body>
          </html>
          `;
module.exports = template;
