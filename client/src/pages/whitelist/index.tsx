import React from 'react';
import { Table } from 'antd';
import styled from '@emotion/styled';
import { PrimaryTitle, ContentHeader, PrimaryButton } from 'components';

const WhitelistContainer = styled.section``;

const WhiteList: React.FC = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
    },
    {
      title: 'From',
      dataIndex: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
    },
  ];

  return (
    <WhitelistContainer>
      <ContentHeader>
        <PrimaryTitle>Whitelist</PrimaryTitle>
        <PrimaryButton>Add Item</PrimaryButton>
      </ContentHeader>

      <Table
        bordered
        dataSource={[]}
        columns={columns}
        //loading={}
        rowKey="id"
        //pagination={{}}
      />
    </WhitelistContainer>
  );
};

export default WhiteList;
