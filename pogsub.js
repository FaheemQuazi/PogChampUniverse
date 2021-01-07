const NoEditParentTags = ['TEXTAREA', 'SCRIPT', 'NOSCRIPT'];
const RegExPog = /pogchamp/gi; // only time you'll see regex and pog in the same word
var PogDir = browser.extension.getURL('images/');
var PogList = [
    'qqcat',
    'wulffy',
    'LiquidHbox',
    'Tossler',
    'Kripparrian',
    'Kahjahkins'
];

function ReplaceWithPog(ThisNode) {
    // Only Replace Text Nodes
    if (ThisNode.nodeType === Node.TEXT_NODE) {

        // Ignore Certain Tags (defined above)
        if (ThisNode.parentNode && NoEditParentTags.includes(ThisNode.parentNode.nodeName)) {
            return;
        }

        let InsideContent = ThisNode.textContent;
        // Ignore text thats less than the length of the word 'pogchamp' or doesn't include the phrase
        if (InsideContent.length < 7 || InsideContent.search(RegExPog) === -1) {
            return;
        }
        
        // TODO: Dynamic Sizing based on font - parseFloat(window.getComputedStyle(ThisNode.parentNode).getPropertyValue('font-size')) * 1.5;
        let ParentFontSize = 28;
        let PogLoc = PogDir + PogList[Math.floor(Math.random() * PogList.length)] + ".png";
        InsideContent = InsideContent.replace(RegExPog, '<img src="' + PogLoc + '" width="' + ParentFontSize + 'px" height="' + ParentFontSize + 'px" alt="pogchamp" style="vertical-align:middle;">');
    
        ThisNode.parentNode.innerHTML = InsideContent;
    } else {
        ThisNode.childNodes.forEach((ThisNodeChild) => {
            ReplaceWithPog(ThisNodeChild);
        });
    }
}

ReplaceWithPog(document.body);

const textObserver = new MutationObserver((mutations) => {
    mutations.forEach((SpecificMutation) => {
        if (SpecificMutation.addedNodes && SpecificMutation.addedNodes.length > 0) {
            SpecificMutation.addedNodes.forEach((NewNode) => {
                ReplaceWithPog(NewNode);
            });
        }
    });
});

textObserver.observe(document.body, {
    childList: true,
    subtree: true
});