import fs from 'fs';
import path from 'path';
import { generateKeyPair, randomBytes } from 'crypto';

export const setJWT_KEYS = (secret: string) => {
  const folderPath = path.resolve(`${__dirname}/../../keys`);
  generateKeyPair(
    'rsa',
    {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: secret,
      },
    },
    (err, publicKey, privateKey) => {
      if (err) {
        console.log('error is--->', err);
      }
      fs.writeFileSync(`${folderPath}/jwtPrivate.key`, privateKey);
      fs.writeFileSync(`${folderPath}/jwtPublic.key`, publicKey);
      console.log('Keys written successfully!');
      console.log('The secret is=', secret);
    }
  );
};

const secret = randomBytes(48).toString('hex');
// * save the generated secret key in the .env file
setJWT_KEYS(secret);
