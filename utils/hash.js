const { pbkdf2Sync, randomBytes } = require("node:crypto");

module.exports = {
    encrypt: (password) => {
        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return { hash, salt };
    },
    decrypt: (password, salt) => {
        const result = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString(
            'hex',
        );
        return result;
    },
    isMatch: (input, passwordObject) => {
        if (!passwordObject) {
            return false;
        }
        const { currentPassword, salt } = passwordObject;
        const result = pbkdf2Sync(input, salt, 1000, 64, 'sha512').toString(
            'hex',
        );
        if (result === currentPassword) {
            return true;
        }
        return false;
    }
}
