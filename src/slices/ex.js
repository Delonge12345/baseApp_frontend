export const setResetStateForNewHand =
    ({ heroActivePlayer, villainActivePlayer }) =>
        async (dispatch) => {
            dispatch(actions.setHeroErrorLastStage(false))
            dispatch(actions.setIsFlop(false))
            dispatch(actions.setIsTurn(false))
            dispatch(actions.setIsRiver(false))
            dispatch(setEvLoss(null))
            dispatch(setIsHeroWin(false))
            dispatch(setShowDown(false))
            dispatch(setIsTradeRound(''))
            dispatch(setSavedHandId(null))
            dispatch(setShowHeroActions(false))
            dispatch(setCurrentAction('action'))
            dispatch(setActionsHistory('', 'over'))
            dispatch(actions.setResetHeroComboState())
            dispatch(actions.setResetPlayersAction())
            dispatch(actions.setResetPlayersActionStake())

            // dispatch(setPlayersActionDone({playerAction: '', isActionDone: false, player: heroActivePlayer}))
            // dispatch(setPlayersActionDone({playerAction: '', isActionDone: false, player: villainActivePlayer}))
            // dispatch(setPlayersActionDone({playerAction: '', isActionDone: false}))

            dispatch(actions.setIsGameEnd(false))
            dispatch(setResetHistoryState())
            dispatch(actions.setResetPlayersActionStake())
            dispatch(actions.setIsLastAction(false))
            dispatch(actions.setEndStatus(''))
        }
