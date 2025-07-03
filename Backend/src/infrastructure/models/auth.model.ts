import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EMAIL_BLIND_INDEX_SECRET, EMAIL_ENCRYPTION_KEY } from '@constants';
import { Role } from '@domain/entities/enums/role.enum';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // Correct for aes-256-cbc

const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const hexKey = EMAIL_ENCRYPTION_KEY.trim(); // Remove any whitespace
  console.log('Raw EMAIL_ENCRYPTION_KEY:', hexKey); // Debug
  console.log('Raw key length:', hexKey.length); // Should be 64
  const key = Buffer.from(hexKey, 'hex');
  console.log('Decoded key length:', key.length); // Should be 32
  if (key.length !== 32) {
    throw new Error(`Invalid key length: expected 32 bytes, got ${key.length}`);
  }
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text: string): string => {
  try {
    const textParts = text.split(':');
    if (textParts.length !== 2) {
      // Not an encrypted value, return as is.
      return text;
    }
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const hexKey = EMAIL_ENCRYPTION_KEY.trim(); // Remove any whitespace
    console.log('Raw EMAIL_ENCRYPTION_KEY (decrypt):', hexKey); // Debug
    console.log('Raw key length (decrypt):', hexKey.length); // Should be 64
    const key = Buffer.from(hexKey, 'hex');
    console.log('Decoded key length (decrypt):', key.length); // Should be 32
    if (key.length !== 32) {
      throw new Error(
        `Invalid key length (decrypt): expected 32 bytes, got ${key.length}`,
      );
    }
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error('Decryption error:', error.message); // Debug
    return text;
  }
};

export const createBlindIndex = (text: string): string => {
  console.log('EMAIL_BLIND_INDEX_SECRET:', EMAIL_BLIND_INDEX_SECRET); // Debug
  return crypto
    .createHmac('sha256', EMAIL_BLIND_INDEX_SECRET)
    .update(text)
    .digest('hex');
};

export const AuthSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true },
    email: {
      type: String,
      required: true,
      get: decrypt,
    },
    emailHash: { type: String, unique: true, index: true, sparse: true },
    password: { type: String, required: false, select: false },
    role: { type: [String], required: true, enum: Role, default: [Role.USER] },
    currentHashedRefreshToken: { type: String, select: false },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

AuthSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isModified('email')) {
    const plainEmail = this.email;
    if (plainEmail) {
      this.emailHash = createBlindIndex(plainEmail);
      this.email = encrypt(plainEmail);
    }
  }

  next();
});

export interface Auth extends mongoose.Document {
  readonly id: string;
  googleId?: string;
  readonly email: string;
  readonly role: Role[];
  readonly emailHash?: string;
  readonly password?: string;
  readonly currentHashedRefreshToken?: string;
}
