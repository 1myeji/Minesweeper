import { RootState } from '../store/store';
import Td from './Td';
import { useSelector } from 'react-redux';

interface ITrProps {
  rowIndex: number;
}

const Tr = ({ rowIndex }: ITrProps) => {
  const tableData = useSelector((state: RootState) => state.board.tableData);

  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill(undefined)
          .map((_, index) => <Td key={index} rowIndex={rowIndex} dataIndex={index} />)}
    </tr>
  );
};

export default Tr;
