import { Col, message, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import FormModal from './components/FormModal';
import SpinnerThreeDot from './components/SpinnerThreeDot/SpinnerThreeDot';
import UserCard from './components/UserCard';
import { userActions } from './store/userSlice';

function App() {
	const dispatch = useDispatch();
	const { users, isUsersLoading, reactCollection } = useSelector(
		(state) => state.users
	);
	const API_URL = 'https://jsonplaceholder.typicode.com';
	useEffect(() => {
		dispatch(userActions.setUserLoading(true));
		const fetchUserData = async () => {
			try {
				const res = await fetch(`${API_URL}/users`);
				const data = await res.json();
				dispatch(userActions.setUserLoading(false));
				dispatch(userActions.getUser(data));
			} catch (err) {
				console.log(err);
				dispatch(userActions.setUserLoading(false));
			}
		};
		fetchUserData();
	}, [dispatch]);

	useEffect(() => {
		const storedReact = JSON.parse(localStorage.getItem('react'));
		if (storedReact) {
			dispatch(userActions.loadReactCollection(storedReact))
		}
	},[dispatch])

	//Update User Information

	const handleUserEditFormSubmit = (user, id) => {
		dispatch(userActions.setUserUpdateLoading(true));
		fetch(`${API_URL}/users/${id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then(() => {
				dispatch(userActions.setUserUpdateLoading(false));
				dispatch(userActions.setModalOpen(false));

				// const existUsers = users.filter((person) => person.id !== id);
				// const newUsers = [user, ...existUsers];
				// dispatch(userActions.getUser(newUsers));
				const copyUser = JSON.parse(JSON.stringify(users));
				const filteredUser = copyUser.map((person) => {
					if (person.id === id) {
						person.name = user.name;
						person.email = user.email;
						person.phone = user.phone;
						person.website = user.website;
					}
					return person;
				});
				dispatch(userActions.getUser(filteredUser));
			});
	};
	//Delete a user by id
	const handleUserDelete = (targetUser) => {
		dispatch(userActions.setUserDeleteLoading(true));
		fetch(`${API_URL}/users/${targetUser.id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then(() => {
				message.success(`Delete ${targetUser.name} Successfully `);
				const newUsers = users.filter(
					(user) => user.id !== targetUser.id
				);
				dispatch(userActions.getUser(newUsers));
				dispatch(userActions.setUserDeleteLoading(false));
			});
	};
	if (isUsersLoading) {
		return <SpinnerThreeDot />;
	}
	return (
		<Row>
			<FormModal handleUserEditFormSubmit={handleUserEditFormSubmit} />
			<Row justify={'center'}>
				{users.map((user) => (
					<Col
						key={user.id}
						className='gutter-row'
						span={{sm:24,md:12,lg:6}}
					>
						<UserCard
							action={{
								handleUserDelete,
							}}
							reactState={reactCollection.includes(user.id)}
							user={user}
						/>
					</Col>
				))}
			</Row>
		</Row>
	);
}

export default App;
