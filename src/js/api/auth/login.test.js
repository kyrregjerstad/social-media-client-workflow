import { login } from "./login";
import * as storage from "../../storage/index";
import { headers } from "../headers";
import { apiPath } from "../constants";

jest.mock("../headers", () => ({
	headers: jest.fn(() => ({ "Content-Type": "application/json" })),
}));

jest.mock("../constants", () => ({
	apiPath: "http://localhost/api",
}));

global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({ accessToken: "fake_access_token" }),
	}),
);

jest.mock("../../storage/index", () => ({
	save: jest.fn(),
}));

describe("Login", () => {
	beforeEach(() => {
		fetch.mockClear();
		storage.save.mockClear();
	});

	it("should save the profile and token when the response is OK", async () => {
		const email = "user@example.com";
		const password = "password123";

		const profile = await login(email, password);

		expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
			method: "post",
			body: JSON.stringify({ email, password }),
			headers: headers("application/json"),
		});

		expect(storage.save).toHaveBeenCalledWith("token", "fake_access_token");
		expect(storage.save).toHaveBeenCalledWith("profile", expect.any(Object));
		expect(profile).not.toHaveProperty("accessToken");
	});

	it("should throw an error when the response is not OK", async () => {
		fetch.mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				statusText: "Unauthorized",
			}),
		);

		const email = "user@example.com";
		const password = "wrong_password";

		await expect(login(email, password)).rejects.toThrow("Unauthorized");
		expect(storage.save).not.toHaveBeenCalled();
	});
});
