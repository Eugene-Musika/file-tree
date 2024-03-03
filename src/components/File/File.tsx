import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { FileData } from '../../mockAPI/fileTreeMockApi';
import { InsertDriveFile } from '@mui/icons-material';
import React from 'react';

interface Props extends FileData {
	offsetMultiplier?: number;
	isHighlighted?: boolean;
	onContextMenu?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	isFaded?: boolean;
}

export const File: React.FC<Props> = ({
	name,
	onContextMenu,
	offsetMultiplier = 1,
	isHighlighted,
	isFaded,
}) => {
	return (
		<ListItemButton
			onContextMenu={onContextMenu}
			sx={{
				pl: 2 * offsetMultiplier,
				backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
				opacity: isFaded ? 0.5 : 1,
			}}
		>
			<ListItemIcon>
				<InsertDriveFile />
			</ListItemIcon>

			<ListItemText primary={name} />
		</ListItemButton>
	);
};
