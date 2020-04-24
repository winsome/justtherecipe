function doSomething(data) {
    document.addEventListener("click", (e) => {

        function sendText(tabs) {
            console.log("sendText");
            browser.tabs.sendMessage(tabs[0].id, {
                command: "text",
                text: "Hello World!"
            });
        }

        function reportError(err) {
            console.error(`Could not find recipe: ${err}`);
        }

        browser.tabs.query({ active: true, currentWindow: true })
            .then(sendText)
            .catch(reportError);

    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute recipe content script: ${error.message}`);
}

browser.tabs.executeScript({ file: "/contentScripts/findRecipe.js" })
    .then(doSomething)
    .catch(reportExecuteScriptError);