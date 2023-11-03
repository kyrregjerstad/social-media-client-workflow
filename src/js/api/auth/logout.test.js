import { logout } from "./logout";
import { remove } from "../../storage/index.js";

jest.mock("../../storage/index.js", () => ({
	remove: jest.fn(),
}));

describe("logout", () => {
	it("should remove the token and profile from localStorage", () => {
		logout();
		expect(remove).toHaveBeenNthCalledWith(1, "token");
		expect(remove).toHaveBeenNthCalledWith(2, "profile");
	});
});
