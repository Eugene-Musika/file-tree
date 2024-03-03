import { FileTreeData } from '../../../mockAPI/fileTreeMockApi';

export function findItem(data: FileTreeData, itemPath: string[]) {
	const foundItem = data.find(item => item.name === itemPath[0]);

	if (foundItem && (itemPath.length === 1 || foundItem?.type === 'FILE')) {
		return {
			item: foundItem,
			parent: data,
		};
	}

	if (foundItem?.type === 'FOLDER') {
		return findItem(foundItem.children, itemPath.slice(1));
	}

	return null;
}
