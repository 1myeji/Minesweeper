import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import styled from 'styled-components';
import { CODE, openTd } from '../store/boardSlice';

interface ITdProps {
  rowIndex: number;
  dataIndex: number;
}

const tdBackgroundColors: { [key: number]: string } = {
  [CODE.MINE]: 'red',
  [CODE.NORMAL]: 'lightgrey',
  [CODE.FLAG]: 'blue',
  [CODE.FLAG_MINE]: 'purple',
  [CODE.CLICKED_MINE]: 'black',
  [CODE.OPENED]: 'white',
};

const Td = ({ rowIndex, dataIndex }: ITdProps) => {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.board.tableData);
  const tdState = tableData[rowIndex][dataIndex];
  const tdBackgroundColor = tdBackgroundColors[tdState];

  const renderTdContent = () => {
    if (tdState === CODE.FLAG || tdState === CODE.FLAG_MINE) {
      return '🚩';
    } else if (tdState === CODE.CLICKED_MINE) {
      return '💣';
    } else if (tdState >= CODE.OPENED) {
      return tdState; // 숫자 표시 (0이상)
    }
    return '';
  };

  const handleOpenChange = () => {
    dispatch(openTd({ rowIndex, dataIndex }));
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
