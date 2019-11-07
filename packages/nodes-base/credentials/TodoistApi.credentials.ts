import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';


export class TodoistApi implements ICredentialType {
	name = 'todoistApi';
	displayName = 'Todoist API';
	properties = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
