const getDomain = () => {
  return window.location.protocol + window.location.hostname;
};

const getFavicon = (url: string) => {
  let domain = url.match(/http[s]?:\/\/(.*?)([:\/]|$)/);
  if (domain) {
    return domain[0] + '/favicon.ico';
  } else {
    return '';
  }
};

export default { getDomain, getFavicon };
