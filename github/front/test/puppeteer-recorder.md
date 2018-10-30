
# Puppeteer recorder
## 1.Link
[Github](https://github.com/checkly/puppeteer-recorder)
[Chrome extension](https://chrome.google.com/webstore/detail/puppeteer-recorder/djeegiggegleadkkbgopoonhjimgehda)
## 2.实现
1. define bind elements
   - input/textarea/a/button/select/option/label/h1-h6/div/span/img ...
2. define bind events
   - click/dblclick/change/keydown/select/submit/load/unload
3. add event listener
   - window.addEventListener(event, recordEvent)
   - chrome.runtime.onMessage.addListener
     - get current url
     - get view port size
4. chrome.runtime.sendMessage (recordedEvents)
5. chrome.runtime.onMessage
6. handleMessage
   - handle control message
      - current url/viewport-size/recorder-started
   - chrome.storage.local.set({recording: xxx}, ()=>{})
7. when stop, read all the events and generate code