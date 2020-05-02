import {
	INodeProperties,
} from 'n8n-workflow';

export const imageOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'image',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an image',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an image',
			},
		],
		default: 'create',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const imageFields = [

/* -------------------------------------------------------------------------- */
/*                                image:create                                */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTemplates',
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'image',
				],
				operation: [
					'create',
				],
			},
		},
		description: 'The template id you want to use',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'image',
				],
				operation: [
					'create',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'string',
				default: '',
				description: 'Metadata that you need to store e.g. ID of a record in your DB',
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				description: 'A url to POST the Image object to upon rendering completed',
			},
		],
	},
	{
		displayName: 'Modifications',
		name: 'modificationsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Modification',
		displayOptions: {
			show: {
				resource: [
					'image',
				],
				operation: [
					'create',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Modification',
				name: 'modificationsValues',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the item you want to change',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
						description: 'Replacement text you want to use',
					},
					{
						displayName: 'Color',
						name: 'color',
						type: 'color',
						default: '',
						description: 'Color hex of object',
					},
					{
						displayName: 'Background',
						name: 'background',
						type: 'color',
						default: '',
						description: 'Color hex of text background',
					},
					{
						displayName: 'Image URL',
						name: 'imageUrl',
						type: 'string',
						default: '',
						description: 'Replacement image url you want to use (must be publicly viewable)',
					}
				],
			},
		],
	},
/* -------------------------------------------------------------------------- */
/*                                 image:get                                  */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Image ID',
		name: 'imageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'image',
				],
				operation: [
					'get',
				]
			},
		},
		description: 'Unique identifier for the image.',
	},
] as INodeProperties[];
