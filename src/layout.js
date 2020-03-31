
// const getWorkers = type => type === 'client'
//   ? `<script src="/assets/workers.bundle.js" type="text/javascript"></script>`
//   : ``;

function template({
  data,
  title,
  content = '',
  componentType = 'Main'
}) {
  const page = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
            <title> ${title} </title>
          </head>
          <body>
            <div id="app">${content}</div>
          </body>
          <script>if (typeof window !== 'undefined') { window.__client = \`${data}\`;
        window.__cType = \`${componentType}\`; }</script>
          <script src="/assets/client.bundle.js" type="text/javascript"></script>
          </html>
          `;
  return page;
}

module.exports = template;
