import { Button, Form, Input, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};


const FormModal = ({
	modalAction,
	modalData,
	handleUserEditFormSubmit,
	confirmLoading,
}) => {
	const antIcon = <LoadingOutlined style={{ fontSize: 18, color:'white',marginRight:'5px' }} spin />;
	const [open, setOpen] = modalAction;
	const { id, name, username, email, phone, website } = modalData;

    const [form] = Form.useForm();
    
	const handleCancel = () => {
        setOpen(false);
        form.resetFields()
	};
	const onFinish = (values) => {
		handleUserEditFormSubmit(values, id);
    };
    
	return (
		<>
			<Modal
				title={name}
				open={open}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					onFinish={onFinish}
				>
					<Form.Item
						name='name'
						label='Name'
						rules={[
							{
								required: true,
							},
						]}
						initialValue={name}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						rules={[
							{
								required: true,
							},
						]}
						initialValue={email}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='phone'
						label='Phone'
						rules={[
							{
								required: true,
							},
						]}
						initialValue={phone}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='website'
						label='Website'
						rules={[
							{
								required: true,
							},
						]}
						initialValue={website}
					>
						<Input />
					</Form.Item>
					<Form.Item {...tailLayout} style={{ textAlign: 'right' }}>
						<Button
							style={{ marginRight: '10px' }}
							onClick={handleCancel}
							disabled={confirmLoading}
						>
							Cancel
						</Button>
						<Button type='primary' htmlType='submit'>
							{confirmLoading ? (
								<span>
									<Spin indicator={antIcon} /> Saving
								</span>
							) : <span>Save</span>}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default FormModal;
