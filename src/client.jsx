
import React from 'react';
import { hydrate } from 'react-dom';
import Grid from './Grid';

const setWorkers = (init) => {
  if (window.Worker) {
    console.log('yes worker');
    const worker = new Worker('/workers/worker.js');
    worker.postMessage('worker set');
    console.log('worker? ', worker);
    worker.onmessage = (e) => {
      console.log('back in the main thread: ', e);
    }
  }
  
  return init;
};

(function (props) {
  console.log('props: ', props);
  hydrate(
    <Grid data={props.data} workerUrl="/assets/client.bundle.js" />,
    document.querySelector('#app')
  );
}(setWorkers(window.__client)));
