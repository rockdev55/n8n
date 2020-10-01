import { OptionsWithUri } from 'request';
import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';
import { IDataObject } from 'n8n-workflow';

export async function flowApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, method: string, resource: string, body: any = {}, qs: IDataObject = {}, uri?: string, option: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any
	const credentials = this.getCredentials('flowApi');
	if (credentials === undefined) {
		throw new Error('No credentials got returned!');
	}

	let options: OptionsWithUri = {
		headers: { 'Authorization': `Bearer ${credentials.accessToken}`},
		method,
		qs,
		body,
		uri: uri ||`https://api.getflow.com/v2${resource}`,
		json: true
	};
	options = Object.assign({}, options, option);
	if (Object.keys(options.body).length === 0) {
		delete options.body;
	}

	try {
		return await this.helpers.request!(options);
	} catch (error) {
		let errorMessage = error.message;
		if (error.response.body) {
			errorMessage = error.response.body.message || error.response.body.Message || error.message;
		}

		throw new Error(errorMessage);
	}
}

/**
 * Make an API request to paginated flow endpoint
 * and return all results
 */
export async function FlowApiRequestAllItems(this: IHookFunctions | IExecuteFunctions, propertyName: string, method: string, resource: string, body: any = {}, query: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any

	const returnData: IDataObject[] = [];

	let responseData;

	query.limit = 100;

	let uri: string | undefined;

	do {
		responseData = await flowApiRequest.call(this, method, resource, body, query, uri, { resolveWithFullResponse: true });
		uri = responseData.headers.link;
		// @ts-ignore
		returnData.push.apply(returnData, responseData.body[propertyName]);
	} while (
		responseData.headers.link !== undefined &&
		responseData.headers.link !== ''
	);

	return returnData;
}
