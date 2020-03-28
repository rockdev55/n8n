import { INodeProperties } from "n8n-workflow";

export const customerOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new customer',
			},
			{
				name: 'Properties',
				value: 'properties',
				description: 'Get customer property definitions',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all customers',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a customer',
			},
		],
		default: 'create',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const customerFields = [
/* -------------------------------------------------------------------------- */
/*                                customer:create                             */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Resolve Data',
		name: 'resolveData',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		description: 'By default the response only contain the ID to resource<br />. If this option gets activated it<br />will resolve the data automatically.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		options: [
			{
				displayName: 'Age',
				name: 'age',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: `Customer’s age`,
			},
			{
				displayName: 'Notes',
				name: 'background',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: `Notes`,
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: `First name of the customer. When defined it must be between 1 and 40 characters.`,
			},
			{
				displayName: 'Gender',
				name: 'gender',
				type: 'options',
				options: [
					{
						name: 'Female',
						value: 'female',
					},
					{
						name: 'Male',
						value: 'male',
					},
					{
						name: 'Unknown',
						value: 'unknown',
					},
				],
				default: '',
				description: 'Gender of this customer.',
			},
			{
				displayName: 'Job Title',
				name: 'jobTitle',
				type: 'string',
				default: '',
				description: 'Job title. Max length 60 characters.',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the customer',
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				description: 'Location of the customer.',
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
				description: 'Organization',
			},
			{
				displayName: 'Photo Url',
				name: 'photoUrl',
				type: 'string',
				default: '',
				description: 'URL of the customer’s photo',
			},
		]
	},
	{
		displayName: 'Address',
		name: 'addressUi',
		placeholder: 'Add Address',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Address',
				name: 'addressValue',
				values: [
					{
						displayName: 'Line 1',
						name: 'line1',
						type: 'string',
						default: '',
						description: 'line1',
					},
					{
						displayName: 'Line 2',
						name: 'line2',
						type: 'string',
						default: '',
						description: 'line2',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'City',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						description: 'State',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getCountriesCodes',
						},
						default: '',
						description: 'Country',
					},
					{
						displayName: 'Postal Code',
						name: 'postalCode',
						type: 'string',
						default: '',
						description: 'Postal code',
					},
				],
			},
		],
	},
	{
		displayName: 'Chat Handles',
		name: 'chatsUi',
		placeholder: 'Add Chat Handle',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Chat Handle',
				name: 'chatsValues',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'aim',
								value: 'aim',
							},
							{
								name: 'gtalk',
								value: 'gtalk',
							},
							{
								name: 'icq',
								value: 'icq',
							},
							{
								name: 'msn',
								value: 'msn',
							},
							{
								name: 'other',
								value: 'other',
							},
							{
								name: 'qq',
								value: 'qq',
							},
							{
								name: 'skype',
								value: 'skype',
							},
							{
								name: 'xmpp',
								value: 'xmpp',
							},
							{
								name: 'yahoo',
								value: 'yahoo',
							},
						],
						description: 'Chat type',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Chat handle',
					},
				],
			},
		],
	},
	{
		displayName: 'Emails',
		name: 'emailsUi',
		placeholder: 'Add Email',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Email',
				name: 'emailsValues',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Home',
								value: 'home',
							},
							{
								name: 'Other',
								value: 'other',
							},
							{
								name: 'Work',
								value: 'work',
							},
						],
						description: 'Location for this email address',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Email',
					},
				],
			},
		],
	},
	{
		displayName: 'Phones',
		name: 'phonesUi',
		placeholder: 'Add Phone',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Email',
				name: 'phonesValues',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Fax',
								value: 'fax',
							},
							{
								name: 'Home',
								value: 'home',
							},
							{
								name: 'Other',
								value: 'other',
							},
							{
								name: 'Pager',
								value: 'pager',
							},
							{
								name: 'Work',
								value: 'work',
							},
						],
						description: 'Location for this phone',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Phone',
					},
				],
			},
		],
	},
	{
		displayName: 'Social Profiles',
		name: 'socialProfilesUi',
		placeholder: 'Add Social Profile',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Social Profile',
				name: 'socialProfilesValues',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'About Me',
								value: 'aboutMe',
							},
							{
								name: 'Facebook',
								value: 'facebook',
							},
							{
								name: 'Flickr',
								value: 'flickr',
							},
							{
								name: 'Forsquare',
								value: 'forsquare',
							},
							{
								name: 'Google',
								value: 'google',
							},
							{
								name: 'Google Plus',
								value: 'googleplus',
							},
							{
								name: 'Linkedin',
								value: 'linkedin',
							},
							{
								name: 'Other',
								value: 'other',
							},
							{
								name: 'Quora',
								value: 'quora',
							},
							{
								name: 'Tungleme',
								value: 'tungleme',
							},
							{
								name: 'Twitter',
								value: 'twitter',
							},
							{
								name: 'Youtube',
								value: 'youtube',
							},
						],
						description: 'Type of social profile',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Social Profile handle (url for example)',
					},
				],
			},
		],
	},
	{
		displayName: 'Websites',
		name: 'websitesUi',
		placeholder: 'Add Website',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'customer',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Website',
				name: 'websitesValues',
				values: [
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Website URL',
					},
				],
			},
		],
	},
