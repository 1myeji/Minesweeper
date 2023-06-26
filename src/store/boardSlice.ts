import { createSlice } from '@reduxjs/toolkit';
import { checkNeighbor } from '../utils/checkNeighbor';
import { plantMine } from '../utils/plantMine';

export const TD_TYPE = {
  NORMAL: -1, // 아무런 상태도 아닌 기본 칸
  FLAG: -2, // 깃발이 있는 상태
  FLAG_MINE: -3, // 지뢰가 있고 깃발이 있는 상태인 칸
  QUESTION: -4,
  QUESTION_MINE: -5,
  MINE: -6, // 지뢰가 있는 칸
  CLICKED_MINE: -7, // 클릭하여 지뢰가 터진 상태
  OPENED: 0, // 열려있는 칸, 0 이상의 값이면 다
};

interface BoardState {
  tableData: number[][]; // 2차원배열, 각 칸의 TD_TYPE 나타냄
  data: {
    // 보드의 크기, 지뢰의 개수
    width: number;
    height: number;
    mine: number;
  };
  timer: number; // 게임 시간
  result: string; // 게임 결과
  halted: boolean; // 게임이 중단되었는지
  openedCount: number; // 열린 칸의 개수
}

const initialState: BoardState = {
  tableData: [],
  data: {
    width: 8,
    height: 8,
    mine: 10,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setDifficulty: (state, action) => {
      switch (action.payload) {
        case 'Beginner':
          state.data = { width: 8, height: 8, mine: 10 };
          state.tableData = plantMine(state.data.width, state.data.height, state.data.mine);
          break;
        case 'Intermediate':
          state.data = { width: 16, height: 16, mine: 40 };
          state.tableData = plantMine(state.data.width, state.data.height, state.data.mine);
          break;
        case 'Expert':
          state.data = { width: 32, height: 16, mine: 99 };
          state.tableData = plantMine(state.data.width, state.data.height, state.data.mine);
          break;
      }
    },
    setCustomDifficulty: (state, action) => {
      state.data = action.payload;
      state.tableData = plantMine(state.data.width, state.data.height, state.data.mine);
    },
    openTd: (state, action) => {
      const { rowIndex, dataIndex } = action.payload;
      checkNeighbor(state.tableData, rowIndex, dataIndex);
    },
    openMine: (state, action) => {
      const { rowIndex, dataIndex } = action.payload;
      state.tableData[rowIndex][dataIndex] = TD_TYPE.CLICKED_MINE;
      state.halted = true;
    },
    plantFlag: (state, action) => {
      const { rowIndex, dataIndex } = action.payload;
      const cell = state.tableData[rowIndex][dataIndex];
      if (cell === TD_TYPE.NORMAL) state.tableData[rowIndex][dataIndex] = TD_TYPE.FLAG;
      else if (cell === TD_TYPE.MINE) state.tableData[rowIndex][dataIndex] = TD_TYPE.FLAG_MINE;
    },
    plantQuestion: (state, action) => {
      const { rowIndex, dataIndex } = action.payload;
      const cell = state.tableData[rowIndex][dataIndex];
      if (cell === TD_TYPE.FLAG) state.tableData[rowIndex][dataIndex] = TD_TYPE.QUESTION;
      else if (cell === TD_TYPE.FLAG_MINE)
        state.tableData[rowIndex][dataIndex] = TD_TYPE.QUESTION_MINE;
    },
    changeNormal: (state, action) => {
      const { rowIndex, dataIndex } = action.payload;
      const cell = state.tableData[rowIndex][dataIndex];
      if (cell === TD_TYPE.QUESTION) state.tableData[rowIndex][dataIndex] = TD_TYPE.NORMAL;
      else if (cell === TD_TYPE.QUESTION_MINE) state.tableData[rowIndex][dataIndex] = TD_TYPE.MINE;
    },
  },
});

export const {
  setDifficulty,
  setCustomDifficulty,
  openTd,
  openMine,
  plantFlag,
  plantQuestion,
  changeNormal,
} = board.actions;

export default board;
