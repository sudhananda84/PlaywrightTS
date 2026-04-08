import {expect, test} from "./fixtures";

test("has title", async ({otterPage}) => {
  await expect(otterPage).toHaveTitle(/Otter/);
});
