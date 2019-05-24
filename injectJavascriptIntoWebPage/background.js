// this is the background code...

// listen for our browerAction to be clicked
// chrome.browserAction.onClicked.addListener(function (tab) {
// 	// for the current tab, inject the "inject.js" file & execute it
// 	chrome.tabs.executeScript(tab.ib, {
// 		file: 'inject.js'
// 	});
// });



// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});

chrome.tabs.getSelected(null, function(tab) {
	chrome.extension.getBackgroundPage().console.log("****URL***** : " + tab.url);
});


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
  
		chrome.tabs.executeScript(tab.ib, {
			file: 'inject.js'
		});
  
	}
  })
