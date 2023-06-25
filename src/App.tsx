import styled from 'styled-components';
import Controls from './components/Controls';
import Board from './components/Board';
import { RootState } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setDifficulty } from './store/boardSlice';

const App = () => {
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const handleDifficultyChange = (difficulty: string) => {
    dispatch(setDifficulty(difficulty));
  };

  return (
    <AppWrapper>
      <Controls handleDifficultyChange={handleDifficultyChange} />
      <Board width={board.data.width} height={board.data.height} mine={board.data.mine} />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  margin-top: 50px;
`;
