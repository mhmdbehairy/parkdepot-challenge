import React from 'react';
import { Space, Table } from 'antd';
import styled from '@emotion/styled';
import { PrimaryTitle, ContentHeader, PrimaryButton } from 'components';
import { useQuery } from '@apollo/client';
import { GET_WHITELIST_ITEMS } from '../../graphql';

const WhitelistContainer = styled.section``;

const WhiteList: React.FC = () => {
  const { data, loading } = useQuery(GET_WHITELIST_ITEMS, {
    fetchPolicy: 'network-only',
  });

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'License Plate',
      dataIndex: 'lisencePlate',
    },
    {
      title: 'From',
      dataIndex: 'fromTime',
    },
    {
      title: 'To',
      dataIndex: 'toTime',
    },
    {
      title: 'Actions',
      render: () => {
        return (
          <Space size="large">
            <a href="#!">Edit</a>
            <a href="#!">Delete</a>
          </Space>
        );
      },
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
        dataSource={data?.whitelistitems}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15'],
          defaultPageSize: 5,
        }}
      />
    </WhitelistContainer>
  );
};

export default WhiteList;
