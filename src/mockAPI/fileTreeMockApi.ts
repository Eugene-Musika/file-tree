import fileTreeData from './fileTreeData.json';

export interface FileData {
	name: string;
	type: 'FILE';
	id: number;
}

export interface FolderData {
	name: string;
	type: 'FOLDER';
	id: number;
	children: Array<FolderData | FileData>;
}

export type FileTreeData = Array<FileData | FolderData>;
type RawFileTreeData = Array<(FileData | FolderData) & { allowed?: string[] }>;

export async function getFileTree(name?: string): Promise<{ data: FileTreeData }> {
	return new Promise(resolve => {
		setTimeout(() => {
			const rawData = fileTreeData.data as RawFileTreeData;

			resolve({ data: filterData([...rawData], name) });
		}, 1000);
	});
}

function filterData(data: RawFileTreeData, name?: string) {
	let filteredData: Array<FileData | FolderData> = [];

	for (const item of data) {
		let allowedItem: FileData | FolderData | null = null;

		if (item.allowed) {
			if (name && item.allowed.includes(name)) {
				const { allowed, ...filteredItem } = item;
				allowedItem = filteredItem;
			}
		} else {
			allowedItem = item;
		}

		if (allowedItem && 'children' in allowedItem) {
			allowedItem.children = filterData(allowedItem.children, name);
		}

		if (allowedItem) {
			filteredData.push(allowedItem);
		}
	}

	return filteredData;
}
