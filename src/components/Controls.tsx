import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setCustomDifficulty } from '../store/boardSlice';
import { useState } from 'react';

interface IControlsProps {
  handleDifficultyChange: (difficulty: string) => void;
}

const Controls = ({ handleDifficultyChange }: IControlsProps) => {
  const dispatch = useDispatch();
  const [customWidth, setCustomWidth] = useState(8);
  const [customHeight, setCustomHeight] = useState(8);
  const [customBombs, setCustomBombs] = useState(10);

  return (
    <ControlWrapper>
      <Button onClick={() => handleDifficultyChange('Beginner')}>Beginner</Button>
      <Button onClick={() => handleDifficultyChange('Intermediate')}>Intermediate</Button>
      <Button onClick={() => handleDifficultyChange('Expert')}>Expert</Button>
      <div>
        <CustomInput
          placeholder="Game Width"
          value={customWidth}
          onChange={e => setCustomWidth(Number(e.target.value))}
        />
        <CustomInput
          placeholder="Game Height"
          value={customHeight}
          onChange={e => setCustomHeight(Number(e.target.value))}
        />
        <CustomInput
          placeholder="Number of Bombs"
          value={customBombs}
          onChange={e => setCustomBombs(Number(e.target.value))}
        />
        <Button
          onClick={() =>
            dispatch(
              setCustomDifficulty({ width: customWidth, height: customHeight, mine: customBombs }),
            )
          }
        >
          Custom Game Setup
        </Button>
      </div>
    </ControlWrapper>
  );
};

export default Controls;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
`;

const CustomInput = styled.input`
  margin-left: 10px;
  padding: 5px;
  font-size: 10px;
  text-align: center;
  width: 90px;
`;
