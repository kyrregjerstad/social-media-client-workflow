import { remove } from "./remove.js";

describe("remove", () => {
	beforeEach(() => {
		Storage.prototype.removeItem = jest.fn();
	});

	it("should call localStorage.removeItem with the correct key", () => {
		const key = "testKey";
		remove(key);
		expect(localStorage.removeItem).toHaveBeenCalledWith(key);
	});
});
