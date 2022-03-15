import React from 'react';
import { Form } from 'antd';

const FormItem = ({ label, name, rules, className, initialValue, full, button, children, ...props }) => {
  return (
    <Form.Item
      hasFeedback={rules?.required || false}
      wrapperCol={button && { span: 24 }}
      initialValue={initialValue}
      className={`${full && 'col-span-full w-full '} ${button && 'col-span-full  w-full mt-2  pt-4 text-left mb-0'} ` + className}
      label={label}
      name={name}
      rules={rules}
      {...props}>
      {children}
    </Form.Item>
  );
};

export default FormItem;
