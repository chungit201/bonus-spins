import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '.'

export interface CounterState {
  email: string,
  password: string
}

const initialState: CounterState = {
  email: "",
  password: ""
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountData: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const {setAccountData} = counterSlice.actions

export default counterSlice.reducer