/* -------------------------------------------------------------------------- */
/*                                customer:getAll                             */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'getAll',
				],
			},
		},
		options: [
			{
				displayName: 'Mailbox ID',
				name: 'mailbox',
				type: 'string',
				default: '',
				description: 'Filters customers from a specific mailbox',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'Filters customers by first name',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Filters customers by last name',
			},
			{
				displayName: 'Modified Since',
				name: 'modifiedSince',
				type: 'dateTime',
				default: '',
				description: 'Returns only customers that were modified after this date',
			},
			{
				displayName: 'Sort Field',
				name: 'sortField',
				type: 'options',
				options: [
					{
						name: 'Score',
						value: 'score',
					},
					{
						name: 'First Name',
						value: 'firstName',
					},
					{
						name: 'Last Name',
						value: 'lastName',
					},
					{
						name: 'Modified At',
						value: 'modifiedAt',
					},
				],
				default: 'score',
				description: 'Sorts the result by specified field',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{
						name: 'ASC',
						value: 'asc',
					},
					{
						name: 'Desc',
						value: 'desc',
					},
				],
				default: 'desc',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Advanced search <a href="https://developer.helpscout.com/mailbox-api/endpoints/customers/list/#query">Examples</a>'
			},
		],
	},
/* -------------------------------------------------------------------------- */
/*                                customer:get                                */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'get',
				],
			},
		},
		description: 'Customer ID',
	},
/* -------------------------------------------------------------------------- */
/*                                customer:update                             */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'customer',
				],
			},
		},
		description: 'Customer ID',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'customer',
				],
			},
		},
		options: [
			{
				displayName: 'Age',
				name: 'age',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: `Customer’s age`,
			},
			{
				displayName: 'Notes',
				name: 'background',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: `Notes`,
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: `First name of the customer. When defined it must be between 1 and 40 characters.`,
			},
			{
				displayName: 'Gender',
				name: 'gender',
				type: 'options',
				options: [
					{
						name: 'Female',
						value: 'female',
					},
					{
						name: 'Male',
						value: 'male',
					},
					{
						name: 'Unknown',
						value: 'unknown',
					},
				],
				default: '',
				description: 'Gender of this customer.',
			},
			{
				displayName: 'Job Title',
				name: 'jobTitle',
				type: 'string',
				default: '',
				description: 'Job title. Max length 60 characters.',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the customer',
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				description: 'Location of the customer.',
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
				description: 'Organization',
			},
			{
				displayName: 'Photo Url',
				name: 'photoUrl',
				type: 'string',
				default: '',
				description: 'URL of the customer’s photo',
			},
		]
	},
] as INodeProperties[];
