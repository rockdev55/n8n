import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class ClickUpApi implements ICredentialType {
	name = 'clickUpApi';
	displayName = 'ClickUp API';
	properties = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
