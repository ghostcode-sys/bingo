import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playername:"",
    myTurn: false,
    count: 0,
    playerCount:0,
}

const playerSlice = createSlice({
    name:'playerReducer',
    initialState,
    reducers:{
        setPlayerName : (state, action)=> {
            state.playername = action.payload.playername;
            if(action.payload.playername !== action.payload.playerTurn){
                state.myTurn = true;
            }
        },
        removePlayerName: (state) => {
            state.playername = "";
            state.myTurn = false;
            state.count = 0;
        },
        alterTurn: (state) => {
            state.myTurn = !state.myTurn
        },
        setCount: (state, action) => {
            state.count = action.payload
        },
        setPlayerCount: (state, action) => {
            state.playerCount = action.payload
        }
     }
})

export const {setPlayerName, removePlayerName, alterTurn, setCount, setPlayerCount} = playerSlice.actions;

export default playerSlice.reducer