import Payload  from 'interfaces/request-payload';
import {Method} from '@burninggarden/http';

abstract class Request<T> {

	public perform(): Promise<T> {
		throw new Error('die');
	}

	protected abstract getPayload(): Payload;
	protected abstract getMethod(): Method;
	protected abstract getUrl(): string;

}

export default Request;
