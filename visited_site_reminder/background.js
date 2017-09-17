// Copyright (c) 2017 Akhil Kedia
// Called when the user clicks on the browser action.
chrome.webNavigation.onCompleted.addListener(updateIcon);

function updateIcon(details) {
    if (details.frameId != 0) {
        return; // only update the icon for main page, not iframe/frame
    }
    console.log('About to Navigate to url ' + details.url);
	chrome.browserAction.setIcon({
        path: 'GreenClock.png',
        tabId: details.tabId
    });
    chrome.history.search({
            'text': details.url // Search for URL
        },
        function(historyItems) {
            var visitcount = 0;
            // For each history item, get details on all visits.
            for (var i = 0; i < historyItems.length; ++i) {
                var url = historyItems[i].url;
                console.log('You visited this URL' + url);
                visitcount = visitcount + historyItems[i].visitCount;
                console.log('You visited this URL' + visitcount + ' times.');
            }
            if (visitcount > 1) {
                chrome.browserAction.setIcon({
                    path: 'RedClock.png',
                    tabId: details.tabId
                });
            } else {
                chrome.browserAction.setIcon({
                    path: 'GreenClock.png',
                    tabId: details.tabId
                });
            }
        });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Clicked Addon Icon! Current tab url ' + tab.url);
    chrome.history.search({
            'text': tab.url // Search for URL
        },
        function(historyItems) {
            var visitcount = 0;
            // For each history item, get details on all visits.
            for (var i = 0; i < historyItems.length; ++i) {
                var url = historyItems[i].url;
                console.log('You visited this URL' + url);
                visitcount = historyItems[i].visitCount;
                console.log('You visited this URL' + visitcount + ' times.');
            }
            if (visitcount > 1) {
                chrome.browserAction.setIcon({
                    path: 'RedClock.png',
                    tabId: tab.Id
                });
            } else {
                chrome.browserAction.setIcon({
                    path: 'GreenClock.png',
                    tabId: tab.Id
                });
            }
        });
});