
export default function formatEstimate(estimate) {
  let est = typeof estimate === 'number' ? estimate.toString() : estimate;
  if (typeof est === 'string') { est = est.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  return est;
}
