/**
 * Created by denmedia on 20.11.16.
 */

var hw_adminmenu = {

	is_enable : false,
	drag_allow: false,

	e_adminmenu               : '#adminmenu',
	e_adminmenu_active        : '.hw_adminmenu',
	e_adminmenu_elements      : '#adminmenu > .menu-top, #adminmenu > .wp-menu-separator',
	e_adminmenu_elements_child: '> .menu-top, > .wp-menu-separator',

	init: function () {
		hw_adminmenu.make_admin_menu_edit_item();
	},


	enable_toggle: function () {
		hw_adminmenu.is_enable = !hw_adminmenu.is_enable;
		if (hw_adminmenu.is_enable) {
			hw_adminmenu.enable();
		} else {
			hw_adminmenu.disable();
		}
	},

	enable: function () {
		jQuery(hw_adminmenu.e_adminmenu).addClass(hw_adminmenu.e_adminmenu_active.substr(1));
		jQuery(hw_adminmenu.e_adminmenu_elements).removeClass('opensub');
		hw_adminmenu.make_sortable();
		hw_adminmenu.start_shake();
	},

	disable: function () {
		jQuery(hw_adminmenu.e_adminmenu).removeClass(hw_adminmenu.e_adminmenu_active.substr(1));
		hw_adminmenu.stop_shake();
	},


	make_admin_menu_edit_item: function () {
		jQuery.ajax({
			url    : ajaxurl + '?action=hw_adminmenu_edit_item',
			success: function (data) {
				var adminmenu_edit_item = jQuery(data);
				jQuery(hw_adminmenu.e_adminmenu).append(adminmenu_edit_item);
				adminmenu_edit_item.show('slow');
				adminmenu_edit_item.on('mouseup', function () {
					hw_adminmenu.enable_toggle();
				});
			}
		});
	},


	make_sortable: function () {
		return jQuery(hw_adminmenu.e_adminmenu).sortable({
			items     : hw_adminmenu.e_adminmenu_elements_child,
			distance  : 7,
			opacity   : 0.5,
			revert    : 250,
			start     : function (e, b) {
				b.helper.removeClass('opensub');
				b.helper.trigger('stopRumble');
			},
			beforeStop: function (e, b) {
				b.helper.trigger('startRumble');
			},
			sort: function(a,b){
				var helper = b.helper;
				if(helper.offset().left > 400){

				} else {

				}
			},
			stop      : function (e, b) {

			}
		});
	},

	destroy_sortable: function () {
		jQuery(hw_adminmenu.e_adminmenu_active).sortable('destroy');
	},


	start_shake: function () {
		jQuery(hw_adminmenu.e_adminmenu_elements).shakeme({
			x: 2, y: 0.4, rotation: 3, speed: 150
		}).trigger('startRumble');
	},

	stop_shake: function () {
		jQuery(hw_adminmenu.e_adminmenu_elements).trigger('stopRumble');
	},


	collect_data: function () {

	},

	save_data: function () {
		jQuery.ajax({
			url     : ajaxurl + '?action=hw_adminmenu',
			type    : 'post',
			dataType: 'json',
			data    : {},
			success : function (data) {
				console.info(data);
			},
			error   : function (data) {
				console.warn(data);
			}
		});
	}

};


jQuery(document).ready(hw_adminmenu.init);