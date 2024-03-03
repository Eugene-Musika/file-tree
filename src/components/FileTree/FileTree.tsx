import { FileTreeData, getFileTree } from '../../mockAPI/fileTreeMockApi';
import { HighlightedTreeData, searchFileInTree } from './helpers/searchFileInTree';
import { useEffect, useState } from 'react';

import { FileTreeList } from '../FileTreeList';
import { TextField } from '@mui/material';
import { findItem } from './helpers/findItem';
import { pasteItem } from './helpers/pasteItem';
import styled from '@emotion/styled';

const Container = styled.div`
	width: 360px;
	background-color: #fff;
`;

interface Props {
	forUser: string;
}

export const FileTree: React.FC<Props> = ({ forUser }) => {
	const [data, setData] = useState<FileTreeData>([]);
	const [searchData, setSearchData] = useState<HighlightedTreeData[] | null>(null);

	useEffect(() => {
		getFileTree(forUser).then(response => {
			setData(response.data);
		});
	}, [forUser]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (value) {
			setSearchData(searchFileInTree(data, value));
		} else {
			setSearchData(null);
		}
	};

	const handleReplaceItem = (cutItemPath: string, targetItemPath: string) => {
		setData(prevData => {
			let newData = prevData;

			try {
				newData = pasteItem({
					items: prevData,
					cutItemPath,
					targetItemPath,
				});
			} catch (e: any) {
				window.alert(e.message);
			}

			return newData;
		});
	};

	const handleDeleteItem = (itemPath: string) => {
		setData(prevData => {
			const deletedItemData = findItem(prevData, itemPath.split('/').slice(1));

			if (!deletedItemData) return prevData;

			const deletedItemIndex = deletedItemData.parent.indexOf(deletedItemData.item);
			deletedItemData.parent.splice(deletedItemIndex, 1);

			return [...prevData];
		});
	};

	return (
		<Container>
			<TextField
				label="Search"
				fullWidth
				variant="filled"
				inputProps={{ type: 'search' }}
				onChange={handleSearch}
			/>
			<FileTreeList
				data={searchData || data}
				onReplaceItem={handleReplaceItem}
				onDeleteItem={handleDeleteItem}
			/>
		</Container>
	);
};
