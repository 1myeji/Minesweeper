import styled from 'styled-components';

const Cell = () => {
  return <CellButton />;
};

export default Cell;

const CellButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #c0c0c0;
  border: 1px solid #808080;
`;
