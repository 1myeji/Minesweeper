import { useState } from 'react';
import styled from 'styled-components';

interface IControlsProps {
  handleDifficultyChange: (width: number, height: number, bombs: number) => void;
}

const Controls = ({ handleDifficultyChange }: IControlsProps) => {
  const [customWidth, setCustomWidth] = useState(8);
  const [customHeight, setCustomHeight] = useState(8);
  const [customBombs, setCustomBombs] = useState(10);

  return (
    <ControlWrapper>
      <Button onClick={() => handleDifficultyChange(8, 8, 10)}>Beginner</Button>
      <Button onClick={() => handleDifficultyChange(16, 16, 40)}>Intermediate</Button>
      <Button onClick={() => handleDifficultyChange(32, 16, 99)}>Expert</Button>
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
        <Button onClick={() => handleDifficultyChange(customWidth, customHeight, customBombs)}>
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
