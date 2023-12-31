import styled from 'styled-components';
import Tr from './Tr';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Board = () => {
  const tableData = useSelector((state: RootState) => state.board.tableData);

  return (
    <BoardWrapper>
      <table>
        <tbody>
          {Array(tableData.length)
            .fill(undefined)
            .map((_, index) => (
              <Tr key={index} rowIndex={index} />
            ))}
        </tbody>
      </table>
    </BoardWrapper>
  );
};

export default Board;

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
