import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React from 'react'

const AddExpenseModal = ({ 
    isExpenseModalVisible, 
    handleExpenseCancel, 
    onFinish, 
}) => {
    const[form] = Form.useForm();

    return (
        <Modal 
            style={{ fontWeight: 600 }} 
            title="Add Expense"
            open={isExpenseModalVisible}
            onCancel={handleExpenseCancel}
            footer={null}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={(values) => {
                    onFinish(values, "expense");
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label='Name'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of the transaction!",
                        },
                    ]}
                >
                    <Input type='text' className='custom-input' />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label='Amount'
                    name='amount'
                    rules={[
                        { required: true, message: "Please input the expense amount!"},
                    ]}
                >
                    <Input type='number' className='custom-input' />
                </Form.Item>  
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label='Date'
                    name='date'
                    rules={[
                        { required: true, message: "Please select the expense date!" },
                    ]}
                >
                    <DatePicker format='YYYY-MM-DD' className='custom-input' />
                </Form.Item> 
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label='Tag'
                    name='tag'
                    rules={[{ required: true, message: "Please select a tag!" }]}
                >
                    <Select className='select-input-2'>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='transport'>Transport</Select.Option>
                        <Select.Option value='shopping'>Shopping</Select.Option>
                        <Select.Option value='bills'>Bills</Select.Option>
                        <Select.Option value='healthcare'>Healthcare</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='entertainment'>Entertainment</Select.Option>
                        <Select.Option value='travel'>Travel</Select.Option>
                        <Select.Option value='rent'>Rent</Select.Option>
                        <Select.Option value='emi'>EMI</Select.Option>
                        <Select.Option value='other'>Other</Select.Option>
                    </Select>
                </Form.Item> 
                <Form.Item>
                    <Button className='btn btn-blue' type='primary' htmlType='submit'>
                        Add Expense
                    </Button>
                </Form.Item> 
            </Form>
        </Modal>
    )
}

export default AddExpenseModal