import {Telegraf} from "telegraf";
import {gameController} from "../controllers/game.controller";

export const actions = (bot: Telegraf) => {
    bot.command('create', (ctx) => gameController.createGame(ctx))

    bot.action('join', async (ctx) =>
    {
        await gameController.joinTheGame(ctx)
        ctx.deleteMessage(ctx.message)
    })

    bot.action('delete', async (ctx) => {
        await gameController.deleteGame(ctx)
        ctx.deleteMessage(ctx.message)
    })

    bot.action('no', (ctx) => ctx.deleteMessage(ctx.message))

    bot.action('start', (ctx) => gameController.startGame(ctx))
}