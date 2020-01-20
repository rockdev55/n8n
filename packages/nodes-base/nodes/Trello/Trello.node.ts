import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	IDataObject,
	INodeTypeDescription,
	INodeExecutionData,
	INodeType,
} from 'n8n-workflow';

import {
	apiRequest,
} from './GenericFunctions';

export class Trello implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Trello',
		name: 'trello',
		icon: 'file:trello.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Create, change and delete boards and cards',
		defaults: {
			name: 'Trello',
			color: '#026aa7',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'trelloApi',
				required: true,
			}
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: "Attachment",
						value: "attachment"
					},
					{
						name: 'Board',
						value: 'board',
					},
					{
						name: 'Card',
						value: 'card',
					},
					{
						name: "Checklist",
						value: "checklist",
					},
					{
						name: "Label",
						value: "label"
					}
					{
						name: 'List',
						value: 'list',
					},
				],
				default: 'card',
				description: 'The resource to operate on.',
			},



			// ----------------------------------
			//         board
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'board',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new board',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a board',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get the data of a board',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a board',
					},
				],
				default: 'create',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         board:create
			// ----------------------------------
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'My board',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'board',
						],
					},
				},
				description: 'The name of the board',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'board',
						],
					},
				},
				description: 'The description of the board',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'board',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Aging',
						name: 'prefs_cardAging',
						type: 'options',
						options: [
							{
								name: 'Pirate',
								value: 'pirate',
							},
							{
								name: 'Regular',
								value: 'regular',
							},
						],
						default: 'regular',
						description: 'Determines the type of card aging that should take place on the board if card aging is enabled.',
					},
					{
						displayName: 'Background',
						name: 'prefs_background',
						type: 'string',
						default: 'blue',
						description: 'The id of a custom background or one of: blue, orange, green, red, purple, pink, lime, sky, grey.',
					},
					{
						displayName: 'Comments',
						name: 'prefs_comments',
						type: 'options',
						options: [
							{
								name: 'Disabled',
								value: 'disabled',
							},
							{
								name: 'Members',
								value: 'members',
							},
							{
								name: 'Observers',
								value: 'observers',
							},
							{
								name: 'Organization',
								value: 'org',
							},
							{
								name: 'Public',
								value: 'public',
							},
						],
						default: 'members',
						description: 'Who can comment on cards on this board.',
					},
					{
						displayName: 'Covers',
						name: 'prefs_cardCovers',
						type: 'boolean',
						default: true,
						description: 'Determines whether card covers are enabled.',
					},
					{
						displayName: 'Invitations',
						name: 'prefs_invitations',
						type: 'options',
						options: [
							{
								name: 'Admins',
								value: 'admins',
							},
							{
								name: 'Members',
								value: 'members',
							},
						],
						default: 'members',
						description: 'Determines what types of members can invite users to join.',
					},
					{
						displayName: 'Keep From Source',
						name: 'keepFromSource',
						type: 'string',
						default: 'none',
						description: 'To keep cards from the original board pass in the value cards.',
					},
					{
						displayName: 'Labels',
						name: 'defaultLabels',
						type: 'boolean',
						default: true,
						description: 'Determines whether to use the default set of labels.',
					},
					{
						displayName: 'Lists',
						name: 'defaultLists',
						type: 'boolean',
						default: true,
						description: 'Determines whether to add the default set of lists to a board(To Do, Doing, Done).It is ignored if idBoardSource is provided.',
					},
					{
						displayName: 'Organization ID',
						name: 'idOrganization',
						type: 'string',
						default: '',
						description: 'The id or name of the team the board should belong to.',
					},
					{
						displayName: 'Permission Level',
						name: 'prefs_permissionLevel',
						type: 'options',
						options: [
							{
								name: 'Organization',
								value: 'org',
							},
							{
								name: 'Private',
								value: 'private',
							},
							{
								name: 'Public',
								value: 'public',
							},
						],
						default: 'private',
						description: 'The permissions level of the board.',
					},
					{
						displayName: 'Power Ups',
						name: 'powerUps',
						type: 'options',
						options: [
							{
								name: 'All',
								value: 'all',
							},
							{
								name: 'Calendar',
								value: 'calendar',
							},
							{
								name: 'Card Aging',
								value: 'cardAging',
							},
							{
								name: 'Recap',
								value: 'recap',
							},
							{
								name: 'Voting',
								value: 'voting',
							},
						],
						default: 'all',
						description: 'The Power-Ups that should be enabled on the new board.',
					},
					{
						displayName: 'Self Join',
						name: 'prefs_selfJoin',
						type: 'boolean',
						default: true,
						description: 'Determines whether users can join the boards themselves or whether they have to be invited.',
					},
					{
						displayName: 'Source IDs',
						name: 'idBoardSource',
						type: 'string',
						default: '',
						description: 'The id of a board to copy into the new board.',
					},
					{
						displayName: 'Voting',
						name: 'prefs_voting',
						type: 'options',
						options: [
							{
								name: 'Disabled',
								value: 'disabled',
							},
							{
								name: 'Members',
								value: 'members',
							},
							{
								name: 'Observers',
								value: 'observers',
							},
							{
								name: 'Organization',
								value: 'org',
							},
							{
								name: 'Public',
								value: 'public',
							},
						],
						default: 'disabled',
						description: 'Who can vote on this board.',
					},
				],
			},

			// ----------------------------------
			//         board:delete
			// ----------------------------------
			{
				displayName: 'Board ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
						resource: [
							'board',
						],
					},
				},
				description: 'The ID of the board to delete.',
			},

			// ----------------------------------
			//         board:get
			// ----------------------------------
			{
				displayName: 'Board ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'board',
						],
					},
				},
				description: 'The ID of the board to get.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'board',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list:<br />closed, dateLastActivity, dateLastView, desc, descData,<br />idOrganization, invitations, invited, labelNames, memberships,<br />name, pinned, powerUps, prefs, shortLink, shortUrl,<br />starred, subscribed, url',
					},
					{
						displayName: 'Plugin Data',
						name: 'pluginData',
						type: 'boolean',
						default: false,
						description: 'Whether to include pluginData on the card with the response.',
					},
				],
			},

			// ----------------------------------
			//         board:update
			// ----------------------------------
			{
				displayName: 'Board ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'board',
						],
					},
				},
				description: 'The ID of the board to update.',
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'board',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Closed',
						name: 'closed',
						type: 'boolean',
						default: false,
						description: 'Whether the board is closed.',
					},
					{
						displayName: 'Description',
						name: 'desc',
						type: 'string',
						default: '',
						description: 'New description of the board',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'New name of the board',
					},
					{
						displayName: 'Organization ID',
						name: 'idOrganization',
						type: 'string',
						default: '',
						description: 'The id of the team the board should be moved to.',
					},
					{
						displayName: 'Subscribed',
						name: 'subscribed',
						type: 'boolean',
						default: false,
						description: 'Whether the acting user is subscribed to the board.',
					},
				],
			},



			// ----------------------------------
			//         card
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'card',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new card',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a card',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get the data of a card',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a card',
					},
				],
				default: 'create',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         card:create
			// ----------------------------------
			{
				displayName: 'List ID',
				name: 'listId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'card',
						],
					},
				},
				description: 'The id of the list to create card in',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'My card',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'card',
						],
					},
				},
				description: 'The name of the card',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'card',
						],
					},
				},
				description: 'The description of the card',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'card',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Due Date',
						name: 'due',
						type: 'dateTime',
						default: '',
						description: 'A due date for the card.',
					},
					{
						displayName: 'Due Complete',
						name: 'dueComplete',
						type: 'boolean',
						default: false,
						description: 'If the card is completed.',
					},
					{
						displayName: 'Position',
						name: 'pos',
						type: 'string',
						default: 'bottom',
						description: 'The position of the new card. top, bottom, or a positive float.',
					},
					{
						displayName: 'Member IDs',
						name: 'idMembers',
						type: 'string',
						default: '',
						description: 'Comma-separated list of member IDs to add to the card.',
					},
					{
						displayName: 'Label IDs',
						name: 'idLabels',
						type: 'string',
						default: '',
						description: 'Comma-separated list of label IDs to add to the card.',
					},
					{
						displayName: 'URL Source',
						name: 'urlSource',
						type: 'string',
						default: '',
						description: 'A source URL to attach to card.',
					},
					{
						displayName: 'Source ID',
						name: 'idCardSource',
						type: 'string',
						default: '',
						description: 'The ID of a card to copy into the new card.',
					},
					{
						displayName: 'Keep from source',
						name: 'keepFromSource',
						type: 'string',
						default: 'all',
						description: 'If using idCardSource you can specify which properties to copy over. all or comma-separated list of: attachments, checklists, comments, due, labels, members, stickers',
					},
				],
			},

			// ----------------------------------
			//         card:delete
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
						resource: [
							'card',
						],
					},
				},
				description: 'The ID of the card to delete.',
			},

			// ----------------------------------
			//         card:get
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'card',
						],
					},
				},
				description: 'The ID of the card to get.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'card',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list:<br />badges, checkItemStates, closed, dateLastActivity, desc,<br />descData, due, email, idBoard, idChecklists, idLabels, idList,<br />idMembers, idShort, idAttachmentCover, manualCoverAttachment<br />, labels, name, pos, shortUrl, url',
					},
					{
						displayName: 'Board',
						name: 'board',
						type: 'boolean',
						default: false,
						description: 'Whether to return the board object the card is on.',
					},
					{
						displayName: 'Board Fields',
						name: 'board_fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list:<br />name, desc, descData, closed, idOrganization, pinned, url, prefs',
					},
					{
						displayName: 'Custom Field Items',
						name: 'customFieldItems',
						type: 'boolean',
						default: false,
						description: 'Whether to include the customFieldItems.',
					},
					{
						displayName: 'Members',
						name: 'members',
						type: 'boolean',
						default: false,
						description: 'Whether to return member objects for members on the card.',
					},
					{
						displayName: 'Member Fields',
						name: 'member_fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list:<br />avatarHash, fullName, initials, username',
					},
					{
						displayName: 'Plugin Data',
						name: 'pluginData',
						type: 'boolean',
						default: false,
						description: 'Whether to include pluginData on the card with the response.',
					},
					{
						displayName: 'Stickers',
						name: 'stickers',
						type: 'boolean',
						default: false,
						description: 'Whether to include sticker models with the response.',
					},
					{
						displayName: 'Sticker Fields',
						name: 'sticker_fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of sticker fields.',
					},
				],
			},

			// ----------------------------------
			//         card:update
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'card',
						],
					},
				},
				description: 'The ID of the card to update.',
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'card',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Attachment Cover',
						name: 'idAttachmentCover',
						type: 'string',
						default: '',
						description: 'The ID of the image attachment the card should use as its cover, or null for none.',
					},
					{
						displayName: 'Board ID',
						name: 'idBoard',
						type: 'string',
						default: '',
						description: 'The ID of the board the card should be on.',
					},
					{
						displayName: 'Closed',
						name: 'closed',
						type: 'boolean',
						default: false,
						description: 'Whether the board is closed.',
					},
					{
						displayName: 'Description',
						name: 'desc',
						type: 'string',
						default: '',
						description: 'New description of the board.',
					},
					{
						displayName: 'Due Date',
						name: 'due',
						type: 'dateTime',
						default: '',
						description: 'A due date for the card.',
					},
					{
						displayName: 'Due Complete',
						name: 'dueComplete',
						type: 'boolean',
						default: false,
						description: 'If the card is completed.',
					},
					{
						displayName: 'Label IDs',
						name: 'idLabels',
						type: 'string',
						default: '',
						description: 'Comma-separated list of label IDs to set on card.',
					},
					{
						displayName: 'List ID',
						name: 'idList',
						type: 'string',
						default: '',
						description: 'The ID of the list the card should be in.',
					},
					{
						displayName: 'Member IDs',
						name: 'idMembers',
						type: 'string',
						default: '',
						description: 'Comma-separated list of member IDs to set on card.',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'New name of the board',
					},
					{
						displayName: 'Position',
						name: 'pos',
						type: 'string',
						default: 'bottom',
						description: 'The position of the card. top, bottom, or a positive float.',
					},
					{
						displayName: 'Subscribed',
						name: 'subscribed',
						type: 'boolean',
						default: false,
						description: 'Whether the acting user is subscribed to the board.',
					},
				],
			},



			// ----------------------------------
			//         list
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'list',
						],
					},
				},
				options: [
					{
						name: 'Archive',
						value: 'archive',
						description: 'Archive/Unarchive a list',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new list',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get the data of a list',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a list',
					},
				],
				default: 'create',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         list:archive
			// ----------------------------------
			{
				displayName: 'List ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'archive',
						],
						resource: [
							'list',
						],
					},
				},
				description: 'The ID of the list to archive or unarchive.',
			},
			{
				displayName: 'Archive',
				name: 'archive',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'archive',
						],
						resource: [
							'list',
						],
					},
				},
				description: 'If the list should be archived or unarchived.',
			},

			// ----------------------------------
			//         list:create
			// ----------------------------------
			{
				displayName: 'Board ID',
				name: 'idBoard',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'list',
						],
					},
				},
				description: 'The ID of the board the list should be created in',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'My list',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'list',
						],
					},
				},
				description: 'The name of the list',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'list',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'List Source',
						name: 'idListSource',
						type: 'string',
						default: '',
						description: 'ID of the list to copy into the new list.',
					},
					{
						displayName: 'Position',
						name: 'pos',
						type: 'string',
						default: 'bottom',
						description: 'The position of the new list. top, bottom, or a positive float.',
					},
				],
			},

			// ----------------------------------
			//         list:get
			// ----------------------------------
			{
				displayName: 'List ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'list',
						],
					},
				},
				description: 'The ID of the list to get.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'list',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         list:update
			// ----------------------------------
			{
				displayName: 'List ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'list',
						],
					},
				},
				description: 'The ID of the list to update.',
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'list',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Board ID',
						name: 'idBoard',
						type: 'string',
						default: '',
						description: 'ID of a board the list should be moved to.',
					},
					{
						displayName: 'Closed',
						name: 'closed',
						type: 'boolean',
						default: false,
						description: 'Whether the list is closed.',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'New name of the list',
					},
					{
						displayName: 'Position',
						name: 'pos',
						type: 'string',
						default: 'bottom',
						description: 'The position of the list. top, bottom, or a positive float.',
					},
					{
						displayName: 'Subscribed',
						name: 'subscribed',
						type: 'boolean',
						default: false,
						description: 'Whether the acting user is subscribed to the list.',
					},
				],
			},

			// ----------------------------------
			//         attachment
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'attachment',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new attachment for a card',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an attachment',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get the data of an attachments',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Returns all attachments for the card',
					}
				],
				default: 'getAll',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         attachment:create
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'attachment',
						],
					},
				},
				description: 'The ID of the card to add attachment to.',
			},
			{
				displayName: 'Source URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'attachment',
						],
					},
				},
				description: 'The URL of the attachment to add.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'attachment',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'MIME Type',
						name: 'mimeType',
						type: 'string',
						default: '',
						placeholder: 'image/png',
						description: 'The MIME type of the attachment to add.',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the attachment to add.',
					},
				],
			},

			// ----------------------------------
			//         attachment:delete
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
						resource: [
							'attachment',
						],
					},
				},
				description: 'The ID of the card that attachment belongs to.',
			},
			{
				displayName: 'Attachment ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
						resource: [
							'attachment',
						],
					},
				},
				description: 'The ID of the attachment to delete.',
			},

			// ----------------------------------
			//         attachment:getAll
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'getAll',
						],
						resource: [
							'attachment',
						],
					},
				},
				description: 'The ID of the card to get attachments.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'getAll',
						],
						resource: [
							'attachment',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         attachment:get
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'attachment',
						],
					},
				},
				description: 'The ID of the card to get attachment.',
			},
			{
				displayName: 'Attachment ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'attachment',
						],
					},
				},
				description: 'The ID of the attachment to get.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'attachment',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         checklist
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'checklist',
						],
					},
				},
				options: [
					{
						name: "Completed CheckItems",
						value: "completedCheckItems",
						description: "Get the completed checklist items on a card"
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new checklist',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a checklist',
					},
					{
						name: 'Delete CheckItem',
						value: 'deleteCheckItem',
						description: 'Delete a checklist item',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get the data of a checklist',
					},
					{
						name: 'Get CheckItem',
						value: 'getCheckItem',
						description: 'Get a specific checkItem on a card',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Returns all checklists for the card',
					},
					{
						name: 'Update CheckItem',
						value: 'updateCheckItem',
						description: 'Update an item in a checklist on a card.',
					}
				],
				default: 'getAll',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         checklist:create
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the card to add checklist to.',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The URL of the checklist to add.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'checklist',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Id Of Checklist Source',
						name: 'idChecklistSource',
						type: 'string',
						default: '',
						description: 'The ID of a source checklist to copy into the new one.',
					},
					{
						displayName: 'Position',
						name: 'pos',
						type: 'string',
						default: '',
						description: 'The position of the checklist on the card. One of: top, bottom, or a positive number.',
					},
				],
			},

			// ----------------------------------
			//         checklist:delete
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the card that checklist belongs to.',
			},
			{
				displayName: 'Checklist ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the checklist to delete.',
			},


			// ----------------------------------
			//         checklist:getAll
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'getAll',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the card to get checklists.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'getAll',
						],
						resource: [
							'checklist',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         checklist:get
			// ----------------------------------
			{
				displayName: 'Checklist ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the checklist to get.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'checklist',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         checklist:deleteCheckItem
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'deleteCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the card that checklist belongs to.',
			},
			{
				displayName: 'CheckItem ID',
				name: 'checkItemId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'deleteCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the checklist to delete.',
			},

			// ----------------------------------
			//         checklist:getCheckItem
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'getCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the card that checklist belongs to.',
			},
			{
				displayName: 'CheckItem ID',
				name: 'checkItemId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'getCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the checklist to get.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'getCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         checklist:updateCheckItem
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'updateCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the card that checklist belongs to.',
			},
			{
				displayName: 'CheckItem ID',
				name: 'checkItemId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'updateCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the checklist item to update.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'updateCheckItem',
						],
						resource: [
							'checklist',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The new name for the checklist item.',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						description: 'One of: complete, incomplete',
					},
					{
						displayName: 'Checklist ID',
						name: 'checklistId',
						type: 'string',
						default: '',
						description: 'The ID of the checklist this item is in',
					},
					{
						displayName: 'Position',
						name: 'pos',
						type: 'string',
						default: '',
						description: 'The position of the checklist on the card. One of: top, bottom, or a positive number.',
					},
				],
			},

			// ----------------------------------
			//         checklist:completedCheckItems
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'completedCheckItems',
						],
						resource: [
							'checklist',
						],
					},
				},
				description: 'The ID of the card for checkItems.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'completedCheckItems',
						],
						resource: [
							'checklist',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of: "idCheckItem", "state".',
					},
				],
			},

			// ----------------------------------
			//         label
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'label',
						],
					},
				},
				options: [
					{
						name: 'Add to Card',
						value: 'addLabel',
						description: 'Add a label to a card.',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new label',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a label',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get the data of a label',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Returns all label for the board',
					},
					{
						name: 'Remove From Card',
						value: 'removeLabel',
						description: 'Remove a label from a card.',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a label.',
					}

				],
				default: 'getAll',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         label:create
			// ----------------------------------
			{
				displayName: 'Board ID',
				name: 'boardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the board to create the label on.',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'Name for the label.',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The color for the label. See [fields](https://developers.trello.com/reference#label-object) for color options.',
			},

			// ----------------------------------
			//         label:delete
			// ----------------------------------
			{
				displayName: 'Label ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the label to delete.',
			},

			// ----------------------------------
			//         label:getAll
			// ----------------------------------
			{
				displayName: 'Board ID',
				name: 'boardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'getAll',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the board to get label.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'getAll',
						],
						resource: [
							'label',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         label:get
			// ----------------------------------
			{
				displayName: 'Label ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'Get information about a label by ID.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'label',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: 'all',
						description: 'Fields to return. Either "all" or a comma-separated list of fields.',
					},
				],
			},

			// ----------------------------------
			//         label:addLabel
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'addLabel',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the card to get label.',
			},
			{
				displayName: 'Label ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'addLabel',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the label to add.',
			},

			// ----------------------------------
			//         label:removeLabel
			// ----------------------------------
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'removeLabel',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the card to remove label from.',
			},
			{
				displayName: 'Label ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'removeLabel',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the label to remove.',
			},

			// ----------------------------------
			//         label:update
			// ----------------------------------
			{
				displayName: 'Label ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'label',
						],
					},
				},
				description: 'The ID of the label to update.',
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'label',
						],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the label.',
					},
					{
						displayName: 'Color',
						name: 'color',
						type: 'string',
						default: '',
						description: 'The color for the label. See [fields](https://developers.trello.com/reference#label-object) for color options.',
					}
				],
			},
		],

	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;
		const resource = this.getNodeParameter('resource', 0) as string;

		// For Post
		let body: IDataObject;
		// For Query string
		let qs: IDataObject;

		let requestMethod: string;
		let endpoint: string;

		for (let i = 0; i < items.length; i++) {
			requestMethod = 'GET';
			endpoint = '';
			body = {};
			qs = {};

			if (resource === 'board') {

				if (operation === 'create') {
					// ----------------------------------
					//         create
					// ----------------------------------

					requestMethod = 'POST';
					endpoint = 'boards';

					qs.name = this.getNodeParameter('name', i) as string;
					qs.desc = this.getNodeParameter('description', i) as string;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'delete') {
					// ----------------------------------
					//         delete
					// ----------------------------------

					requestMethod = 'DELETE';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `boards/${id}`;

				} else if (operation === 'get') {
					// ----------------------------------
					//         get
					// ----------------------------------

					requestMethod = 'GET';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `boards/${id}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'update') {
					// ----------------------------------
					//         update
					// ----------------------------------

					requestMethod = 'PUT';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `boards/${id}`;

					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					Object.assign(qs, updateFields);

				} else {
					throw new Error(`The operation "${operation}" is not known!`);
				}

			} else if (resource === 'card') {

				if (operation === 'create') {
					// ----------------------------------
					//         create
					// ----------------------------------

					requestMethod = 'POST';
					endpoint = 'cards';

					qs.idList = this.getNodeParameter('listId', i) as string;

					qs.name = this.getNodeParameter('name', i) as string;
					qs.desc = this.getNodeParameter('description', i) as string;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'delete') {
					// ----------------------------------
					//         delete
					// ----------------------------------

					requestMethod = 'DELETE';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `cards/${id}`;

				} else if (operation === 'get') {
					// ----------------------------------
					//         get
					// ----------------------------------

					requestMethod = 'GET';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `cards/${id}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'update') {
					// ----------------------------------
					//         update
					// ----------------------------------

					requestMethod = 'PUT';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `cards/${id}`;

					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					Object.assign(qs, updateFields);

				} else {
					throw new Error(`The operation "${operation}" is not known!`);
				}


			} else if (resource === 'list') {

				if (operation === 'archive') {
					// ----------------------------------
					//         archive
					// ----------------------------------

					requestMethod = 'PUT';

					const id = this.getNodeParameter('id', i) as string;
					qs.value = this.getNodeParameter('archive', i) as boolean;

					endpoint = `lists/${id}/closed`;

				} else if (operation === 'create') {
					// ----------------------------------
					//         create
					// ----------------------------------

					requestMethod = 'POST';
					endpoint = 'lists';

					qs.idBoard = this.getNodeParameter('idBoard', i) as string;

					qs.name = this.getNodeParameter('name', i) as string;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'get') {
					// ----------------------------------
					//         get
					// ----------------------------------

					requestMethod = 'GET';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `lists/${id}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'update') {
					// ----------------------------------
					//         update
					// ----------------------------------

					requestMethod = 'PUT';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `lists/${id}`;

					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					Object.assign(qs, updateFields);

				} else {
					throw new Error(`The operation "${operation}" is not known!`);
				}

			} else if (resource === 'attachment') {

				if (operation === 'create') {
					// ----------------------------------
					//         create
					// ----------------------------------

					requestMethod = 'POST';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const url = this.getNodeParameter('url', i) as string;

					Object.assign(qs, {
						url,
					});

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

					endpoint = `cards/${cardId}/attachments`;

				} else if (operation === 'delete') {
					// ----------------------------------
					//         delete
					// ----------------------------------

					requestMethod = 'DELETE';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const id = this.getNodeParameter('id', i) as string;

					endpoint = `cards/${cardId}/attachments/${id}`;

				} else if (operation === 'get') {
					// ----------------------------------
					//         get
					// ----------------------------------

					requestMethod = 'GET';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const id = this.getNodeParameter('id', i) as string;

					endpoint = `cards/${cardId}/attachments/${id}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'getAll') {
					// ----------------------------------
					//         getAll
					// ----------------------------------

					requestMethod = 'GET';

					const cardId = this.getNodeParameter('cardId', i) as string;

					endpoint = `cards/${cardId}/attachments`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);
				} else {
					throw new Error(`The operation "${operation}" is not known!`);
				}
			} else if (resource === 'checklist') {

				if (operation === 'create') {
					// ----------------------------------
					//         create
					// ----------------------------------

					requestMethod = 'POST';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const name = this.getNodeParameter('name', i) as string;

					Object.assign(qs, { name });

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

					endpoint = `cards/${cardId}/checklists`;

				} else if (operation === 'delete') {
					// ----------------------------------
					//         delete
					// ----------------------------------

					requestMethod = 'DELETE';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const id = this.getNodeParameter('id', i) as string;

					endpoint = `cards/${cardId}/checklists/${id}`;

				} else if (operation === 'get') {
					// ----------------------------------
					//         get
					// ----------------------------------

					requestMethod = 'GET';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `checklists/${id}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'getAll') {
					// ----------------------------------
					//         getAll
					// ----------------------------------

					requestMethod = 'GET';

					const cardId = this.getNodeParameter('cardId', i) as string;

					endpoint = `cards/${cardId}/checklists`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);
				} else if (operation === 'getCheckItem') {
					// ----------------------------------
					//         getCheckItem
					// ----------------------------------

					requestMethod = 'GET';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const checkItemId = this.getNodeParameter('checkItemId', i) as string;

					endpoint = `cards/${cardId}/checkItem/${checkItemId}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);
				} else if (operation === 'deleteCheckItem') {
					// ----------------------------------
					//         deleteCheckItem
					// ----------------------------------

					requestMethod = 'DELETE';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const checkItemId = this.getNodeParameter('checkItemId', i) as string;

					endpoint = `cards/${cardId}/checkItem/${checkItemId}`;
				} else if (operation === 'updateCheckItem') {
					// ----------------------------------
					//         updateCheckItem
					// ----------------------------------

					requestMethod = 'PUT';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const checkItemId = this.getNodeParameter('checkItemId', i) as string;

					endpoint = `cards/${cardId}/checkItem/${checkItemId}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);
				} else if(operation ==="completedCheckItems") {
					// ----------------------------------
					//         updateCheckItem
					// ----------------------------------

					requestMethod = 'GET';

					const cardId = this.getNodeParameter('cardId', i) as string;

					endpoint = `cards/${cardId}/checkItemStates`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else {
					throw new Error(`The operation "${operation}" is not known!`);
				}
			} else if (resource === 'label') {

				if (operation === 'create') {
					// ----------------------------------
					//         create
					// ----------------------------------

					requestMethod = 'POST';

					const idBoard = this.getNodeParameter('boardId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const color = this.getNodeParameter('color', i) as string;


					Object.assign(qs, {
						idBoard,
						name,
						color
					});


					endpoint = "labels";

				} else if (operation === 'delete') {
					// ----------------------------------
					//         delete
					// ----------------------------------

					requestMethod = 'DELETE';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `labels/${id}`;

				} else if (operation === 'get') {
					// ----------------------------------
					//         get
					// ----------------------------------

					requestMethod = 'GET';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `labels/${id}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					Object.assign(qs, additionalFields);

				} else if (operation === 'getAll') {
					// ----------------------------------
					//         getAll
					// ----------------------------------

					requestMethod = 'GET';

					const idBoard = this.getNodeParameter('boardId', i) as string;

					endpoint = `board/${idBoard}/labels`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					Object.assign(qs, additionalFields);
				} else if (operation === 'update') {
					// ----------------------------------
					//         update
					// ----------------------------------

					requestMethod = 'PUT';

					const id = this.getNodeParameter('id', i) as string;

					endpoint = `labels/${id}`;

					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					Object.assign(qs, updateFields);

				} else if (operation === 'addLabel') {
					// ----------------------------------
					//         addLabel
					// ----------------------------------

					requestMethod = 'POST';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const id = this.getNodeParameter('id', i) as string;

					qs.value = id;

					endpoint = `/cards/${cardId}/idLabels`;

				} else if (operation === 'removeLabel') {
					// ----------------------------------
					//         addLabel
					// ----------------------------------

					requestMethod = 'DELETE';

					const cardId = this.getNodeParameter('cardId', i) as string;
					const id = this.getNodeParameter('id', i) as string;

					endpoint = `/cards/${cardId}/idLabels/${id}`;

				} else {
					throw new Error(`The operation "${operation}" is not known!`);
				}
			} else {
				throw new Error(`The resource "${resource}" is not known!`);
			}

			const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData as IDataObject);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
