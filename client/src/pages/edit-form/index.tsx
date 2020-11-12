import React from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import { notification, Spin } from 'antd';
import {
  PrimaryTitle,
  ContentHeader,
  FormContainer,
  ActionButton,
  CancelButton,
  WhitelistForm,
} from 'components';
import { EDIT_ITEM, GET_SINGLE_ITEM } from '../../graphql';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';

const NewUserContainer = styled.section`
  ${FormContainer}
  width: 700px;

  ${ActionButton}
  ${CancelButton}
`;

interface ParamTypes {
  id: string;
}

const EditForm: React.FC = () => {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();

  const { data } = useQuery(GET_SINGLE_ITEM, { variables: { id } });

  const [editItem, { loading: editingItem }] = useMutation(EDIT_ITEM);

  const onFinish = (values: any) => {
    const { lisencePlate, fromTime, toTime } = values;

    editItem({
      variables: {
        id,
        lisencePlate,
        fromTime: fromTime ? moment(fromTime).format('HH:mm A') : null,
        toTime: toTime ? moment(toTime).format('HH:mm A') : null,
      },
    }).then((res: any) => {
      const {
        data: {
          updateItem: { status, message },
        },
      } = res;

      if (status) {
        notification['success']({
          message,
        });
        history.push('/whitelist');
      } else {
        notification['error']({
          message,
        });
      }
    });
  };

  return (
    <NewUserContainer>
      <ContentHeader>
        <PrimaryTitle>Edit Item</PrimaryTitle>
      </ContentHeader>
      <Spin spinning={!data}>
        {data?.getWhiteListItem && (
          <WhitelistForm
            onFinish={onFinish}
            actionLoading={editingItem}
            initialValues={{
              initialValues: {
                lisencePlate: data?.getWhiteListItem?.lisencePlate,
                fromTime: data?.getWhiteListItem?.fromTime
                  ? moment(data?.getWhiteListItem?.fromTime, 'HH:mm')
                  : null,
                toTime: data?.getWhiteListItem?.toTime
                  ? moment(data?.getWhiteListItem?.toTime, 'HH:mm')
                  : null,
              },
            }}
          />
        )}
      </Spin>
    </NewUserContainer>
  );
};

export default EditForm;
