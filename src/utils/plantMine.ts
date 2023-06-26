import { TD_TYPE } from '../store/boardSlice';

// 지뢰를 무작위로 배치하는 함수
export const plantMine = (width: number, height: number, mine: number) => {
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
