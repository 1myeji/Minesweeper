import styled from 'styled-components';

interface IControlsProps {
  handleDifficultyChange: (width: number, height: number, bombs: number) => void;
}

const Controls = ({ handleDifficultyChange }: IControlsProps) => {
  return (
    <ControlWrapper>
      <Button onClick={() => handleDifficultyChange(8, 8, 10)}>Beginner</Button>
      <Button onClick={() => handleDifficultyChange(16, 16, 40)}>Intermediate</Button>
      <Button onClick={() => handleDifficultyChange(32, 16, 99)}>Expert</Button>
      <div>
        <CustomInput placeholder="Game Height" />
        <CustomInput placeholder="Game Width" />
        <CustomInput placeholder="Number of Bombs" />
        <Button>Custom Game Setup</Button>
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
