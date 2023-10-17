import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import {actions} from "./bot/actions";

dotenv.config()

const token = process.env.BOT_TOKEN

if (token) {
    const bot = new Telegraf(token)
    actions(bot)
    bot.launch()
} else {
    throw new Error('Token not found')
}

