import { createSlice } from '@reduxjs/toolkit'

import * as google from '../utils/google'

const initialState = {
  sounds: [],
  feedback: {},
  repetitions: {},
  folderId: '',
  database: '',
  isUnilateral: false,
  group: '',
  groupIndex: 0,
  score: 0,
  amplitude: 0,
}

const slice = createSlice({
  name: 'sounds',
  initialState,
  reducers: {
    setSounds(state, { payload: sounds }) {
      state.sounds = sounds
    },
    setFolderId(state, { payload: folderId }) {
      state.folderId = folderId
    },
    setDatabase(state, { payload: database }) {
      state.database = database
    },
    setCurrentFeedback(state, { payload: update }) {
      if (update.vibration) {
        state.repetitions[update.vibration] =
          (state.repetitions[update.vibration] || 0) + 1
      }

      if (
        update.participant &&
        update.participant !== state.feedback.participant
      ) {
        state.score = 0
      }

      state.feedback = {
        ...state.feedback,
        ...update,
        repetition: state.repetitions[update.vibration],
      }
    },
    setUnilateral(state, { payload }) {
      state.isUnilateral = payload
    },
    setGroup(state, { payload }) {
      state.group = payload
      state.groupIndex = 1
    },
    incrementGroup(state) {
      state.groupIndex += 1
    },
    incrementScore(state) {
      state.score += 1
    },
    reinitializeScore(state) {
      state.score = 0
    },
  },
})

export const {
  setSounds,
  setCurrentFeedback,
  setFolderId,
  setDatabase,
  setUnilateral,
  setGroup,
  setSubFolder,
  incrementGroup,
  incrementScore,
  reinitializeScore,
} = slice.actions

// export const fetchSounds = () => async dispatch => {
//   const response = await fetch('/api/sounds')
//   const body = await response.json()
//   if (response.status !== 200) throw Error(body.message)

//   dispatch(setSounds(body))
// }

export default slice.reducer

export const getSound = index => state => state.sounds[index]

export const getSoundCount = state => state.sounds.length

export const getFolderId = state => state.folderId

export const sendFeedback = () => (dispatch, getState) => {
  const state = getState()
  const { feedback, database, score } = state

  const row = [
    feedback.vibration,
    feedback.index,
    feedback.participant,
    feedback.signal,
    '',
    '',
    feedback.startGameTime,
    feedback.endAudioTime,
    feedback.selectionTime,
    state.repetitions[feedback.vibration],
    isUnilateral(state),
    getGroup(state).name,
    getGroupIndex(state),
    feedback.gameOverCount,
    score,
    feedback.amplitude,
  ]

  const rawLogs = localStorage.getItem('logs') || 'null'

  const logs = JSON.parse(rawLogs) || []

  localStorage.setItem('logs', JSON.stringify([...logs, row]))

  return google.writeSheet(row, database)
}

export const sendGlobalFeedback = () => (dispatch, getState) => {
  const state = getState()
  const { feedback, database } = state

  const row = [
    '',
    '',
    feedback.participant,
    '',
    feedback.notificationDifferenceLikertScale,
    feedback.directionClarityLikertScale,
    '',
    '',
    '',
    '',
    isUnilateral(state),
    getGroup(state).name,
    getGroupIndex(state),
    '',
    '',
    feedback.amplitude,
  ]

  const logs = JSON.parse(localStorage.getItem('logs') || 'null') || []

  localStorage.setItem('logs', JSON.stringify([...logs, row]))

  return google.writeSheet(row, database)
}

export const isUnilateral = state => state.isUnilateral

export const getGroup = state => state.group

export const getGroupIndex = state => state.groupIndex

export const getDatabase = state => state.database

export const getScore = state => state.score

export const getFeedback = state => state.feedback
