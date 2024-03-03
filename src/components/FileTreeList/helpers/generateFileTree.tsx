import { File } from '../../File';
import { FileTreeData } from '../../../mockAPI/fileTreeMockApi';
import { Folder } from '../../Folder';

export function generateFileTree({
	data,
	path = 'root',
	level = 1,
	onContextMenu,
	fadeItemId: cutItemId,
}: {
	data: FileTreeData;
	onContextMenu: (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		path: string,
		id: number,
	) => void;
	fadeItemId?: number;
	path?: string;
	level?: number;
}) {
	return data.map(item => {
		const currentPath = `${path}/${item.name}`;
		const itemProps = {
			key: item.id,
			onContextMenu(e: React.MouseEvent<HTMLElement, MouseEvent>) {
				onContextMenu(e, currentPath, item.id);
			},
			offsetMultiplier: level,
			isFaded: cutItemId === item.id,
		};

		if ('children' in item) {
			return (
				<Folder {...item} {...itemProps}>
					{item.children.length
						? generateFileTree({
								data: item.children,
								path: currentPath,
								level: level + 1,
								onContextMenu,
								fadeItemId: cutItemId,
							})
						: null}
				</Folder>
			);
		}

		return <File {...item} {...itemProps} />;
	});
}
