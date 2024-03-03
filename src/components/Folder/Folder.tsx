import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
	ExpandLess,
	ExpandMore,
	Folder as FolderClosed,
	FolderOpen,
} from '@mui/icons-material';

import { useState } from 'react';

interface Props {
	name: string;
	id: number;
	offsetMultiplier?: number;
	isHighlighted?: boolean;
	isFaded?: boolean;
	isOpened?: boolean;
	onContextMenu?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Folder: React.FC<React.PropsWithChildren<Props>> = ({
	name,
	children,
	offsetMultiplier = 1,
	isHighlighted,
	isOpened: isOpenedProp,
	onContextMenu,
	isFaded,
}) => {
	const [isOpened, setIsOpened] = useState(false);

	const handleClick = () => {
		setIsOpened(!isOpened);
	};

	return (
		<>
			<ListItemButton
				onContextMenu={onContextMenu}
				onClick={handleClick}
				sx={{
					pl: 2 * offsetMultiplier,
					backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
					opacity: isFaded ? 0.5 : 1,
				}}
			>
				<ListItemIcon>
					{isOpenedProp || isOpened ? <FolderOpen /> : <FolderClosed />}
				</ListItemIcon>
				<ListItemText primary={name} />
				{children && (isOpenedProp || isOpened ? <ExpandLess /> : <ExpandMore />)}
			</ListItemButton>

			{children && (
				<Collapse in={isOpenedProp || isOpened} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{children}
					</List>
				</Collapse>
			)}
		</>
	);
};
