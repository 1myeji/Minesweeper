import { createSlice } from '@reduxjs/toolkit';

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

// 지뢰를 무작위로 배치하는 함수
const plantMine = (width: number, height: number, mine: number) => {
  // 가능한 모든 칸 ex) [0, 1, ..., 99]
  const candidate = Array.from({ length: width * height }, (_, i) => i);

  // 지뢰 위치를 무작위로 선택, ex) [4, 7, 11, ...]
  const shuffle = [];
  while (shuffle.length < mine) {
    const randomIndex = Math.floor(Math.random() * candidate.length);
    const chosen = candidate.splice(randomIndex, 1)[0];
    shuffle.push(chosen);
  }

  // 빈 보드 생성  [ [-1, -1, -1], [-1, -1, -1], [-1, -1, -1] ]
  const data = Array.from({ length: width }, () => Array(height).fill(TD_TYPE.NORMAL));

  // 지뢰 심기
  shuffle.forEach(chosen => {
    const ver = Math.floor(chosen / height);
    const hor = chosen % height;
    data[ver][hor] = TD_TYPE.MINE;
  });

  return data;
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
      // 이웃한 Td의 TD_TYPE을 담을 배열
      let neighborTd: number[] = [];
      let mineCount = 0;
      // 윗줄
      neighborTd = state.tableData[rowIndex - 1]
        ? neighborTd.concat(
            state.tableData[rowIndex - 1][dataIndex - 1],
            state.tableData[rowIndex - 1][dataIndex],
            state.tableData[rowIndex - 1][dataIndex + 1],
          )
        : neighborTd;

      // 아랫줄
      neighborTd = state.tableData[rowIndex + 1]
        ? neighborTd.concat(
            state.tableData[rowIndex + 1][dataIndex - 1],
            state.tableData[rowIndex + 1][dataIndex],
            state.tableData[rowIndex + 1][dataIndex + 1],
          )
        : neighborTd;

      // 양 옆
      neighborTd = neighborTd.concat(
        state.tableData[rowIndex][dataIndex - 1],
        state.tableData[rowIndex][dataIndex + 1],
      );

      console.log(neighborTd);

      // neightborTd 배열 중 지뢰의 개수
      mineCount = neighborTd.filter((data: number) =>
        [TD_TYPE.MINE, TD_TYPE.FLAG_MINE, TD_TYPE.QUESTION_MINE].includes(data),
      ).length;

      state.tableData[rowIndex][dataIndex] = mineCount;
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
