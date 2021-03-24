import { createSlice } from '@reduxjs/toolkit'

import * as google from '../utils/google'

const initialState = {
  sounds: [],
  feedback: {},
  repetitions: {},
  folderId: '',
  database: '',
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

      state.feedback = {
        ...state.feedback,
        ...update,
        repetition: state.repetitions[update.vibration],
      }
    },
  },
})

export const {
  setSounds,
  setCurrentFeedback,
  setFolderId,
  setDatabase,
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
  const { feedback, database } = getState()

  return google.writeSheet(
    [
      feedback.vibration,
      feedback.index,
      feedback.participant,
      feedback.direction,
      feedback.likertScale,
      feedback.selectionTime,
      feedback.endAudioTime,
      getState().repetitions[feedback.vibration],
    ],
    database
  )
}

export const getDatabase = state => state.database
