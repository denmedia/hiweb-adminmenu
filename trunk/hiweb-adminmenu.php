<?php
	
	/**
	 * Plugin Name: hiWeb AdminMenu
	 * Description: Admin AdminMenu: Drag&Drop, Show and Hide items.
	 */
	
	include_once 'inc/hiweb-adminmenu-core.php';
	
	if( !function_exists( 'hiweb_adminmenu' ) ){
		function hiweb_adminmenu(){
			static $class;
			if( !$class instanceof hw_adminmenu )
				$class = new hw_adminmenu();
			return $class;
		}
	}
	
	add_action( 'admin_enqueue_scripts', array( hiweb_adminmenu(), 'admin_enqueue_scripts' ) );
	add_action( 'wp_ajax_hw_adminmenu_edit_item', array(hiweb_adminmenu(),'wp_ajax_hw_adminmenu_edit_item') );
	add_action( 'wp_ajax_hw_adminmenu_save_items', array(hiweb_adminmenu(),'wp_ajax_hw_adminmenu_save_items') );
	add_action('admin_head', array(hiweb_adminmenu(),'admin_head') );