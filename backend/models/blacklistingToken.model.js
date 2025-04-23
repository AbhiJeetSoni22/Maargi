import mongoose from 'mongoose';

const blacklistingTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 100 // 24 hours in seconds
    }
});

const BlacklistingToken = mongoose.model('BlacklistingToken', blacklistingTokenSchema);

export default BlacklistingToken;