import React from 'react'
import { Input, Checkbox, Modal, Form } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';


type TodoListProps = {
    form: FormInstance
    visible: boolean
    setVisible(value: boolean): void
    onFinish: any
}

export const ModalToDo: React.FC<TodoListProps> = ({
    form,
    visible,
    setVisible,
    onFinish,
}) => {

  return (
    <Modal
        title="ToDo"
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
    >
        <Form
            style={{ width: '300px' }}
            name="todo"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item 
                label="Status"
                name="status" 
                valuePropName="checked"
            >
                <Checkbox/>
            </Form.Item>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Title required!'}]}
            >
                <Input placeholder='Title'/>
            </Form.Item>
            <Form.Item
                label="Body"
                name="body"
                rules={[{ required: true, message: 'Body required!'}]}
            >
                <Input placeholder='Body' />
            </Form.Item>
        </Form>
    </Modal>
  )
}