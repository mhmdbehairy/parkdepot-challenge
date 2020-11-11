import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Input,
  Row,
  Col,
  TimePicker,
  Button,
  Popconfirm,
  notification,
} from 'antd';
import {
  PrimaryTitle,
  ContentHeader,
  FormContainer,
  ActionButton,
  CancelButton,
} from 'components';
import { CREATE_ITEM } from '../../graphql';
import { useMutation } from '@apollo/client';
import moment from 'moment';

const { Item } = Form;

const NewUserContainer = styled.section`
  ${FormContainer}
  width: 700px;

  ${ActionButton}
  ${CancelButton}
`;

const CreateForm: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [createItem, { loading }] = useMutation(CREATE_ITEM);

  const onFinish = (values: any) => {
    const { lisencePlate, fromTime, toTime } = values;

    createItem({
      variables: {
        lisencePlate,
        fromTime: moment(fromTime).format('HH:MM A'),
        toTime: moment(toTime).format('HH:MM A'),
      },
    })
      .then((res: any) => {
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
        <PrimaryTitle>Create Item</PrimaryTitle>
      </ContentHeader>

      <Form form={form} onFinish={onFinish} layout="vertical">
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
                loading={loading}
              >
                Create
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
    </NewUserContainer>
  );
};

export default CreateForm;
