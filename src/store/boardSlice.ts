import { createSlice } from '@reduxjs/toolkit';
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
  tableData: number[][];
  data: {
    width: number;
    height: number;
    mine: number;
  };
  timer: number;
  status: 'READY' | 'PLAYING' | 'WIN' | 'LOSE';
  openedCount: number;
}

const initialState: BoardState = {
  tableData: [],
  data: {
    width: 8,
    height: 8,
    mine: 10,
  },
  timer: 0,
  status: 'READY',
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
      const checkNeighbor = (tableData: number[][], rowIndex: number, dataIndex: number) => {
        const [rowLen, colLen] = [tableData.length, tableData[0].length];
        // 현재 칸의 인덱스가 게임판 범위 안에 있는지 확인
        if (rowIndex < 0 || rowIndex >= rowLen || dataIndex < 0 || dataIndex >= colLen) return;
        // 현재 칸이 이미 열려 있을 때는 이 함수를 더 이상 진행하지 않습니다.
        if (tableData[rowIndex][dataIndex] >= TD_TYPE.OPENED) return;
        // 현재 칸이 이미 열려 있거나, 깃발, 물음표 등의 상태인 경우
        if (
          [
            TD_TYPE.OPENED,
            TD_TYPE.FLAG,
            TD_TYPE.FLAG_MINE,
            TD_TYPE.QUESTION_MINE,
            TD_TYPE.QUESTION,
          ].includes(tableData[rowIndex][dataIndex])
        ) {
          return;
        }
        // 현재 칸 주변의 8개 칸을 탐색하기 위한 좌표
        const neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];
        // 주변 지뢰 갯수 계산
        let mineCount = 0;
        neighbors.forEach(([dx, dy]) => {
          const [newX, newY] = [rowIndex + dx, dataIndex + dy];
          if (newX >= 0 && newX < rowLen && newY >= 0 && newY < colLen) {
            if (
              [TD_TYPE.MINE, TD_TYPE.FLAG_MINE, TD_TYPE.QUESTION_MINE].includes(
                tableData[newX][newY],
              )
            ) {
              mineCount++;
            }
          }
        });
        tableData[rowIndex][dataIndex] = mineCount;
        state.openedCount++;
        // 만약 현재 칸 주변에 지뢰가 없으면, 주변 칸들을 재귀적으로 검사
        if (mineCount === 0) {
          neighbors.forEach(([dx, dy]) => {
            const [newX, newY] = [rowIndex + dx, dataIndex + dy];
            checkNeighbor(tableData, newX, newY);
          });
        }
      };
      if (state.tableData[rowIndex][dataIndex] === TD_TYPE.MINE) {
        // 첫 번째 클릭인 경우
        if (state.openedCount === 0) {
          state.tableData = plantMine(state.data.width, state.data.height, state.data.mine, {
            rowIndex,
            dataIndex,
          });
          checkNeighbor(state.tableData, rowIndex, dataIndex);
          state.status = 'PLAYING';
        } else {
          state.tableData[rowIndex][dataIndex] = TD_TYPE.CLICKED_MINE;
          state.status = 'LOSE';
        }
      } else {
        checkNeighbor(state.tableData, rowIndex, dataIndex);
        state.status = 'PLAYING';
      }
      // 모든 안전한 칸이 열렸다면
      if (state.data.width * state.data.height - state.data.mine === state.openedCount) {
        state.status = 'WIN';
      }
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
    resetGame: () => {
      return { ...initialState };
    },
    increaseTime: state => {
      state.timer += 1;
    },
  },
});

export const {
  setDifficulty,
  setCustomDifficulty,
  openTd,
  plantFlag,
  plantQuestion,
  changeNormal,
  resetGame,
  increaseTime,
} = board.actions;

export default board;
