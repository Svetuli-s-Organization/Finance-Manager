import { RendererAPI } from './electron-app/preload';

export {}

declare global {
	interface Window {
		rendererAPI: RendererAPI;
	}
}
