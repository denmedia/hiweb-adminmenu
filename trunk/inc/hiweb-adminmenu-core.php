<?php
	
	
	class hw_adminmenu{
		
		
		public function __call( $name, $arguments ){
			switch( $name ){
				case 'admin_enqueue_scripts':
					wp_register_style( 'hw_adminmenu', plugin_dir_url( dirname( __FILE__ ) ) . '/css/hw_adminmenu.css' );
					wp_enqueue_style( 'hw_adminmenu' );
					wp_register_script( 'hw_adminmenu', plugin_dir_url( dirname( __FILE__ ) ) . '/js/hw_adminmenu.js', array( 'jquery-ui-sortable' ) );
					wp_register_script( 'hw_adminmenu_shakeme', plugin_dir_url( dirname( __FILE__ ) ) . '/js/jquery.shakeme.min.js', array( 'jquery' ) );
					wp_register_script( 'hw_longpress', plugin_dir_url( dirname( __FILE__ ) ) . '/js/jquery.longpress.js', array( 'jquery' ) );
					wp_register_script( 'hw_longpress', plugin_dir_url( dirname( __FILE__ ) ) . '/js/jquery.longpress.js', array( 'jquery' ) );
					wp_register_script( 'jquery-simulate', plugin_dir_url( dirname( __FILE__ ) ) . '/js/jquery.simulate.js', array( 'jquery' ) );
					wp_enqueue_script( 'hw_adminmenu' );
					wp_enqueue_script( 'hw_adminmenu_shakeme' );
					wp_enqueue_script( 'hw_longpress' );
					wp_enqueue_script( 'jquery-simulate' );
					break;
				case 'wp_ajax_hw_adminmenu_edit_item':
					include dirname(dirname(__FILE__)).'/parts/wp_ajax_hw_adminmenu_edit_item.php';
					die;
					break;
			}
		}
		
	}