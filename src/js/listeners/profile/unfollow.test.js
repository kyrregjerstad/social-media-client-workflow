import { unfollowListener } from "./unfollow.js";
import * as profileAPI from "../../api/profiles/index.js";

global.alert = jest.fn();
delete global.location;
global.location = { reload: jest.fn() };
jest.mock("../../api/profiles/index.js", () => ({
	unfollowProfile: jest.fn(),
}));

describe("unfollowListener", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should call unfollowProfile with the correct name and reload on success", async () => {
		const mockName = "testname";
		const button = document.createElement("button");
		button.dataset.name = mockName;
		const mockEvent = { srcElement: button };
		profileAPI.unfollowProfile.mockResolvedValueOnce();

		await unfollowListener(mockEvent);

		expect(profileAPI.unfollowProfile).toHaveBeenCalledWith(mockName);
		expect(global.location.reload).toHaveBeenCalled();
	});

	it("should alert if unfollowing the profile fails", async () => {
		const mockName = "testname";
		const button = document.createElement("button");
		button.dataset.name = mockName;
		const mockEvent = { srcElement: button };
		profileAPI.unfollowProfile.mockRejectedValueOnce(new Error("test error"));

		await unfollowListener(mockEvent);

		expect(global.alert).toHaveBeenCalledWith("There was a problem unfollowing this profile");
		expect(global.location.reload).not.toHaveBeenCalled();
	});

	it("should do nothing if the button has no data-name attribute", async () => {
		const button = document.createElement("button");
		const mockEvent = { srcElement: button };

		await unfollowListener(mockEvent);

		expect(profileAPI.unfollowProfile).not.toHaveBeenCalled();
		expect(global.location.reload).not.toHaveBeenCalled();
		expect(global.alert).not.toHaveBeenCalled();
	});
});
