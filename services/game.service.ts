import * as fs from "fs";
import {GameModel} from "../models/game.model";
import {Context} from "telegraf";
import {messagesModels} from "../bot/messages.models";
import {constants} from "fs";

const db = 'db/'

export const gameService = {
    async createGame(ctx: Context) {
        if (!ctx.from) return
        if (!ctx.message?.chat.id) return
        try {
            await fs.promises.access(`${db}game${ctx.message?.chat.id || ctx.callbackQuery?.message?.chat.id}.json`, constants.F_OK)
            const { text, extra } = messagesModels.gameExists()
            await ctx.reply(text, extra)
        } catch (err) {
            const dataModel: GameModel = {
                firstUserId: ctx.from.id
            }
            await fs.promises.writeFile(`${db}game${ctx.message?.chat.id}.json`, JSON.stringify(dataModel))
            const { text, extra } = messagesModels.joinTheGame(ctx.from.first_name, ctx.from.last_name ?? '')
            await ctx.reply(text, extra)
            console.log(`game${ctx.message?.chat.id} created`)
        }
    },

    async deleteGame(ctx: Context) {
        if (!ctx.callbackQuery?.message) return
        await fs.promises.rm(`${db}game${ctx.callbackQuery.message.chat.id}.json`)
    },

    async joinTheGame(ctx: Context) {
        if (!ctx.callbackQuery?.message) return
        if (!ctx.from) return
        console.log(ctx.callbackQuery.message.chat.id)
        let gameText = await fs.promises.readFile(`${db}game${ctx.callbackQuery.message.chat.id}.json`)
        let dataModel: GameModel = JSON.parse(gameText.toString())
        dataModel.secondUserId = ctx.from.id
        await fs.promises.writeFile(`${db}game${ctx.callbackQuery.message.chat.id}.json`, JSON.stringify(dataModel))
        const { text, extra } = messagesModels.joinedTheGame(ctx.from.first_name, ctx.from.last_name ?? '')
        await ctx.reply(text, extra)
    }
}