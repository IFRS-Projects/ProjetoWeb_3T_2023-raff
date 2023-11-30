export const DecodeJwtToken = (token: string) => {
  const tokenSplited = token.split('.');

  if (tokenSplited.length < 3 || !tokenSplited[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(tokenSplited[1], 'base64').toString('ascii'));
};
