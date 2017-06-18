namespace('OUI', function (window)
{
	var Dialog = window.OUI.components.Dialog;
	var Modal = window.OUI.components.Modal;
	var Menu = window.OUI.components.Menu;
	var Toast = window.OUI.components.Toast;
	var Tip = window.OUI.components.Tip;

	
	var RoundPosition = window.OUI.core.pos.prepared.RoundPosition;
	var TargetPosition = window.OUI.core.pos.enum.TargetPosition;
	var TargetSide = window.OUI.core.pos.enum.TargetSide;
	
	this.index = function ()
	{
		var myTip = new Tip('oui-tip');

		$('a.toast').on('click', function (e) {
			e.preventDefault();
			var message = new Toast(3000);

			message.add('Lorem ipsum dolor sit amet, eos at iusto salutatus pri. Ei vim stet');
			message.onAdd(function (id) {
				console.log('added ' + id);
			});
			message.onDismiss(function (id) {
				console.log('dismissed ' + id);
			});
		});

		var myMenu = new Menu($('a.menu'), $('div.my-menu').html(), 'my-menu');
            
		myMenu.onAfterOpen(function (container) {
			var subMenu = new Menu(
				container.find('a.menu'), 
				$('div.my-menu').html(), 
				'my-sub-menu');
		});

		$('a.dialog').on('click', function (e) {
			e.preventDefault();
			
			var dialog = new Dialog('YES', 'NO');
			
			dialog.onConfirm(function () {
				console.log('YES');
			});

			dialog.open('Are you sure?');
		});

		$('a.modal').on('click', function (e) {
			e.preventDefault();

			var bigContents = $('div.big-modal').html();
			var bigModal = new Modal(bigContents, 'big');

			bigModal.onAfterOpen(function (container) {
				container.find('div.body a').on('click', function (e) {
					e.preventDefault();

					var smallContents = $('div.small-modal').html();
					var smallModal = new Modal(smallContents, 'small');
					smallModal.onAfterOpen(function (smallModalContainer) {
						new Menu(
							smallModalContainer.find('a.popup-toggle'), 
							$('div.my-menu').html(), 
							'my-menu');
					});
					smallModal.open();
				});
			});

			bigModal.open();
		});

		var $target = $('<div />', {
			text: 'positioned div',
			style: 'width:180px; height: 50px; background-color: #1DA1F3; position: absolute'
		});

		var $container = $('#positioner-container');

		var options = {
			container: $container,
			containerOffset: 0,
			relatedElement: document.getElementById('related'),
			relatedOffset: 0,
			targetElement: $target,
			targetOffset: 10,
			initialPosition: TargetPosition.top,
			initialSide: TargetSide.right
		};

		var pos = RoundPosition.get(options);

		$target.css({top: pos.coordinates.top, left: pos.coordinates.left});

		$container.append($target);
	}
});        