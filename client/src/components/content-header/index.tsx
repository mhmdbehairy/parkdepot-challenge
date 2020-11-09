import React from 'react';
import styled from '@emotion/styled/macro';

const ContentHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #dfdfdf;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  h1 {
    margin: 15px 0;
  }
`;

const ContentHeader: React.FC = ({ children }) => (
  <ContentHeaderContainer>{children}</ContentHeaderContainer>
);

export default ContentHeader;
