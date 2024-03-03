import { FileData, FileTreeData, FolderData } from '../../../mockAPI/fileTreeMockApi';

export type HighlightedTreeData = (FileData | (FolderData & { isOpened?: boolean })) & {
	isHighlighted?: boolean;
};

export function searchFileInTree(data: FileTreeData, query: string) {
	const filteredData: Array<HighlightedTreeData> = [];

	for (const item of data) {
		let matchedItem: HighlightedTreeData | null = null;

		if ('children' in item) {
			const children = searchFileInTree(item.children, query);

			if (children.length) {
				matchedItem = {
					...item,
					isOpened: true,
					children,
				};
			}
		}

		if (item.name.toLowerCase().includes(query.toLowerCase())) {
			if (matchedItem) {
				matchedItem.isHighlighted = true;
			} else {
				matchedItem = {
					...item,
					isHighlighted: true,
				};
			}
		}

		if (matchedItem) {
			filteredData.push(matchedItem);
		}
	}

	return filteredData;
}
