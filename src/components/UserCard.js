import React, { useState } from 'react';
import {
	EditOutlined,
	DeleteOutlined,
	HeartOutlined,
	HeartFilled,
	MailOutlined,
	PhoneOutlined,
	GlobalOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Popconfirm, Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';

const { Meta } = Card;
const UserCard = ({ user, action, reactState }) => {
	const dispatch = useDispatch()
	const { isUserDeleteLoading } = useSelector((state) => state.users);
	const { id, name, username, email, phone, website } = user;
	const { handleUserDelete } = action;
	const [selectedId,setSelected] = useState(null)
	return (
		<Card
			style={{ width: 300,margin:'15px' }}
			size={'small'}
			cover={
				<img
					style={{ backgroundColor: '#F5F5F5',height:'200px' }}
					alt='example'
					src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`}
				/>
			}
			actions={[
				<>
					{!reactState && (
						<HeartOutlined
							onClick={() =>
								dispatch(
									userActions.setStoreReactCollection(id)
								)
							}
							key='heartOutline'
							style={{ color: 'red', fontSize: '20px' }}
						/>
					)}
					{reactState && (
						<HeartFilled
							onClick={() =>
								dispatch(
									userActions.setStoreReactCollection(id)
								)
							}
							key='heartOutline'
							style={{ color: 'red', fontSize: '20px' }}
						/>
					)}
				</>,
				<EditOutlined
					onClick={() => dispatch(userActions.handleUserEdit(user))}
					key='edit'
					style={{ fontSize: '20px' }}
				/>,
				<>
					{isUserDeleteLoading && user.id === selectedId ? <Spin /> : <Popconfirm
							placement='topLeft'
							title={`Are you sure to delete ${name}?`}
							description={'Delete the user'}
							onConfirm={() => {
								handleUserDelete(user);
								setSelected(id)
							}}
							okText='Yes'
							cancelText='No'
						>
							<DeleteOutlined
								key='delete'
								style={{ fontSize: '20px' }}
							/>
						</Popconfirm>}
				</>,
			]}
		>
			<Meta title={name} />
			<Space direction='vertical' size={3}>
				<div style={{ marginTop: '5px' }}>
					<Space size={10}>
						<MailOutlined style={{ fontSize: '18px' }} />
						{email}
					</Space>
				</div>
				<div>
					<Space size={10}>
						<PhoneOutlined style={{ fontSize: '18px' }} />
						{phone}
					</Space>
				</div>
				<div>
					<Space size={10}>
						<GlobalOutlined style={{ fontSize: '18px' }} />
						{website}
					</Space>
				</div>
			</Space>
		</Card>
	);
};

export default UserCard;
