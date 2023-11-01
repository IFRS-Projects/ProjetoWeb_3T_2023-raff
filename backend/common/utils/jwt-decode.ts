export const DecodeJwtToken = (authorization: string) => {
  const [name, token] = authorization.split('=') ?? [];

  const tokenSplited = token.split('.');

  if (tokenSplited.length < 3 || !tokenSplited[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(tokenSplited[1], 'base64').toString('ascii'));
};
