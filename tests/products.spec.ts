import {expect, test} from "./fixtures";

test("has title", async ({mainPage}) => {
  await expect(mainPage).toHaveTitle(/OWASP/);
});

test("validate header tabs", { tag : [ "@regression"]}, async ({mainPage}) => {
  
  const navigationTabs = await mainPage.locator(".ProfileSubnav-subnavLinks>li>a")
  for (let i = 0; i < await navigationTabs.count(); i++){
    const linkElem = navigationTabs.nth(i);

    const linkUrl = await linkElem.getAttribute("href");
    const linkText = await linkElem.textContent();
    await linkElem.click();
    console.log(linkText +" ----"+linkUrl);
    await expect(mainPage, "url mistamatched for link :" + linkText).toHaveURL(new RegExp(linkUrl as string));
  }


});

test("search for product", { tag : ["@smoke", "@regression"]}, async ({mainPage}) => {
    //await mainPage.click("a[aria-label='Store Products']");
    const searchResults =  mainPage.locator("span[class*='SearchResultsGridCell']");
    const initialCount = await searchResults.count();

/*
    //await searchInput.press("Enter");
    //await mainPage.waitForLoadState("load");
    await mainPage.evaluate(() => {
      const input = document.querySelector("input[placeholder='Search this Store']") as HTMLInputElement | null;
      if (input){
      
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.click();
      
      }
    });*/
    const searchInput = mainPage.locator("input[placeholder='Search this Store']");

    await searchInput.click();
    /*
    //await mainPage.keyboard.type("Keychain", {delay:200})
    await searchInput.pressSequentially("Keychain", {delay:200})
    await searchInput.press("Tab");
    await searchInput.click();*/
/*
    await mainPage.evaluate(() => {
      const input = document.querySelector("input[placeholder='Search this Store']") as HTMLInputElement;
      if (input){
      input.value = "Keychain";
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });*/
    await searchInput.fill("Keychain");
    await searchInput.press("Tab");
    //await mainPage.pause();
    
    await expect(async () =>{
      const filterCount = await searchResults.count();
      expect(filterCount).toBeLessThan(initialCount);
    }).toPass(({timeout:10000}));
    const countOfResults = await searchResults.count();
    for (let i =0; i < countOfResults; i++){
       await expect(searchResults.nth(i)).toContainText("T-Shirt");
    }


} );
