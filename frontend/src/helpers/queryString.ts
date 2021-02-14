export const queryPath = (name: string, url = window.location.href) => {
  const validatedName = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + validatedName + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
