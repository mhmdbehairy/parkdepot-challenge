import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Input, TimePicker, Button, Popconfirm } from 'antd';

const { Item } = Form;

interface FormProps {
  onFinish: (values: any) => void;
  actionLoading: boolean;
  initialValues?: {
    initialValues: {
      lisencePlate: string;
      fromTime: moment.Moment | null;
      toTime: moment.Moment | null;
    };
  };
}

const WhitelistForm: React.FC<FormProps> = ({
  onFinish,
  actionLoading: loading,
  initialValues,
}) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const myRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(
    initialValues && initialValues?.initialValues?.fromTime ? false : true
  );

  const fromPickerBlur = (time: any) => {
    form.setFieldsValue({
      fromTime: time,
    });
    setDisabled(false);
  };

  const toPickerBlur = (time: any) => {
    form.setFieldsValue({
      toTime: time,
    });
  };

  const updateDisabled = () => {
    form.setFieldsValue({
      toTime: null,
    });
    (myRef as any).current.blur();
    setDisabled(true);
  };

  return (
    <Form {...initialValues} form={form} onFinish={onFinish} layout="vertical">
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
              onChange={updateDisabled}
              format="HH:mm"
            />
          </Item>
        </Col>

        <Col span={12}>
          <Item name="toTime" label="To">
            <TimePicker
              ref={myRef}
              size="large"
              showNow
              onSelect={toPickerBlur}
              format="HH:mm"
              disabled={disabled}
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
  );
};

export default WhitelistForm;
