import { createSlice } from "@reduxjs/toolkit";

const initialState = { sounds: [], currentSound: {}, repetitions: {} };

const slice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setSounds(state, { payload: sounds }) {
      state.sounds = sounds;
    },
    setCurrentSound(state, { payload: update }) {
      state.currentSound = { ...state.currentSound, ...update };

      if (update.vibration) {
        state.repetitions[update.vibration] =
          (state.repetitions[update.vibration] || 0) + 1;
      }
    },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const fetchSounds = () => async (dispatch) => {
  const response = await fetch("/api/sounds");
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  dispatch(slice.actions.setSounds(body));
};

export default slice.reducer;

export const getSound = (index) => (state) => state.sounds[index];

export const getSoundCount = (state) => state.sounds.length;

export const { setCurrentSound } = slice.actions;

export const sendFeedback = () => (dispatch, getState) =>
  fetch("/api/vibration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...getState().currentSound,
      repetition:
        getState().repetitions[getState().currentSound.vibration] || 0,
    }),
  });
