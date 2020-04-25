(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    console.warn("findRecipe has already run");
    return;
  }
  console.info("findRecipe running");
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertText(text) {
    console.log(`inserting text ${text}`);
    removeExistingText();
    let pNode = document.createElement("p");
    pNode.className = "recipe-msg";
    var tNode = document.createTextNode(text);
    pNode.appendChild(tNode);
    document.body.appendChild(pNode);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingText() {
    let existingText = document.querySelectorAll(".recipe-msg");
    for (let text of existingText) {
      text.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  console.log("adding message listener");
  browser.runtime.onMessage.addListener((message) => {
    console.log("got a message");
    if (message.command === "text") {
      insertText(message.text);
    } else if (message.command === "reset") {
      removeExistingText();
    }
  });

})();