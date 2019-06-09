import Payload  from 'interfaces/request-payload';
import {TimeInterval} from '@burninggarden/enums';
import {
	OutgoingRequest,
	Method
} from '@burninggarden/http';

abstract class Request<T> {

	public perform(): Promise<T> {
		return this.sendRequest().then(this.parseResponse);
	}

	private sendRequest(): Promise<any> {
		const request = new OutgoingRequest({
			url:     this.getUrl(),
			method:  this.getMethod(),
			payload: this.getPayload()
		});

		return request.send();
	}

	protected abstract parseResponse(): T;
	protected abstract getPayload(): Payload;
	protected abstract getMethod(): Method;
	protected abstract getUrl(): string;

}

export default Request;
