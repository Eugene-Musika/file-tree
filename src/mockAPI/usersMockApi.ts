import users from './usersMockData.json';

export interface User {
	name: string;
	photo: string;
}

export function getUsers(): Promise<User[]> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(users as User[]);
		}, 1000);
	});
}
