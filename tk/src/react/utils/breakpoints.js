import find from 'lodash/fp/find';

export default function breakpoints(callback) {
  const queries = {
    xs: '(max-width: 479px)',
    sm: '(min-width: 480px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 1111px)',
    lg: '(min-width: 1112px) and (max-width: 1175px)',
    xl: '(min-width: 1176px)'
  };

  const listeners = Object.keys(queries).map((key) => {
    const mql = window.matchMedia(queries[key]);
    mql.size = key;
    return mql;
  });
  callback(find(q => q.matches)(listeners));
  window.addEventListener('resize', () => callback(find(q => q.matches)(listeners)));
  window.addEventListener('orientationchange', () => callback(find(q => q.matches)(listeners)));
}
