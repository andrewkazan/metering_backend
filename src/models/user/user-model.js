import config from 'config';
import { promisify } from 'util';
import { pbkdf2, randomBytes } from 'crypto';
import mongoose from 'mongoose';

const randomBytesPromise = promisify(randomBytes);
const pbkdf2Promise = promisify(pbkdf2);

const GLOBAL_SALT = config.get('auth.salt');
const USER_SALT_LENGTH = config.get('auth.userSaltLength');
const ITERATIONS = config.get('auth.iterations');
const HASH_LENGTH = config.get('auth.hashLength');
const HASH_ALGORITHM = config.get('auth.hashAlgorithm');

function createSalt() {
  return randomBytesPromise(USER_SALT_LENGTH).then((buffer) => buffer.toString('hex'));
}

function createHash(password, salt) {
  return pbkdf2Promise(password, `${salt}${GLOBAL_SALT}`, ITERATIONS, HASH_LENGTH, HASH_ALGORITHM).then((buffer) =>
    buffer.toString('hex'),
  );
}

function removeProperties(...properties) {
  return function (doc, ret, options) {
    for (const prop of properties) {
      delete ret[prop];
    }
    return ret;
  };
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      select: false,
    },
    oauth: [
      {
        _id: false,
        provider: { type: String, required: true },
        id: { type: String, required: true },
        accessToken: String,
        refreshToken: String,
      },
    ],
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  },
  {
    toObject: {
      transform: removeProperties('password', 'salt'),
    },
    toJSON: {
      transform: removeProperties('password', 'salt'),
    },
  },
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.salt = await createSalt();
    this.password = await createHash(this.password, this.salt);
  }
});

userSchema.methods.checkPassword = async function (password) {
  const hash = await createHash(password, this.salt);
  return hash === this.password;
};

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email }, {}).select('+password +salt');

  if (!user) {
    return false;
  }

  if (!(await user.checkPassword(password))) {
    return false;
  }

  return user;
};

export const UserModel = mongoose.model('user', userSchema);
