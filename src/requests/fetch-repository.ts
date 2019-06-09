import Request           from 'request';
import RequestPayload    from 'interfaces/request-payload';
import RequestParameters from 'interfaces/request-parameters';
import Repository        from 'models/repository';
import Credentials       from 'interfaces/credentials';
import {Method}          from '@burninggarden/http';

interface Parameters extends RequestParameters {
	name: string;
	credentials: Credentials;
}

interface Payload extends RequestPayload {
}


class FetchRepositoryRequest extends Request<Repository> {
	private parameters: Parameters;

	public constructor(parameters: Parameters) {
		super();
		this.parameters = parameters;
	}

	protected getUrl(): string {
		return '/asdf';
	}

	protected getMethod(): Method {
		return Method.GET;
	}

	protected getPayload(): Payload {
		return {
		};
	}
}

export default FetchRepositoryRequest;
