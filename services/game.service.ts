import fs from "fs";
import {GameModel} from "../models/game.model";
const db = 'db/'

export const gameService = {
    async createField(chat_id: number) {
        let gameText = await fs.promises.readFile(`${db}game${chat_id}.json`)
        let dataModel: GameModel = JSON.parse(gameText.toString())
        dataModel.data = [[0,0,0],[0,0,0],[0,0,0]]
        await fs.promises.writeFile(`${db}game${chat_id}.json`, JSON.stringify(dataModel))
    },

    async addSecondUser(chat_id: number, user_id: number) {
        let gameText = await fs.promises.readFile(`${db}game${chat_id}.json`)
        let dataModel: GameModel = JSON.parse(gameText.toString())
        dataModel.secondUserId = user_id
        await fs.promises.writeFile(`${db}game${chat_id}.json`, JSON.stringify(dataModel))
    },

    async deleteGame(chat_id: number) {
        await fs.promises.rm(`${db}game${chat_id}.json`)
    },

    async createGame(chat_id: number, user_id: number) {
        const dataModel: GameModel = {
            firstUserId: user_id
        }
        await fs.promises.writeFile(`${db}game${chat_id}.json`, JSON.stringify(dataModel))
    }
}