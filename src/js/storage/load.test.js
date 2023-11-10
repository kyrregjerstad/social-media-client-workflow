import { load } from "./load";

describe("load", () => {
	beforeEach(() => {
		Storage.prototype.getItem = jest.fn();
	});

	it("should call localStorage.getItem with the correct key", () => {
		const key = "testKey";
		load(key);
		expect(localStorage.getItem).toHaveBeenCalledWith(key);
	});

	it("should return null if localStorage.getItem returns null", () => {
		Storage.prototype.getItem.mockReturnValueOnce(null);
		const result = load("testKey");
		expect(result).toBeNull();
	});
});
