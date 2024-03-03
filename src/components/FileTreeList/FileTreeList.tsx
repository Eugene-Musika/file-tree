import { FileContextMenu } from '../FileContextMenu';
import { FileTreeData } from '../../mockAPI/fileTreeMockApi';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { generateFileTree } from './helpers/generateFileTree';
import { useState } from 'react';

interface Props {
	data: FileTreeData;
	onReplaceItem: (cutItemPath: string, targetItemPath: string) => void;
	onDeleteItem: (itemPath: string) => void;
}

export const FileTreeList: React.FC<Props> = ({ data, onReplaceItem, onDeleteItem }) => {
	const [contextMenu, setContextMenu] = useState<{
		mouseX: number;
		mouseY: number;
		itemPath: string;
		itemId: number;
	} | null>(null);
	const [cutItem, setCutItem] = useState<{ id: number; path: string } | null>(null);

	const handleContextMenu = (event: React.MouseEvent, path: string, id: number) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
						itemPath: path,
						itemId: id,
					}
				: null,
		);
	};

	const handleContextClose = () => {
		setContextMenu(null);
	};

	const handleCut = () => {
		if (contextMenu === null) return;

		setCutItem({ id: contextMenu.itemId, path: contextMenu.itemPath });
		handleContextClose();
	};

	const handlePaste = () => {
		if (cutItem === null || !contextMenu) return;

		setCutItem(null);
		onReplaceItem(cutItem.path, contextMenu.itemPath);
		handleContextClose();
	};

	const handleDelete = () => {
		if (contextMenu === null) return;

		onDeleteItem(contextMenu.itemPath);
	};

	const handleContextAction = (action: 'cut' | 'paste' | 'delete') => {
		switch (action) {
			case 'cut':
				handleCut();
				break;
			case 'paste':
				handlePaste();
				break;
			case 'delete':
				handleDelete();
				break;
		}
	};

	return (
		<>
			<List
				sx={{ width: '100%' }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						File Explorer
					</ListSubheader>
				}
			>
				{generateFileTree({ data, onContextMenu: handleContextMenu, fadeItemId: cutItem?.id })}
			</List>

			<FileContextMenu
				position={contextMenu ? { x: contextMenu.mouseX, y: contextMenu.mouseY } : null}
				onClose={handleContextClose}
				onAction={handleContextAction}
				showPaste={cutItem !== null}
			/>
		</>
	);
};
