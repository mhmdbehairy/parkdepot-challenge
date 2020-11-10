import styled from '@emotion/styled';
import { css } from '@emotion/core';

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

const ActionButton = css`
  .ant-btn-primary {
    height: 50px;
    min-width: 170px;
    margin-top: 30px;
    border-radius: 0;
    background-color: #4a4a4a;
    border-color: #4a4a4a;

    &:focus {
      background-color: #3aa0ff;
      border-color: #3aa0ff;
    }

    :active {
      background-color: #3aa0ff;
      border-color: #3aa0ff;
    }

    &:hover {
      background-color: #1890ff;
      border-color: #1890ff;
    }
  }
`;

const CancelButton = css`
  .ant-btn-link {
    color: #4a4a4a;

    span {
      text-decoration: underline;
    }

    &:focus {
      color: #3aa0ff;
    }

    :active {
      color: #3aa0ff;
    }

    &:hover {
      color: #1890ff;
    }
  }
`;

export { PrimaryButton, ActionButton, CancelButton };
