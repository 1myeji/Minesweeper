import { useState } from 'react';
import styled from 'styled-components';
import Controls from './components/Controls';
import Board from './components/Board';

const App = () => {
  const [difficulty, setDifficulty] = useState({ width: 8, height: 8, bombs: 10 });

  const handleDifficultyChange = (width: number, height: number, bombs: number) => {
    setDifficulty({ width, height, bombs });
  };

  return (
    <AppWrapper>
      <Controls handleDifficultyChange={handleDifficultyChange} />
      <Board width={difficulty.width} height={difficulty.height} bombs={difficulty.bombs} />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  margin-top: 50px;
`;
