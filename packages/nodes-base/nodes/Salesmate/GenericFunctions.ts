import { OptionsWithUri } from 'request';
import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
} from 'n8n-core';
import { IDataObject } from 'n8n-workflow';

export async function salesmateApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IWebhookFunctions, method: string, resource: string, body: any = {}, qs: IDataObject = {}, uri?: string, option: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any
	const credentials = this.getCredentials('salesmateApi');
	if (credentials === undefined) {
		throw new Error('No credentials got returned!');
	}

	const options: OptionsWithUri = {
		headers: {
			'sessionToken': credentials.sessionToken,
			'x-linkname': credentials.url,
			'Content-Type': 'application/json',
		},
		method,
		qs,
		body,
		uri: uri ||`https://apis.salesmate.io${resource}`,
		json: true
	};
	if (!Object.keys(body).length) {
		delete options.body;
	}
	console.log(JSON.stringify(options.body))
	// console.log(options.body.query.group.rules)
	// console.log(options.body.query.group.operator)

	try {
		return await this.helpers.request!(options);
	} catch (error) {
		throw new Error('Salesmate Error: ' + error);
	}
}

export async function salesmateApiRequestAllItems(this: IHookFunctions | IExecuteFunctions| ILoadOptionsFunctions, propertyName: string, method: string, resource: string, body: any = {}, query: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any

	const returnData: IDataObject[] = [];

	let responseData;
	query.pageNo = 1;
	query.rows = 25;
	do {
		responseData = await salesmateApiRequest.call(this, method, resource, body, query);
		returnData.push.apply(returnData, responseData[propertyName].data);
		query.pageNo++;
	} while (
		responseData[propertyName].totalPages !== undefined &&
		query.pageNo <= responseData[propertyName].totalPages
	);

	return returnData;
}


export function validateJSON(json: string | undefined): any { // tslint:disable-line:no-any
	let result;
	try {
		result = JSON.parse(json!);
	} catch (exception) {
		result = undefined;
	}
	return result;
}
