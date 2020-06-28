import 'string.prototype.endswith';

export default function uriEncoder(str) {
  let uri = str.replace(/[\s!'()*.,?/@#$%^&+_={};:<>"~`]/g, '-');
  uri = uri.replace(/-+/g, '-');
  if (uri.endsWith('-')) {
    uri = uri.substring(0, uri.length - 1);
  }
  return uri.toLowerCase();
}

