/**
 * Created by denmedia on 20.11.16.
 */

var hw_adminmenu = {

	is_enable: false,

	current_element_drop: false,

	e_adminmenu           : '#adminmenu',
	e_active              : '.hw_adminmenu',
	e_elements            : '#adminmenu.hw_adminmenu > .menu-top, #adminmenu > .wp-menu-separator',
	e_elements_child      : '> .menu-top, > .wp-menu-separator',
	e_sortable            : null,
	e_sortable_placeholder: null,
	e_sortable_helper     : null,
	e_dropzone_hide       : '#hw-adminmenu-drop-zone-hide',
	e_dropzone_show       : '#hw-adminmenu-drop-zone-show',
	e_hidden_items        : '#hw-adminmenu-hide-items-list',
	e_add_separator: '#hw-adminmenu-add-separator',

	init: function () {
		hw_adminmenu.make_admin_menu_edit_item();
		jQuery('body').on('click', hw_adminmenu.e_elements, hw_adminmenu.event_click);
		jQuery('body').on('click',hw_adminmenu.e_add_separator,function(){
			jQuery('<li class="wp-not-current-submenu wp-menu-separator" aria-hidden="true"><div class="separator"></div></li>').insertBefore(hw_adminmenu.e_adminmenu+ ' #collapse-menu');
		});
	},

	event_click: function (e) {
		e.preventDefault();
		////todo edit name
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
		jQuery(hw_adminmenu.e_adminmenu).addClass(hw_adminmenu.e_active.substr(1));
		jQuery(hw_adminmenu.e_elements).removeClass('opensub');
		hw_adminmenu.make_sortable();
		hw_adminmenu.start_shake();
	},

	disable: function () {
		hw_adminmenu.stop_shake();
		hw_adminmenu.make_sortable().sortable('destroy');
		hw_adminmenu.make_droppable().droppable('destroy');
		jQuery(hw_adminmenu.e_adminmenu).removeClass(hw_adminmenu.e_active.substr(1));
	},


	make_admin_menu_edit_item: function () {
		jQuery.ajax({
			url    : ajaxurl + '?action=hw_adminmenu_edit_item',
			success: function (data) {
				var adminmenu_edit_item = jQuery(data);
				jQuery(hw_adminmenu.e_adminmenu).append(adminmenu_edit_item);
				adminmenu_edit_item.show('slow');
				adminmenu_edit_item.find('[data-click="edit-toggle"]').on('mouseup', function () {
					hw_adminmenu.enable_toggle();
				});
			}
		});
	},


	make_sortable: function () {
		hw_adminmenu.e_sortable = jQuery(hw_adminmenu.e_adminmenu).sortable({
			items     : hw_adminmenu.e_elements_child,
			distance  : 3,
			opacity   : 0.5,
			revert    : 250,
			live      : true,
			start     : function (e, b) {
				jQuery(hw_adminmenu.e_adminmenu).find('.opensub').removeClass('opensub');
				b.helper.trigger('stopRumble').css('transform', '');
				hw_adminmenu.e_sortable_helper    = b.helper;
				hw_adminmenu.current_element_drop = false;
				jQuery(hw_adminmenu.e_dropzone_hide).addClass('visible');
				jQuery(hw_adminmenu.e_dropzone_show + ', ' +hw_adminmenu.e_add_separator).addClass('hidden');
				hw_adminmenu.make_droppable();
			},
			sort      : function (a, b) {
				hw_adminmenu.e_sortable_helper      = b.helper;
				hw_adminmenu.e_sortable_placeholder = b.placeholder;
			},
			beforeStop: function (e, b) {
				b.helper.trigger('startRumble');
			},
			stop      : function (e, b) {
				if (!hw_adminmenu.current_element_drop) {
					hw_adminmenu.save_data();
				}
				jQuery(hw_adminmenu.e_dropzone_hide).removeClass('visible');
				jQuery(hw_adminmenu.e_dropzone_show+', '+hw_adminmenu.e_add_separator).removeClass('hidden');
			}
		});
		return hw_adminmenu.e_sortable;
	},


	make_droppable: function () {
		return jQuery(hw_adminmenu.e_dropzone_hide).droppable({
			live      : true,
			hoverClass: 'over',
			over      : function (ev, ui) {
				hw_adminmenu.current_element_drop = true;
				jQuery(hw_adminmenu.e_sortable_helper).addClass('hw-adminmenu-item-hide');
			},
			out       : function (ev, ui) {
				hw_adminmenu.current_element_drop = false;
				jQuery(hw_adminmenu.e_sortable_helper).removeClass('hw-adminmenu-item-hide');
			},
			drop      : function (ev, ui) {
				hw_adminmenu.e_sortable_helper.hide(200, function () {
					var item = hw_adminmenu.e_sortable_helper;
					item.detach();
					jQuery(hw_adminmenu.e_hidden_items).append(item[0].outerHTML);
					hw_adminmenu.save_data();
				});
			}
		});
	},


	start_shake: function () {
		/*jQuery(hw_adminmenu.e_elements).shakeme({
			x: 1.8, y: 0.4, rotation: 0, scale: 2, speed: 150
		}).trigger('startRumble');*/
	},

	stop_shake: function () {
		//jQuery(hw_adminmenu.e_elements).trigger('stopRumble').css('transform', '');
	},


	collect_data: function () {
		var R = {items: [], items_hide: []};
		jQuery(hw_adminmenu.e_elements).each(function () {
			var el          = jQuery(this);
			var isSeparator = el.find('> a').length == 0;
			if (isSeparator) {
				R.items.push('-');
			} else {
				R.items.push(el.find('> a').attr('href'));
			}
		});
		jQuery(hw_adminmenu.e_hidden_items + '> li').each(function () {
			var el          = jQuery(this);
			var isSeparator = el.find('> a').length == 0;
			if (isSeparator) {

			} else {
				R.items_hide.push(el.find('> a').attr('href'));
			}
		});
		return R;
	},


	show_hidden_items: function(){

	},

	save_data: function () {
		jQuery.ajax({
			url     : ajaxurl + '?action=hw_adminmenu_save_items',
			type    : 'post',
			dataType: 'json',
			data    : hw_adminmenu.collect_data(),
			success : function (data) {
				console.info(data);
			},
			error   : function (data) {

			}
		});
	}

};


jQuery(document).ready(hw_adminmenu.init);