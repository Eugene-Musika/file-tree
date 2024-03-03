import { createDraft, current } from 'immer';

import { FileTreeData } from '../../../mockAPI/fileTreeMockApi';
import { findItem } from './findItem';

export function pasteItem({
	items,
	cutItemPath,
	targetItemPath,
}: {
	items: FileTreeData;
	cutItemPath: string;
	targetItemPath: string;
}) {
	const draft = createDraft(items);
	const cutItemSplittedPath = cutItemPath.split('/');
	const targetItemSplittedPath = targetItemPath.split('/');
	const cutItemData = findItem(draft, cutItemSplittedPath.slice(1));
	const targetItemData = findItem(draft, targetItemSplittedPath.slice(1));

	if (!cutItemData || !targetItemData) {
		throw new Error('Item not found');
	}

	const cutItemIndex = cutItemData.parent.indexOf(cutItemData.item);
	const targetChildren =
		targetItemData.item.type === 'FOLDER'
			? targetItemData.item.children
			: targetItemData.parent;

	if (targetChildren.includes(cutItemData.item)) {
		return items;
	}

	if (targetChildren.find(item => item.name === cutItemData.item.name)) {
		throw new Error(`${cutItemData.item.type} with such name already exists`);
	}

	cutItemData.parent.splice(cutItemIndex, 1);
	targetChildren.push(cutItemData.item);

	return current(draft);
}
