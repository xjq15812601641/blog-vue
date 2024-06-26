import { encrypt, decrypt } from 'crypto-js/aes';
import { parse } from 'crypto-js/enc-utf8';
import NoPadding from 'crypto-js/pad-nopadding';
import CTR from 'crypto-js/mode-ctr';
import md5 from 'crypto-js/md5';
import UTF8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

/* 加密入参接口 */
export interface EncryptionParams {
  key: string;
  iv: string;
}

/* 创建AES类 */
export class AesEncryption {
  private key;
  private iv;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt;
    if (key) {
      this.key = parse(key);
    }
    if (iv) {
      this.iv = parse(iv);
    }
  }

  get getOptions() {
    return {
      mode: CTR,
      padding: NoPadding,
      iv: this.iv,
    };
  }
  /* AES加解密 */
  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString();
  }
  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}

/* base64方式加解密 */
export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}
export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

/* md5加密 */
export function encryptByMd5(password: string) {
  return md5(password).toString();
}
