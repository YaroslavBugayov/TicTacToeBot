import {Telegraf} from "telegraf";
import {gameService} from "../services/game.service";

export const actions = (bot: Telegraf) => {
    bot.command('create', (ctx) => gameService.createGame(ctx))

    bot.action('join', async (ctx) =>
    {
        await gameService.joinTheGame(ctx)
        ctx.deleteMessage(ctx.message)
    })

    bot.action('delete', async (ctx) => {
        await gameService.deleteGame(ctx)
        ctx.deleteMessage(ctx.message)
    })

    bot.action('no', (ctx) => ctx.deleteMessage(ctx.message))
}