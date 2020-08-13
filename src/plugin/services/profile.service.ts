export class ProfileService {
	subscribers: ((profile: any) => void)[] = [];

	emitProfileChange(profile: any) {
		this.subscribers.forEach((callback) => callback(profile));
	}

	onDidProfileChange(callback: (profile: any) => void) {
		this.subscribers.push(callback);
	}
}

export const profileService = new ProfileService();
