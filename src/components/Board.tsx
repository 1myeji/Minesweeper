import styled from 'styled-components';
import Cell from './Cell';

interface IBoardProps {
  width: number;
  height: number;
  mine: number;
}

const Board = ({ width, height, mine }: IBoardProps) => {
  return (
    <BoardWrapper width={width}>
      {Array.from({ length: width * height }).map((_, index) => (
        <Cell key={index} />
      ))}
    </BoardWrapper>
  );
};

export default Board;

const BoardWrapper = styled.div<{ width: number }>`
  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 30px);
  justify-content: center;
`;
