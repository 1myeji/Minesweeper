import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import styled from 'styled-components';
import {
  TD_TYPE,
  changeNormal,
  openMine,
  openTd,
  plantFlag,
  plantQuestion,
} from '../store/boardSlice';

const tdBackgroundColors: { [key: number]: string } = {
  [TD_TYPE.MINE]: 'red',
  [TD_TYPE.NORMAL]: 'lightgrey',
  [TD_TYPE.FLAG]: 'lightgrey',
  [TD_TYPE.FLAG_MINE]: 'lightgrey',
  [TD_TYPE.QUESTION]: 'lightgrey',
  [TD_TYPE.QUESTION_MINE]: 'lightgrey',
  [TD_TYPE.CLICKED_MINE]: 'red',
  [TD_TYPE.OPENED]: 'white',
};

interface ITdProps {
  rowIndex: number;
  dataIndex: number;
}

const Td = ({ rowIndex, dataIndex }: ITdProps) => {
  const dispatch = useDispatch();
  const { tableData, status } = useSelector((state: RootState) => state.board);
  const tdState = tableData[rowIndex][dataIndex];
  const tdBackgroundColor = tdBackgroundColors[tdState];

  const renderTdContent = () => {
    if (tdState === TD_TYPE.NORMAL) return '';
    if (tdState === TD_TYPE.MINE) return '';
    if (tdState === TD_TYPE.CLICKED_MINE) return '💣';
    if (tdState === TD_TYPE.FLAG || tdState === TD_TYPE.FLAG_MINE) return '🚩';
    if (tdState === TD_TYPE.QUESTION || tdState === TD_TYPE.QUESTION_MINE) return '❓';
    if (tdState > TD_TYPE.OPENED) return tdState; // 숫자 표시 (0이상)
    return '';
  };

  const handleOpenChange = () => {
    if (status === 'LOSE') return;
    switch (tdState) {
      case TD_TYPE.OPENED:
      case TD_TYPE.FLAG:
      case TD_TYPE.FLAG_MINE:
      case TD_TYPE.QUESTION:
      case TD_TYPE.QUESTION_MINE:
        return;
      case TD_TYPE.NORMAL:
        dispatch(openTd({ rowIndex, dataIndex }));
        return;
      case TD_TYPE.MINE:
        dispatch(openMine({ rowIndex, dataIndex }));
        return;
      default:
        return;
    }
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    switch (tdState) {
      case TD_TYPE.NORMAL:
      case TD_TYPE.MINE:
        dispatch(plantFlag({ rowIndex, dataIndex }));
        return;
      case TD_TYPE.FLAG:
      case TD_TYPE.FLAG_MINE:
        dispatch(plantQuestion({ rowIndex, dataIndex }));
        return;
      case TD_TYPE.QUESTION:
      case TD_TYPE.QUESTION_MINE:
        dispatch(changeNormal({ rowIndex, dataIndex }));
        return;
      default:
        return;
    }
  };

  return (
    <StyledTd
      tdBackgroundColor={tdBackgroundColor}
      onClick={handleOpenChange}
      onContextMenu={handleRightClick}
    >
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
