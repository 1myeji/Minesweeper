import styled from 'styled-components';
import Controls from './components/Controls';
import Board from './components/Board';
import { useDispatch, useSelector } from 'react-redux';
import { increaseTime, resetGame, setDifficulty } from './store/boardSlice';
import { useEffect } from 'react';
import { RootState } from './store/store';

const App = () => {
  const dispatch = useDispatch();
  const { status, timer } = useSelector((state: RootState) => state.board);

  const handleDifficultyChange = (difficulty: string) => {
    dispatch(resetGame());
    dispatch(setDifficulty(difficulty));
  };

  useEffect(() => {
    dispatch(setDifficulty('Beginner'));
  }, []);

  useEffect(() => {
    let timer = 0;
    if (status === 'PLAYING') {
      timer = setInterval(() => {
        dispatch(increaseTime());
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [status]);

  return (
    <AppWrapper>
      <Controls handleDifficultyChange={handleDifficultyChange} />
      <Board />
      <Status>
        <p>{status}</p>
        <Timer>Timer: {timer}</Timer>
      </Status>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  margin-top: 50px;
`;

const Status = styled.div`
  justify-content: center;
  margin: 20px 0 20px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  gap: 20px;
`;

const Timer = styled.p`
  color: red;
`;
