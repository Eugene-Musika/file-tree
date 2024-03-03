import { searchFileInTree } from './searchFileInTree';

const data = [
	{
		name: 'Folder 1',
		children: [
			{
				name: 'File 1',
			},
			{
				name: 'File 2',
			},
			{
				name: 'Folder 1.1',
				children: [
					{
						name: 'File 1.1',
					},
					{
						name: 'File 1.2',
					},
				],
			},
		],
	},
	{
		name: 'FilesFolder 2',
		children: [
			{
				name: 'no one cares',
			},
		],
	},
];

describe('searchFileInTree', () => {
	it('should return an empty array if no matches are found', () => {
		const query = 'something that does not exist in the tree';
		const result = searchFileInTree(data, query);
		expect(result).toEqual([]);
	});

	it('should return the matched items in the tree', () => {
		const query = 'file';
		const result = searchFileInTree(data, query);
		expect(result).toEqual([
			{
				name: 'Folder 1',
				isOpened: true,
				children: [
					{
						name: 'File 1',
						isHighlighted: true,
					},
					{
						name: 'File 2',
						isHighlighted: true,
					},
					{
						name: 'Folder 1.1',
						isOpened: true,
						children: [
							{
								name: 'File 1.1',
								isHighlighted: true,
							},
							{
								name: 'File 1.2',
								isHighlighted: true,
							},
						],
					},
				],
			},
			{
				name: 'FilesFolder 2',
				isHighlighted: true,
				children: [
					{
						name: 'no one cares',
					},
				],
			},
		]);
	});

	it('should also return the matched items in the tree', () => {
		const query = 'file 1.1';
		const result = searchFileInTree(data, query);
		expect(result).toEqual([
			{
				name: 'Folder 1',
				isOpened: true,
				children: [
					{
						name: 'Folder 1.1',
						isOpened: true,
						children: [
							{
								name: 'File 1.1',
								isHighlighted: true,
							},
						],
					},
				],
			},
		]);
	});
});
