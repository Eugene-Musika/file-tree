import { FileTree } from '../FileTree';
import { Users } from '../Users';
import styled from '@emotion/styled';
import { useState } from 'react';

const Container = styled.div`
	display: flex;
	height: 100vh;
	background-color: cadetblue;
`;

export const App = () => {
	const [currentUser, setCurrentUser] = useState('Guest');

	return (
		<Container>
			<FileTree forUser={currentUser} />
			<Users onUserChange={setCurrentUser} currentUser={currentUser} />
		</Container>
	);
};
