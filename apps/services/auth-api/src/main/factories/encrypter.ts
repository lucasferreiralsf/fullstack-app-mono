import { BunEncrypter } from '../../infra/cryptography/bun-encrypter';

export const makeEncrypter = () => new BunEncrypter();
