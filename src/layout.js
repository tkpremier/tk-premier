
const getWorkers = type => type === 'client'
  ? `<script src="/assets/workers.bundle.js" type="text/javascript"></script>`
  : ``;

function template({
  data,
  title,
  content = '',
  type = 'client'
}) {
  const page = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title> ${title} </title>
          </head>
          <body>
            <div id="app">${content}</div>
          </body>
          <script>if (typeof window !== 'undefined') { window.__client = ${data} }</script>
          <script src="/assets/client.bundle.js" type="text/javascript"></script>
          ${getWorkers('client')}
          </html>
          `;
  return page;
}

module.exports = template;
