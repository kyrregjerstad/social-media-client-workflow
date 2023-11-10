import { save } from "./save";

const setItemMock = jest.spyOn(Storage.prototype, "setItem");

describe("save", () => {
	beforeEach(() => {
		setItemMock.mockClear();
	});

	it("should call localStorage.setItem with the right parameters", () => {
		const key = "testKey";
		const value = { some: "data" };

		save(key, value);

		expect(setItemMock).toHaveBeenCalledTimes(1);

		expect(setItemMock).toHaveBeenCalledWith(key, JSON.stringify(value));
	});

	it("should handle non-object values correctly", () => {
		const key = "anotherTestKey";
		const value = "just a string";

		save(key, value);

		expect(setItemMock).toHaveBeenCalledTimes(1);

		expect(setItemMock).toHaveBeenCalledWith(key, JSON.stringify(value));
	});
});
