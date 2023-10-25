import {Telegraf} from "telegraf";
import {gameController} from "../controllers/game.controller";

export const actions = (bot: Telegraf) => {
    bot.command('create', (ctx) => gameController.createGame(ctx))

    bot.action('join', async (ctx) => {
        let res = await gameController.joinTheGame(ctx)
        if (res != null) {
            ctx.deleteMessage(ctx.message)
        }
    })

    bot.action('delete', async (ctx) => {
        await gameController.deleteGame(ctx)
        ctx.deleteMessage(ctx.message)
    })

    bot.action('no', (ctx) => ctx.deleteMessage(ctx.message))

    bot.action('start', (ctx) => gameController.startGame(ctx))

    bot.action('00', (ctx) => gameController.makeMove(ctx, 0, 0))
    bot.action('01', (ctx) => gameController.makeMove(ctx, 0, 1))
    bot.action('02', (ctx) => gameController.makeMove(ctx, 0, 2))
    bot.action('10', (ctx) => gameController.makeMove(ctx, 1, 0))
    bot.action('11', (ctx) => gameController.makeMove(ctx, 1, 1))
    bot.action('12', (ctx) => gameController.makeMove(ctx, 1, 2))
    bot.action('20', (ctx) => gameController.makeMove(ctx, 2, 0))
    bot.action('21', (ctx) => gameController.makeMove(ctx, 2, 1))
    bot.action('22', (ctx) => gameController.makeMove(ctx, 2, 2))

}