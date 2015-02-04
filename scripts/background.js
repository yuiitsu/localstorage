// +----------------------------------------------------------------------
// | background.js 
// +----------------------------------------------------------------------
// | Author:  onlyfu <fuwy@foxmail.com>
// +----------------------------------------------------------------------
// | 2015-01-04
// +---------------------------------------------------------------------

/**
 * 监听content_script发送的消息
 */
chrome.extension.onMessage.addListener(function(request, _, sendResponse){
	
	if(request.action == 'list'){
		// 从localstorage中读取数据
		strList = localStorage['list'];
		if(strList){
			// 将json字符串转为对象
			dicList = JSON.parse(strList)
			dicReturn = {'status': 200, 'data': dicList}
		}else{
			dicReturn = {'status': 404}
		}

		// 向content_script返回信息
		sendResponse(dicReturn)
	}
});
