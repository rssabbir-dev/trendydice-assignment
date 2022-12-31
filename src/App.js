import { Col, message, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import FormModal from './components/FormModal';
import SpinnerThreeDot from './components/SpinnerThreeDot/SpinnerThreeDot';
import UserCard from './components/UserCard';

function App() {
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);
	const [isUsersLoading, setIsUsersLoading] = useState(true);
	const [isUserDeleteLoading, setIsUserDeleteLoading] = useState(false);
	const [isUserUpdateLoading, setIsUserUpdateLoading] = useState(false);
	const [reactCollection, setReactCollection] = useState([]);
	const [modalData,setModalData] = useState({})
	const API_URL = 'https://jsonplaceholder.typicode.com';
	useEffect(() => {
		setIsUsersLoading(true);
		const fetchUserData = async () => {
			try {
				const res = await fetch(`${API_URL}/users`);
				const data = await res.json();
				setIsUsersLoading(false);
				setUsers(data);
			} catch (err) {
				console.log(err);
				setIsUsersLoading(false);
			}
		};
		fetchUserData();
	}, []);
	const handleUserReact = (id) => {
		if (reactCollection.includes(id)) {
			const newCollection = reactCollection.filter(react => react !== id)
			setReactCollection(newCollection)
		} else {
			const newCollection = [...reactCollection, id];
			setReactCollection(newCollection);
		}
	};
	const handleUserEdit = (user) => {
		setModalData({})
		setModalData(user)
		setOpen(true)
		console.log(user.name);

	};
	const handleUserEditFormSubmit = (user,id) => {
		setIsUserUpdateLoading(true)
		fetch(`${API_URL}/users/${id}`, {
			method: 'PUT',
			headers: {
				'content-type':'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(res => res.json())
			.then(() => {
				setIsUserUpdateLoading(false)
				setOpen(false)
				user.id = id;
				const existUsers = users.filter(person => person.id !== id);
				const newUsers = [user,...existUsers]
				setUsers(newUsers)
		})
	}
	const handleUserDelete = (targetUser) => {
		setIsUserDeleteLoading(true);
		fetch(`${API_URL}/users/${targetUser.id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then(() => {
				message.success(`Delete ${targetUser.name} Successfully `);
				const newUsers = users.filter(
					(user) => user.id !== targetUser.id
				);
				setUsers(newUsers);
				setIsUserDeleteLoading(false);
			});
	};
	if (isUsersLoading) {
		return <SpinnerThreeDot />;
	}
	return (
		<div>
			<FormModal
				modalAction={[open, setOpen]}
				modalData={modalData}
				handleUserEditFormSubmit={handleUserEditFormSubmit}
				confirmLoading={isUserUpdateLoading}
			/>
			<Row justify={'space-around'} gutter={[0, 30]}>
				{users.map((user) => (
					<Col
						key={user.id}
						className='gutter-row'
						span={{ xs: 12, sm: 6, md: 4, lg: 3 }}
					>
						<UserCard
							action={{
								handleUserReact,
								handleUserEdit,
								handleUserDelete,
							}}
							loadingState={{
								isUserDeleteLoading,
							}}
							reactState={reactCollection.includes(user.id)}
							user={user}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
}

export default App;
