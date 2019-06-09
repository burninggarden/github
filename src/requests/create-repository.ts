import Request           from 'request';
import RequestPayload    from 'interfaces/request-payload';
import RequestParameters from 'interfaces/request-parameters';
import Repository        from 'models/repository';
import Credentials       from 'interfaces/credentials';
import {Method}          from '@burninggarden/http';


interface Parameters extends RequestParameters {
	name: string;
	description?: string;
	credentials: Credentials;
}

interface Payload extends RequestPayload {
	name: string;
	description?: string;
}

class CreateRepositoryRequest extends Request<Repository> {

	private parameters: Parameters;

	public constructor(parameters: Parameters) {
		super();
		this.parameters = parameters;
	}

	protected getPayload(): Payload {
		return {
			name:        this.getName(),
			description: this.getDescription()
		};
	}

	protected getUrl(): string {
		if (this.hasOrganization()) {
			return this.getOrganizationUrl();
		} else {
			return this.getUserUrl();
		}
	}

	protected getMethod(): Method {
		return Method.POST;
	}

	private getOrganizationUrl(): string {
		const organization = this.getOrganization();

		if (organization === undefined) {
			throw new Error('No organization set');
		}

		return `/orgs/${organization}/repos`;
	}

	private hasOrganization(): boolean {
		return this.getOrganization() !== undefined;
	}

	private getOrganization(): string | undefined {
		return this.getCredentials().organization;
	}

	private getCredentials(): Credentials {
		return this.parameters.credentials;
	}

	private getUserUrl(): string {
		return '/user/repos';
	}

	private getName(): string {
		return this.parameters.name;
	}

	private getDescription(): string | undefined {
		return this.parameters.description;
	}

}

export default CreateRepositoryRequest;
