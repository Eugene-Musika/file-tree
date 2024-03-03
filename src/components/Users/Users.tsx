import { User, getUsers } from '../../mockAPI/usersMockApi';
import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';

interface Props {
	onUserChange: (name: string) => void;
	currentUser?: string;
}

const AvatarBlock = styled.div<{ isActive: boolean }>`
	text-align: center;
	color: #fff;
	opacity: ${props => (props.isActive ? 1 : 0.5)};
	cursor: pointer;

	&:hover > * {
		box-shadow: 0 0 0 2px #fff;
	}
`;

export const Users: React.FC<Props> = ({ onUserChange, currentUser }) => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		getUsers().then(users => {
			setUsers(users);
		});
	}, []);

	return (
		<Stack direction="row" spacing={2} sx={{ p: 1 }}>
			{users.map(user => (
				<AvatarBlock isActive={user.name === currentUser} key={user.name}>
					<Avatar
						alt={user.name}
						src={user.photo}
						sx={{
							width: 56,
							height: 56,
						}}
						onClick={() => onUserChange(user.name)}
					/>
					<div>{user.name}</div>
				</AvatarBlock>
			))}
		</Stack>
	);
};
