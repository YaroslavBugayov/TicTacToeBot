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

    gameField() {
        return {
            text: `Game started`,
            extra: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '0', callback_data: 'no' },
                            { text: '1', callback_data: 'no' },
                            { text: '2', callback_data: 'no' },
                        ],
                        [
                            { text: '3', callback_data: 'no' },
                            { text: '4', callback_data: 'no' },
                            { text: '5', callback_data: 'no' },
                        ],
                        [
                            { text: '6', callback_data: 'no' },
                            { text: '7', callback_data: 'no' },
                            { text: '8', callback_data: 'no' },
                        ]
                    ]
                }
            }
        }
    }

}