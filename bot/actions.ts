import {Telegraf} from "telegraf";
import {buttonsModels} from "./buttons.models";
import {gameService} from "../services/game.service";

export const actions = (bot: Telegraf) => {
    bot.command('start', async (ctx) => {
        await gameService.createGame(ctx.from.id)
        ctx.reply(`${ctx.message.from.first_name} ${ctx.message.from.last_name} has started the game`, buttonsModels.joinTheGame)
    })

    bot.action('join', (ctx) => {
        ctx.editMessageText('Turn')
    })
}