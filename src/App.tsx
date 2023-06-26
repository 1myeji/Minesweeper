import styled from 'styled-components';
import Controls from './components/Controls';
import Board from './components/Board';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, setDifficulty } from './store/boardSlice';
import { useEffect } from 'react';
import { RootState } from './store/store';

const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.board);

  const handleDifficultyChange = (difficulty: string) => {
    dispatch(resetGame());
    dispatch(setDifficulty(difficulty));
  };

  useEffect(() => {
    dispatch(setDifficulty('Beginner'));
  }, []);

  return (
    <AppWrapper>
      <Controls handleDifficultyChange={handleDifficultyChange} />
      <Board />
      <Status>{status}</Status>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  margin-top: 50px;
`;

const Status = styled.div`
  width: 50px;
  margin: 20px auto 20px;
  font-size: 20px;
  font-weight: 900;
`;
