import Repository                  from 'models/repository';
import Credentials                 from 'interfaces/credentials';
import EnsureRepositoryExistsInput from 'interfaces/inputs/ensure-repository-exists';
import RepositoryExistsInput       from 'interfaces/inputs/repository-exists';
import CreateRepositoryInput       from 'interfaces/inputs/create-repository'
import CreateRepositoryRequest     from 'requests/create-repository';
import FetchRepositoryRequest      from 'requests/fetch-repository';

interface ClientSettings {
	credentials: Credentials;
}

class Client {

	private settings : ClientSettings;

	public constructor(settings: ClientSettings) {
		this.settings = settings;
	}

	public async ensureRepositoryExists(input: EnsureRepositoryExistsInput): Promise<any> {
		const exists = await this.repositoryExists(input);

		if (exists) {
			return Promise.resolve();
		}

		return this.createRepository(input);
	}

	public async repositoryExists(input: RepositoryExistsInput): Promise<any> {
		const request = new FetchRepositoryRequest({
			...input,
			credentials: this.getCredentials()
		});
	}

	public async createRepository(input: CreateRepositoryInput): Promise<Repository> {
		const request = new CreateRepositoryRequest({
			...input,
			credentials: this.getCredentials()
		});

		return request.perform();
	}

	private getCredentials(): Credentials {
		return this.settings.credentials;
	}

}

export default Client;
