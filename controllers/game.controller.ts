import * as fs from "fs";
import {GameModel} from "../models/game.model";
import {Context} from "telegraf";
import {messagesModels} from "../bot/messages.models";
import {constants} from "fs";
import {gameService} from "../services/game.service";

const db = 'db/'

export const gameController = {
    async createGame(ctx: Context) {
        if (!ctx.from) return
        if (!ctx.message?.chat.id) return

        try {
            await fs.promises.access(`${db}game${ctx.message?.chat.id || ctx.callbackQuery?.message?.chat.id}.json`, constants.F_OK)

            const { text, extra } = messagesModels.gameExists()
            await ctx.reply(text, extra)
        } catch (err) {
            await gameService.createGame(ctx.message?.chat.id, ctx.from.id)

            const { text, extra } = messagesModels.joinTheGame(ctx.from.first_name, ctx.from.last_name ?? '')
            await ctx.reply(text, extra)

            console.log(`game${ctx.message?.chat.id} created`)
        }
    },

    async deleteGame(ctx: Context) {
        if (!ctx.callbackQuery?.message) return

        await gameService.deleteGame(ctx.callbackQuery.message.chat.id)

        console.log(`game${ctx.message?.chat.id} deleted`)
    },

    async joinTheGame(ctx: Context) {
        if (!ctx.callbackQuery?.message) return
        if (!ctx.from) return

        await gameService.addSecondUser(ctx.callbackQuery.message.chat.id, ctx.from.id)

        const { text, extra } = messagesModels.joinedTheGame(ctx.from.first_name, ctx.from.last_name ?? '')
        await ctx.reply(text, extra)
    },

    async startGame(ctx: Context) {
        if (!ctx.callbackQuery?.message) return
        if (!ctx.from) return

        await gameService.createField(ctx.callbackQuery.message.chat.id)

        const { text, extra } = messagesModels.gameField()
        await ctx.editMessageText(text, extra)
    }
}