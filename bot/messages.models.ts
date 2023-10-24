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
    }

}