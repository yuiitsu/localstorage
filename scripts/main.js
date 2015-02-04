// +----------------------------------------------------------------------
// | main.js 
// +----------------------------------------------------------------------
// | Author:  onlyfu <fuwy@foxmail.com>
// +----------------------------------------------------------------------
// | 2015-01-04
// +---------------------------------------------------------------------

var main = {

	// 初始化
	init: function(){
		// 创建界面
		this.create();

		// 加载已有数据
		this.loadLocalStorage();
	},

	// 创建界面
	create: function(){
		var _html = '<div id="ls_box">'+
			'<h3>'+
				'本地存储 local storage'+
			'</h3>'+
			'<div id="ls_list">'+
				'正在加载数据...'+
			'</div>'+
			'<div id="ls_form">'+
				'<label>'+
					'新增: '+
				'</label>'+
				'<input type="text" id="ls_message" />'+
				'<button id="ls_save">保存</button>'+
			'</div>'+
		'</div>';
		$('body').append(_html);
	},

	/**
	 * 加载已有数据
	 */
	loadLocalStorage: function(){
		_this = this;
		// 发送消息给background，请求已有数据
		this.sendMessageBack('list', {}, function(response){
			if(response.status == 404){
				_this.showList();
				return false;
			}
		});
	},

	/**
	 * 将已有数据写到页面上
	 */
	showList: function(strHtml){
		if(!strHtml){
			$("#ls_list").html('<p>没有找到数据</p>');
		}
	},

	/**
	 * 向background发送消息
	 * @params strAction string 执行方法
	 * @params dicData dict 数据字典
	 * @params callback function 回调函数
	 */
	sendMessageBack: function(strAction, dicData, callback){
		chrome.extension.sendMessage({'action': strAction, 'data': dicData},callback);
	},
}

main.init();
