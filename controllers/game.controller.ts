import * as fs from "fs";
import {GameModel} from "../models/game.model";
import {Context} from "telegraf";
import {messagesModels} from "../bot/messages.models";
import {constants} from "fs";
import {gameService} from "../services/game.service";
import {ResponseModel} from "../models/response.model";

const db = 'db/'

export const gameController = {
    async createGame(ctx: Context) {
        if (!ctx.from) return
        if (!ctx.message?.chat.id) return

        try {
            await fs.promises.access(`${db}game${ctx.message?.chat.id || ctx.message.chat.id}.json`, constants.F_OK)

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

    async joinTheGame(ctx: Context): Promise<void | null> {
        if (!ctx.callbackQuery?.message) return
        if (!ctx.from) return

        let user = await gameService.addSecondUser(ctx.callbackQuery.message.chat.id, ctx.from.id)
        if (user) {
            const { text, extra } = messagesModels.joinedTheGame(ctx.from.first_name, ctx.from.last_name ?? '')
            await ctx.reply(text, extra)
        } else {
            return null
        }
    },

    async startGame(ctx: Context) {
        if (!ctx.callbackQuery?.message) return
        if (!ctx.from) return

        await gameService.createField(ctx.callbackQuery.message.chat.id)

        const { text, extra } = messagesModels.gameField('First')
        await ctx.editMessageText(text, extra)
    },

    async makeMove(ctx: Context, i: number, j: number) {
        if (!ctx.callbackQuery?.message) return
        if (!ctx.from) return
        let data : ResponseModel | undefined = await gameService.makeMove(ctx.callbackQuery.message.chat.id, ctx.from.id, i, j)
        if (data?.message) {
            await ctx.editMessageText(`${data.message}\n${makeText(data.gameModel.data)}`)
        } else if (data?.gameModel) {
            let player
            if (data.gameModel.firstUserId == data.gameModel.makesMove) {
                player = 'First'
            } else if (data.gameModel.secondUserId == data.gameModel.makesMove) {
                player = 'Second'
            } else {
                return
            }
            const { text, extra } = messagesModels.gameField(player, data.gameModel.data)
            await ctx.editMessageText(text, extra)
        }
    }
}

function makeText(data: number[][] | undefined) : string {
    let res = ''
    if (!data) return res
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            res += numToText(data[i][j])
        }
        res += '\n'
    }
    return res
}

function numToText(num: number): string {
    switch (num) {
        case 1:
            return '❌'
        case -1:
            return '⭕'
        default:
            return '➖'
    }
}