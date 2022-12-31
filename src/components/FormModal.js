import { Button, Form, Input, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';

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

const FormModal = ({ handleUserEditFormSubmit }) => {
    const [form] = Form.useForm();
	const {
		isUserUpdateLoading: confirmLoading,
		modalData,
		modalOpen: open,
	} = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const antIcon = (
		<LoadingOutlined
			style={{ fontSize: 18, color: 'white', marginRight: '5px' }}
			spin
		/>
	);
	const { id, name, username, email, phone, website } = modalData;

	
	const handleCancel = () => {
		dispatch(userActions.setModalOpen(false));
		form.resetFields();
	};
	const onFinish = (values) => {
		handleUserEditFormSubmit(values, id);
	};
	form.setFieldsValue({
		name,
		email,
		phone,
		website,
	});
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
							) : (
								<span>Save</span>
							)}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default FormModal;
