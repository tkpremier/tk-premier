onmessage = function(e) {
  console.log('Message received from main script: '),
  console.log('what is this e you have given me? ', e);
  // results.forEach((num) => {
  //   postMessage(`posting for result ${num * Math.random() * 12} received!`);
  // })
  postMessage('right back atcha');
}