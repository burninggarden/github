import Input from 'interfaces/input';

export default interface CreateRepositoryInput extends Input {
	name: string;
	description?: string;
}
