import { TD_TYPE } from '../store/boardSlice';

// 클릭한 칸 주변에 있는 지뢰의 수를 계산하고, 만약 주변에 지뢰가 없으면 주변 칸들을 재귀적으로 탐색하여 열어줍니다.
export const checkNeighbor = (tableData: number[][], rowIndex: number, dataIndex: number) => {
  const [rowLen, colLen] = [tableData.length, tableData[0].length];

  // 현재 칸의 인덱스가 게임판 범위 안에 있는지 확인
  if (rowIndex < 0 || rowIndex >= rowLen || dataIndex < 0 || dataIndex >= colLen) {
    return;
  }

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

  // 현재 칸 주변의 8개 칸(상하좌우 대각선 포함)을 탐색하기 위한 좌표
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
        [TD_TYPE.MINE, TD_TYPE.FLAG_MINE, TD_TYPE.QUESTION_MINE].includes(tableData[newX][newY])
      ) {
        mineCount++;
      }
    }
  });

  tableData[rowIndex][dataIndex] = mineCount;

  // 만약 현재 칸 주변에 지뢰가 없으면, 주변 칸들을 재귀적으로 검사하여 엽니다.
  if (mineCount === 0) {
    neighbors.forEach(([dx, dy]) => {
      const [newX, newY] = [rowIndex + dx, dataIndex + dy];
      checkNeighbor(tableData, newX, newY);
    });
  }
};
