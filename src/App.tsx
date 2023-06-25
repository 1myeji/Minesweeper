import styled from 'styled-components';
import Controls from './components/Controls';
import Board from './components/Board';
import { useDispatch } from 'react-redux';
import { setDifficulty } from './store/boardSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  const handleDifficultyChange = (difficulty: string) => {
    dispatch(setDifficulty(difficulty));
  };

  useEffect(() => {
    dispatch(setDifficulty('Beginner'));
  }, []);

  return (
    <AppWrapper>
      <Controls handleDifficultyChange={handleDifficultyChange} />
      <Board />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  margin-top: 50px;
`;
