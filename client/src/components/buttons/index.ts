import styled from '@emotion/styled/macro';

const Button = styled.button`
  min-width: 250px;
  border-radius: 0;
  font-size: 16px;
  padding: 0 30px;
  line-height: 1;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  color: #fff;
  &:focus {
    outline: none;
  }
`;

const PrimaryButton = styled(Button)`
  min-width: 170px;
  background-color: #4a4a4a;
  border-color: #4a4a4a;
  border-radius: 0;
  padding: 15px 50px;
  max-height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default PrimaryButton;
