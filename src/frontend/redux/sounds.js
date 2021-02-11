import { createSlice } from "@reduxjs/toolkit";

const initialState = { sounds: [] };

const slice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setSounds(state, { payload: sounds }) {
      console.log("state", state, sounds);
      state.sounds = sounds;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const fetchSounds = () => async (dispatch) => {
  const response = await fetch("/api/sounds");
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  console.log("fetchSounds", body);

  dispatch(slice.actions.setSounds(body));
};

export default slice.reducer;

export const getSound = (index) => (state) => state.sounds[index];

export const getSoundCount = (state) => state.sounds.length;
