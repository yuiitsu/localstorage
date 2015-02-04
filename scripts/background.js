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
	// 返回数据
	var dicReturn;
	
	// 读取已存数据
	if(request.action == 'list'){
		// 从localstorage中读取数据
		var strList = localStorage['list'];
		if(strList){
			// 将json字符串转为对象
			var dicList = JSON.parse(strList)
			dicReturn = {'status': 200, 'data': dicList}
		}else{
			dicReturn = {'status': 404}
		}

		// 向content_script返回信息
		sendResponse(dicReturn);
	}

	// 保存
	if(request.action == 'save'){
		// content_script传来message
		var strMessage = request.data.message;
		// 从localstorage中读取数据
		var strList = localStorage['list'];
		var dicList = [];
		if(strList){
			// 将json字符串转为对象
			dicList = JSON.parse(strList)
		}
		dicList.push(strMessage);
		localStorage['list'] = JSON.stringify(dicList);

		dicReturn = {'status': 200, 'data': dicList};
		// 向content_script返回信息
		sendResponse(dicReturn);
	}

	// 删除
	if(request.action == 'del'){
		// content_script传来的message
		var strMessage = request.data.message;
		// 从localstorage中读取数据
		var strList = localStorage['list'];
		if(strList){
			// 将json字符串转为对象
			dicList = JSON.parse(strList);
			// 遍历数据，找到对应值
			for(var i in dicList){
				if(dicList[i] == strMessage){
					// 删除该值
					dicList.splice(i, 1);
				}
			}

			// 重新存储
			localStorage['list'] = JSON.stringify(dicList);
			// 向content_script返回信息
			sendResponse({'status': 200});
		}else{
			sendResponse({'status': 501, 'msg': '删除失败，未有数据'});
		}
	}
});
