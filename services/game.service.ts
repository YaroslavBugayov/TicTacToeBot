import fs from "fs";
import {GameModel} from "../models/game.model";
import {ResponseModel} from "../models/response.model";
const db = 'db/'

export const gameService = {
    async addSecondUser(chat_id: number, user_id: number): Promise<GameModel | null> {
        try {
            let gameText = await fs.promises.readFile(`${db}game${chat_id}.json`)
            let dataModel: GameModel = JSON.parse(gameText.toString())
            if (dataModel.firstUserId != user_id) {
                dataModel.secondUserId = user_id
                await fs.promises.writeFile(`${db}game${chat_id}.json`, JSON.stringify(dataModel))
                return dataModel
            }
        } catch (error) {
            return null
        }
        return null
    },

    async deleteGame(chat_id: number) {
        await fs.promises.rm(`${db}game${chat_id}.json`)
    },

    async createGame(chat_id: number, user_id: number) {
        const dataModel: GameModel = {
            firstUserId: user_id
        }
        await fs.promises.writeFile(`${db}game${chat_id}.json`, JSON.stringify(dataModel))
    },

    async createField(chat_id: number): Promise<number[][]> {
        let gameText = await fs.promises.readFile(`${db}game${chat_id}.json`)
        let dataModel: GameModel = JSON.parse(gameText.toString())
        dataModel.data = [[0,0,0],[0,0,0],[0,0,0]]
        dataModel.makesMove = dataModel.firstUserId
        await fs.promises.writeFile(`${db}game${chat_id}.json`, JSON.stringify(dataModel))
        return dataModel.data
    },

    async makeMove(chat_id: number, user_id: number, i: number, j: number):
        Promise<ResponseModel | undefined> {
        let gameText = await fs.promises.readFile(`${db}game${chat_id}.json`)
        let dataModel: GameModel = JSON.parse(gameText.toString())
        if (!dataModel.data) return
        if (dataModel.makesMove != user_id) return
        if (dataModel.data[i][j] != 0) return
        if (dataModel.firstUserId == dataModel.makesMove) {
            dataModel.data[i][j] = 1
            dataModel.makesMove = dataModel.secondUserId
        } else if (dataModel.secondUserId == dataModel.makesMove) {
            dataModel.data[i][j] = -1
            dataModel.makesMove = dataModel.firstUserId
        }
        const res: string | null = calculate(dataModel.data)
        if (res) {
            await fs.promises.rm(`${db}game${chat_id}.json`)
            return {gameModel: dataModel, message: res}
        } else {
            await fs.promises.writeFile(`${db}game${chat_id}.json`, JSON.stringify(dataModel))
            return {gameModel: dataModel, message: null}
        }
    }
}

function calculate(data: number[][]): string | null{
    let sum = 0;
    let res
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            sum += data[i][j];
        }
        res = check(sum)
        if (res) {
            return res
        }
        sum = 0;
    }

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            sum += data[j][i];
        }
        res = check(sum)
        if (res) {
            return res
        }
        sum = 0;
    }

    for (let i = 0; i < data.length; i++) {
        sum += data[i][i];
    }
    res = check(sum)
    if (res) {
        return res
    }
    sum = 0;

    for (let i = 0, j = data.length - 1; i < data.length; i++, j--) {
        sum += data[i][j];
    }
    res = check(sum)
    if (res) {
        return res
    }
    return null
}

function check(sum: number): string | null {
    if (sum == 3) {
        return 'Winner first player'
    }
    if (sum == -3) {
        return 'Winner second player'
    }
    return null
}