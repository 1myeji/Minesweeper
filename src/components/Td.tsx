import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import styled from 'styled-components';
import { CODE, openMine, openTd } from '../store/boardSlice';

const tdBackgroundColors: { [key: number]: string } = {
  [CODE.MINE]: 'red',
  [CODE.NORMAL]: 'lightgrey',
  [CODE.FLAG]: 'blue',
  [CODE.FLAG_MINE]: 'purple',
  [CODE.QUESTION]: 'purple',
  [CODE.QUESTION_MINE]: 'blue',
  [CODE.CLICKED_MINE]: 'red',
  [CODE.OPENED]: 'white',
};

interface ITdProps {
  rowIndex: number;
  dataIndex: number;
}

const Td = ({ rowIndex, dataIndex }: ITdProps) => {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.board.tableData);
  const tdState = tableData[rowIndex][dataIndex];
  const tdBackgroundColor = tdBackgroundColors[tdState];

  const renderTdContent = () => {
    if (tdState === CODE.NORMAL) return '';
    if (tdState === CODE.MINE) return '';
    if (tdState === CODE.CLICKED_MINE) return '💣';
    if (tdState === CODE.FLAG || tdState === CODE.FLAG_MINE) return '🚩';
    if (tdState === CODE.QUESTION || tdState === CODE.QUESTION_MINE) return '❓';
    if (tdState >= CODE.OPENED) return tdState; // 숫자 표시 (0이상)
    return '';
  };

  const handleOpenChange = () => {
    switch (tdState) {
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch(openTd({ rowIndex, dataIndex }));
        return;
      case CODE.MINE:
        dispatch(openMine({ rowIndex, dataIndex }));
        return;
    }
  };

  return (
    <StyledTd tdBackgroundColor={tdBackgroundColor} onClick={handleOpenChange}>
      {renderTdContent()}
    </StyledTd>
  );
};

const StyledTd = styled.td<{ tdBackgroundColor: string }>`
  width: 30px;
  height: 30px;
  text-align: center;
  border: 1px solid black;
  background-color: ${({ tdBackgroundColor }) => tdBackgroundColor};
`;

export default Td;
