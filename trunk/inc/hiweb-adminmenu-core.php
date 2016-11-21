<?php
	
	
	class hw_adminmenu{
		
		
		public function __call( $name, $arguments ){
			switch( $name ){
				case 'admin_enqueue_scripts':
					wp_register_style( 'hw_adminmenu', plugin_dir_url( dirname( __FILE__ ) ) . '/css/hw_adminmenu.css' );
					wp_enqueue_style( 'hw_adminmenu' );
					wp_register_script( 'hw_adminmenu', plugin_dir_url( dirname( __FILE__ ) ) . '/js/hw_adminmenu.js', array('jquery-ui-sortable') );
					wp_register_script( 'hw_adminmenu_shakeme', plugin_dir_url( dirname( __FILE__ ) ) . '/js/jquery.shakeme.min.js', array('jquery') );
					wp_enqueue_script( 'hw_adminmenu' );
					wp_enqueue_script( 'hw_adminmenu_shakeme' );
					break;
			}
		}
		
	}