import React, { useState } from 'react';
import { Button, Modal, Space, Table, notification } from 'antd';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { PrimaryTitle, ContentHeader, PrimaryButton, Can } from 'components';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_ITEM, GET_WHITELIST_ITEMS, ME_QUERY } from '../../graphql';

const WhitelistContainer = styled.section`
  .action-btn {
    padding: 5px 10px;
  }
`;

const WhiteList: React.FC = () => {
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const { data, loading } = useQuery(GET_WHITELIST_ITEMS, {
    fetchPolicy: 'network-only',
  });

  const [deleteItem, { loading: deletingItem }] = useMutation(DELETE_ITEM);

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
      render: (item: any) => {
        return (
          <Space>
            <Can
              perform="UPDATE_ITEM"
              yes={
                <Button
                  className="action-btn"
                  type="link"
                  onClick={() => history.push(`/edit-item/${item.id}`)}
                >
                  Edit
                </Button>
              }
            />

            <Can
              perform="DELETE_ITEM"
              yes={
                <Button
                  className="action-btn"
                  type="link"
                  danger
                  onClick={async () => {
                    await setItemToDelete(item);
                    setVisible(true);
                  }}
                >
                  Delete
                </Button>
              }
            />
          </Space>
        );
      },
    },
  ];

  const handleOk = async () => {
    await deleteItem({
      variables: {
        id: itemToDelete?.id,
      },
      refetchQueries: () => [
        {
          query: GET_WHITELIST_ITEMS,
        },
      ],
    })
      .then((res: any) => {
        const {
          data: {
            deleteItem: { status, message },
          },
        } = res;

        if (status) {
          notification['success']({
            message,
          });
          history.push('/whitelist');
        }
      })
      .catch((err) => {
        notification['error']({
          message: err.message,
        });
      });

    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <WhitelistContainer>
      <ContentHeader>
        <PrimaryTitle>Whitelist</PrimaryTitle>
        <Can
          perform="CREATE_ITEM"
          yes={
            <PrimaryButton onClick={() => history.push('/new-item')}>
              Add Item
            </PrimaryButton>
          }
        />
      </ContentHeader>

      <Table
        bordered
        dataSource={data?.whitelistitems}
        columns={columns}
        loading={loading || deletingItem}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15'],
          defaultPageSize: 5,
        }}
      />

      <Modal
        title="Are you sure delete this item?"
        visible={visible}
        onOk={handleOk}
        confirmLoading={deletingItem}
        onCancel={handleCancel}
      >
        <p>
          You are about to delete item with license plate:{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {itemToDelete?.lisencePlate}
          </span>
          . Please, confirm your action.
        </p>
      </Modal>
    </WhitelistContainer>
  );
};

export default WhiteList;
