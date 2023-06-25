import styled from 'styled-components';

interface IControlsProps {
  handleDifficultyChange: (difficulty: string) => void;
}

const Controls = ({ handleDifficultyChange }: IControlsProps) => {
  return (
    <ControlWrapper>
      <Button onClick={() => handleDifficultyChange('Beginner')}>Beginner</Button>
      <Button onClick={() => handleDifficultyChange('Intermediate')}>Intermediate</Button>
      <Button onClick={() => handleDifficultyChange('Expert')}>Expert</Button>
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
