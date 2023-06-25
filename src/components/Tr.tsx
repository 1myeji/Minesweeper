import { RootState } from '../store/store';
import Td from './Td';
import { useSelector } from 'react-redux';

const Tr = () => {
  const tableData = useSelector((state: RootState) => state.board.tableData);

  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill(undefined)
          .map((td, i) => <Td />)}
    </tr>
  );
};

export default Tr;
