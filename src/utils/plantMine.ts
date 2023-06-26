import { TD_TYPE } from '../store/boardSlice';

interface ExcludePosition {
  rowIndex: number;
  dataIndex: number;
}

export const plantMine = (
  width: number,
  height: number,
  mine: number,
  exclude?: ExcludePosition,
) => {
  // 가능한 모든 칸
  const candidate = Array.from({ length: width * height }, (_, i) => i);

  // 지뢰 위치를 무작위로 선택
  const shuffle = [];

  // exclude가 주어진 경우, 해당 위치를 제거
  if (exclude) {
    const excludeIndex = exclude.rowIndex * height + exclude.dataIndex;
    const excludePos = candidate.indexOf(excludeIndex);
    if (excludePos !== -1) {
      candidate.splice(excludePos, 1);
    }
  }

  while (shuffle.length < mine) {
    const randomIndex = Math.floor(Math.random() * candidate.length);
    const chosen = candidate.splice(randomIndex, 1)[0];
    shuffle.push(chosen);
  }

  // 빈 보드 생성
  const data = Array.from({ length: width }, () => Array(height).fill(TD_TYPE.NORMAL));

  // 지뢰 심기
  shuffle.forEach(chosen => {
    const ver = Math.floor(chosen / height);
    const hor = chosen % height;
    data[ver][hor] = TD_TYPE.MINE;
  });

  return data;
};
