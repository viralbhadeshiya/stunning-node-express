import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// ====================================================================================
// Bot request scheam for validation
// ====================================================================================

/**
 * createNewBot
 * @method POST
 * @path /bots
 */
export const createNewBotSchema = {
    botName: {
        isString: true,
        isLength: {
            options: {
                min: 5,
            },
        },
        errorMessage: 'Enter valid bot name',
    },
    availablePlatform: {
        isArray: true,
        isIn: ['webchat', 'facebook', 'whatsapp'],
        errorMessage: 'Select valid platform',
    },
};

// Bot Schema
const BotScheam = new Schema(
    {
        botName: {
            type: Schema.Types.String,
            required: true,
        },
        availablePlatform: {
            type: [Schema.Types.String],
            enum: ['webchat', 'facebook', 'whatsapp'],
        },
        botEndpoint: {
            type: Schema.Types.String,
            default: 'http://localhost:3000/',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

export const Bot = model('bot', BotScheam);
export default Bot;
