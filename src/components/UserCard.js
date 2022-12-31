import React from 'react';
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

const { Meta } = Card;
const UserCard = ({ user, action, loadingState,reactState }) => {
	const { id, name, username, email, phone, website } = user;
	const { handleUserDelete, handleUserEdit, handleUserReact } = action;
	const { isUserDeleteLoading } = loadingState;
	return (
		<Card
			style={{ width: 300 }}
			size={'small'}
			cover={
				<img
					style={{ backgroundColor: '#F5F5F5' }}
					alt='example'
					src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`}
				/>
			}
			actions={[
				<>
					{!reactState && (
						<HeartOutlined
							onClick={() => handleUserReact(id)}
							key='heartOutline'
							style={{ color: 'red', fontSize: '20px' }}
						/>
					)}
					{reactState && (
						<HeartFilled
							onClick={() => handleUserReact(id)}
							key='heartOutline'
							style={{ color: 'red', fontSize: '20px' }}
						/>
					)}
				</>,
				<EditOutlined
					onClick={() => handleUserEdit(user)}
					key='edit'
					style={{ fontSize: '20px' }}
				/>,
				<>
					{!isUserDeleteLoading && (
						<Popconfirm
							placement='topLeft'
							title={`Are you sure to delete ${name}?`}
							description={'Delete the user'}
							onConfirm={() => handleUserDelete(user)}
							okText='Yes'
							cancelText='No'
						>
							<DeleteOutlined
								key='delete'
								style={{ fontSize: '20px' }}
							/>
						</Popconfirm>
					)}
					{isUserDeleteLoading && <Spin />}
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
