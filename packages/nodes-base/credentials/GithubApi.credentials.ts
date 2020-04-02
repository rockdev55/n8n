import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class GithubApi implements ICredentialType {
	name = 'githubApi';
	displayName = 'Github API';
	properties = [
		{
			displayName: 'URL',
			name: 'url',
			type: 'string' as NodePropertyTypes,
			default: 'https://api.github.com',
		},
		{
			displayName: 'User',
			name: 'user',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
