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

		// 监听保存
		this.listenSave();
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

			// 将json转为对象
			_this.showList(response.data);
			
			// 监听删除
			_this.listenDel();
		});
	},

	/**
	 * 将已有数据写到页面上
	 */
	showList: function(dicList){
		if(!dicList || dicList.length == 0){
			$("#ls_list").html('<p>没有找到数据</p>');
			return;
		}

		// 遍历对象，构建输出html
		var _html = ['<ul>'];
		for(var i in dicList){
			_html.push('<li><span class="ls_del" data-item="'+dicList[i]+'">X</span>'+dicList[i]+'</li>');
		}
		_html.push('</ul>');
		$("#ls_list").html(_html.join(''));
		
		// 监听删除
		_this.listenDel();
	},
	
	/**
	 * 监听保存事件
	 */
	listenSave: function(){
		_this = this;

		$("#ls_save").click(function(){
			// 获取message
			var strMessage = $.trim($('#ls_message').val());
			if(!strMessage){
				return false;
			}
			// 通知background，保存数据
			_this.sendMessageBack('save', {'message': strMessage}, function(response){
				if(response.status == 200){
					_this.showList(response.data);
					$('#ls_message').val('');
				}
			});
		});
	},

	/**
	 * 监听删除事件
	 */
	listenDel: function(){
		_this = this;

		$(".ls_del").unbind('click').click(function(){
			var $this = $(this);
			// 获取删除值
			var strMessage = $(this).attr('data-item');
			if(!strMessage){
				alert('未找到删除值，请重试');
				return false;
			}
			if(confirm('确定要删除该条记录吗？')){
				// 向background发消息，请求删除该值
				_this.sendMessageBack('del', {'message': strMessage}, function(response){
					if(response.status == 200){
						$this.parent().fadeOut(function(){
							$(this).remove();
						});
					}else{
						alert(response.msg);
					}
				});
			}
		});
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
