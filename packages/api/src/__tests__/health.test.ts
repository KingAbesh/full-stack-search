import { testApp } from "../test/test-utils";

describe("Health Check", () => {
	it("should return pong and database status", async () => {
		const response = await testApp.get("/ping");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: "pong",
				data: expect.objectContaining({
					app: "accommodation-api",
					version: "1.0.0",
				}),
			})
		);
	});
});
