export default function () {
  return new Promise((resolve, reject) => {
    if (window.addtocalendar) {
      if (typeof window.addtocalendar.load === 'function') {
        resolve('true');
      };
    } else {
      let intervalCount = 0;
      if (window.ifaddtocalendar === undefined) {
        window.ifaddtocalendar = 1;
        const d = document;
        const s = d.createElement('script');
        const g = 'getElementsByTagName';
        s.type = 'text/javascript'; s.charset = 'UTF-8'; s.async = true;
        s.src = `${window.location.protocol === 'https:' ? 'https' : 'http'}://addtocalendar.com/atc/1.5/atc.min.js`;
        const h = d[g]('body')[0]; h.appendChild(s);
      }
      const interval = setInterval(() => {
        if (window.addtocalendar) {
          if (typeof window.addtocalendar.load === 'function') {
            clearInterval(interval);
            resolve('true');
          };
        } else if (intervalCount >= 5) {
          clearInterval(interval);
          reject(new Error('Could not connect to addtocalendar.com'));
        }
        intervalCount += 1;
      }, 500);
    }
  });
}
