import { followListener } from "./follow.js";
import * as profileAPI from "../../api/profiles/index.js";

// Mocks
global.alert = jest.fn();
delete global.location;
global.location = { reload: jest.fn() };
jest.mock("../../api/profiles/index.js", () => ({
	followProfile: jest.fn(),
}));

describe("followListener", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should call followProfile with the correct name and reload on success", async () => {
		const mockName = "testname";
		const button = document.createElement("button");
		button.dataset.name = mockName;
		const mockEvent = { srcElement: button };
		profileAPI.followProfile.mockResolvedValueOnce();

		await followListener(mockEvent);

		expect(profileAPI.followProfile).toHaveBeenCalledWith(mockName);
		expect(global.location.reload).toHaveBeenCalled();
	});

	it("should alert if following the profile fails", async () => {
		const mockName = "testname";
		const button = document.createElement("button");
		button.dataset.name = mockName;
		const mockEvent = { srcElement: button };
		profileAPI.followProfile.mockRejectedValueOnce(new Error("test error"));

		await followListener(mockEvent);

		expect(global.alert).toHaveBeenCalledWith("There was a problem following this profile");
		expect(global.location.reload).not.toHaveBeenCalled();
	});

	it("should do nothing if the button has no data-name attribute", async () => {
		const button = document.createElement("button");
		const mockEvent = { srcElement: button };

		await followListener(mockEvent);

		expect(profileAPI.followProfile).not.toHaveBeenCalled();
		expect(global.location.reload).not.toHaveBeenCalled();
		expect(global.alert).not.toHaveBeenCalled();
	});
});
