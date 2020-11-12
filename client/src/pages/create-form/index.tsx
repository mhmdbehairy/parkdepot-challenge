import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import {
  PrimaryTitle,
  ContentHeader,
  FormContainer,
  ActionButton,
  CancelButton,
  WhitelistForm,
} from 'components';
import { CREATE_ITEM } from '../../graphql';
import { useMutation } from '@apollo/client';
import moment from 'moment';

const NewUserContainer = styled.section`
  ${FormContainer}
  width: 700px;

  ${ActionButton}
  ${CancelButton}
`;

const CreateForm: React.FC = () => {
  const history = useHistory();

  const [createItem, { loading }] = useMutation(CREATE_ITEM);

  const onFinish = (values: any) => {
    const { lisencePlate, fromTime, toTime } = values;

    createItem({
      variables: {
        lisencePlate,
        fromTime: fromTime ? moment(fromTime).format('HH:mm A') : null,
        toTime: toTime ? moment(toTime).format('HH:mm A') : null,
      },
    }).then((res: any) => {
      const {
        data: {
          createItem: { status, message },
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
        <PrimaryTitle>Create Item</PrimaryTitle>
      </ContentHeader>

      <WhitelistForm onFinish={onFinish} actionLoading={loading} />
    </NewUserContainer>
  );
};

export default CreateForm;
