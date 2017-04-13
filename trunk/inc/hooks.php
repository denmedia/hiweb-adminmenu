<?php

	add_action( 'admin_enqueue_scripts', array( hiweb_adminmenu()->hooks(), 'admin_enqueue_scripts' ) );
	add_action( 'wp_ajax_hw_adminmenu_edit_item', array( hiweb_adminmenu()->hooks(), 'wp_ajax_hw_adminmenu_edit_item' ) );
	add_action( 'wp_ajax_hw_adminmenu_save_items', array( hiweb_adminmenu()->hooks(), 'wp_ajax_hw_adminmenu_save_items' ) );
	add_action( 'admin_head', array( hiweb_adminmenu(), 'do_remake_adminmenu' ) );