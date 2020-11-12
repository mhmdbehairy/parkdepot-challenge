import React from 'react';
import { PrimaryTitle, ContentHeader } from 'components';

const NotFound: React.FC = () => {
  return (
    <ContentHeader>
      <PrimaryTitle>Error 404: Page Not Found</PrimaryTitle>
    </ContentHeader>
  );
};

export default NotFound;
