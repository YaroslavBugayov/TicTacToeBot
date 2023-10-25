export const messagesModels = {
    joinTheGame(firstName: string, lastName: string) {
        return {
            text: `${firstName} ${lastName} has started the game`,
            extra: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Join the game', callback_data: 'join' }
                        ]
                    ]
                }
            }
        }
    },

    gameExists() {
        return {
            text: 'Game already exists. Delete old game?',
            extra: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Yes', callback_data: 'delete' },
                            { text: 'No', callback_data: 'no' }
                        ]
                    ]
                }
            }
        }
    },

    joinedTheGame(firstName: string, lastName: string) {
        return {
            text: `${firstName} ${lastName} joined the game`,
            extra: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Start', callback_data: 'start' },
                        ]
                    ]
                }
            }
        }
    },

    gameField(player: string, matrix: number[][] = [[0,0,0],[0,0,0],[0,0,0]]) {
        return {
            text: `${player} player makes move`,
            extra: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: numToText(matrix[0][0]), callback_data: '00' },
                            { text: numToText(matrix[0][1]), callback_data: '01' },
                            { text: numToText(matrix[0][2]), callback_data: '02' },
                        ],
                        [
                            { text: numToText(matrix[1][0]), callback_data: '10' },
                            { text: numToText(matrix[1][1]), callback_data: '11' },
                            { text: numToText(matrix[1][2]), callback_data: '12' },
                        ],
                        [
                            { text: numToText(matrix[2][0]), callback_data: '20' },
                            { text: numToText(matrix[2][1]), callback_data: '21' },
                            { text: numToText(matrix[2][2]), callback_data: '22' },
                        ]
                    ]
                }
            }
        }
    }

}

function numToText(num: number): string {
    switch (num) {
        case 1:
            return 'X'
        case -1:
            return 'O'
        default:
            return ' '
    }
}