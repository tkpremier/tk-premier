export default function handleMql(query, cb) {
  const mql = window.matchMedia(query);
  if (mql.addListener) {
    mql.addListener(cb);
  }
  cb(mql);
  return mql;
}
