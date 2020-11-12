import React from 'react';
import { PrimaryTitle, ContentHeader } from 'components';

const Unauthorized: React.FC = () => {
  return (
    <ContentHeader>
      <PrimaryTitle>Error 401: Unauthorized Access</PrimaryTitle>
    </ContentHeader>
  );
};

export default Unauthorized;
