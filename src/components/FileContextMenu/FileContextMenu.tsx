import { ContentCut, ContentPaste, Delete } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';

interface Props {
	position: { x: number; y: number } | null;
	onClose: () => void;
	onAction: (action: 'cut' | 'paste' | 'delete') => void;
	showPaste?: boolean;
}

export const FileContextMenu: React.FC<Props> = ({
	position,
	onClose,
	onAction,
	showPaste,
}) => {
	return (
		<Menu
			open={position !== null}
			onClose={onClose}
			anchorReference="anchorPosition"
			anchorPosition={position !== null ? { top: position.y, left: position.x } : undefined}
		>
			<MenuList>
				<MenuItem onClick={() => onAction('cut')}>
					<ListItemIcon>
						<ContentCut fontSize="small" />
					</ListItemIcon>
					<ListItemText>Cut</ListItemText>
				</MenuItem>

				{showPaste && (
					<MenuItem onClick={() => onAction('paste')}>
						<ListItemIcon>
							<ContentPaste fontSize="small" />
						</ListItemIcon>
						<ListItemText>Paste</ListItemText>
					</MenuItem>
				)}

				<MenuItem onClick={() => onAction('delete')}>
					<ListItemIcon>
						<Delete fontSize="small" />
					</ListItemIcon>
					<ListItemText>Delete</ListItemText>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
