import { Handler } from '.';
import { FabricCanvas } from '../models';

export default abstract class AbstractHandler {
	protected handler: Handler;
	protected canvas: FabricCanvas;

	constructor(handler: Handler) {
		this.handler = handler;
		this.canvas = handler.canvas;
		this.initialize();
	}

	protected initialize() {}
}
