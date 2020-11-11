import React from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import {
  Form,
  Input,
  Row,
  Col,
  TimePicker,
  Button,
  Popconfirm,
  notification,
  Spin,
} from 'antd';
import {
  PrimaryTitle,
  ContentHeader,
  FormContainer,
  ActionButton,
  CancelButton,
} from 'components';
import { EDIT_ITEM, GET_SINGLE_ITEM } from '../../graphql';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';

const { Item } = Form;

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
  const [form] = Form.useForm();
  const history = useHistory();

  const { data } = useQuery(GET_SINGLE_ITEM, { variables: { id } });

  const [editItem, { loading: editingItem }] = useMutation(EDIT_ITEM);

  const onFinish = (values: any) => {
    const { lisencePlate, fromTime, toTime } = values;

    editItem({
      variables: {
        id,
        lisencePlate,
        fromTime,
        toTime,
      },
    })
      .then((res: any) => {
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
        }
      })
      .catch((err) => {
        notification['error']({
          message: err.message,
        });
      });
  };

  const fromPickerBlur = (time: any) => {
    form.setFieldsValue({
      fromTime: time,
    });
  };

  const toPickerBlur = (time: any) => {
    form.setFieldsValue({
      toTime: time,
    });
  };

  return (
    <NewUserContainer>
      <ContentHeader>
        <PrimaryTitle>Edit Item</PrimaryTitle>
      </ContentHeader>

      {data ? (
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            lisencePlate: data?.getWhiteListItem?.lisencePlate,
            fromTime: moment(data?.getWhiteListItem?.fromTime),
            toTime: moment(data?.getWhiteListItem?.toTime),
          }}
          layout="vertical"
        >
          <Row gutter={10}>
            <Col span={12}>
              <Item
                name="lisencePlate"
                label="Plate License"
                rules={[
                  {
                    required: true,
                    message: 'Please input the plate license!',
                  },
                ]}
              >
                <Input placeholder="e.g. AA-AA 1111" size="large" autoFocus />
              </Item>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              <Item name="fromTime" label="From (Optional)">
                <TimePicker
                  size="large"
                  showNow
                  onSelect={fromPickerBlur}
                  format="HH:mm"
                />
              </Item>
            </Col>

            <Col span={12}>
              <Item name="toTime" label="To (Optional)">
                <TimePicker
                  size="large"
                  showNow
                  onSelect={toPickerBlur}
                  format="HH:mm"
                />
              </Item>
            </Col>
          </Row>

          <Row gutter={10} align="middle">
            <Col span={8}>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={editingItem}
                >
                  Edit
                </Button>
              </Item>
            </Col>

            <Col span={8}>
              <Item style={{ margin: 0 }}>
                <Popconfirm
                  title="Are you sure you want to discard?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => history.push('/whitelist')}
                  onCancel={() => {}}
                >
                  <Button type="link" size="large" danger>
                    Cancel
                  </Button>
                </Popconfirm>
              </Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <Spin></Spin>
      )}
    </NewUserContainer>
  );
};

export default EditForm;
