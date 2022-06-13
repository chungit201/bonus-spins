import * as jose from 'jose';


export const decodeJwt = async (token: string) => {
  try {
    const enc = new TextEncoder();
    const secret = enc.encode('slime@royale2xw=s*g)h$k%+-jjd(2bu!d(5r%-7if4)1ffqjhqcrop');
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (e) {
    console.log(e)
  }
};

export const encodeJwt = async (data: {}) => {
  const enc = new TextEncoder();
  const secret = enc.encode('slime@royale2xw=s*g)h$k%+-jjd(2bu!d(5r%-7if4)1ffqjhqcrop');
  return await new jose.SignJWT(data).setProtectedHeader({ alg: 'HS256' }).sign(secret);
};
