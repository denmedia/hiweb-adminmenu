<?php
	
	
	class hw_adminmenu{
		
		private $option_items = 'hw_adminmenu_items';
		private $option_items_hide = 'hw_adminmenu_items_remove';
		
		
		public function __call( $name, $arguments ){
			if( isset( $_GET['hw-adminmenu-reset'] ) ){
				$this->do_clear();
				wp_redirect( get_admin_url( 'index.php' ) );
			}
			switch( $name ){
				case 'admin_enqueue_scripts':
					wp_register_style( 'hw_adminmenu', plugin_dir_url( dirname( __FILE__ ) ) . '/css/hw_adminmenu.css' );
					wp_enqueue_style( 'hw_adminmenu' );
					wp_register_script( 'hw_adminmenu', plugin_dir_url( dirname( __FILE__ ) ) . '/js/hw_adminmenu.js', array( 'jquery-ui-sortable', 'jquery-ui-droppable' ) );
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
					include dirname( dirname( __FILE__ ) ) . '/parts/wp_ajax_hw_adminmenu_edit_item.php';
					die;
					break;
				case 'wp_ajax_hw_adminmenu_save_items':
					echo json_encode( $this->do_save_items( $_POST['items'], $_POST['items_hide'] ) );
					die;
					break;
				case 'admin_head':
					$this->do_remake_adminmenu();
					break;
			}
		}
		
		
		/**
		 * @return array
		 */
		public function get_admin_menu( $hidden = false ){
			global $menu;
			$R = array();
			foreach( $menu as $index => $item ){
				$isSeparator = count( $item ) < 6;
				if( !$isSeparator ){
					$id = $this->get_id( $item[2] );
					if( ( !$hidden && !$this->is_hidden( $id ) || ( $hidden && $this->is_hidden( $id ) ) ) ){
						$R[ $id ] = $item;
					}
				}
			}
			return $R;
		}
		
		
		private function do_remake_adminmenu(){
			global $menu;
			$R = array();
			$admin_menu = $this->get_admin_menu();
			$items = $this->get_items();
			$item_hidden = $this->get_items( true );
			if( count( $items ) == 0 && count( $item_hidden ) == 0 )
				return;
			$menu = array();
			$separator_count = 0;
			foreach( $items as $id ){
				$id = $this->get_id($id);
				if( $id == '-' ){
					$R[] = array( '', 'read', 'separator'.$separator_count, '', 'wp-menu-separator' );
					$separator_count ++;
				}elseif( isset( $admin_menu[ $id ] ) ){
					$R[] = $admin_menu[ $id ];
				}
			}
			$menu = $R;
		}
		
		
		/**
		 * @param $slug
		 * @return mixed
		 */
		public function get_id( $slug ){
			return strpos( $slug, 'admin.php?page=' ) !== false ? str_replace('admin.php?page=','',$slug) : $slug;
		}
		
		
		/**
		 * @param $slugOrId
		 * @return bool
		 */
		public function is_hidden( $slugOrId ){
			$id = $this->get_id( $slugOrId );
			$hidden_items = array_flip( $this->get_items( true ) );
			return isset( $hidden_items[ $id ] );
		}
		
		
		/**
		 * Возвращает массив элементов
		 * @param bool $return_hide
		 * @return array
		 */
		public function get_items( $return_hide = false ){
			$R = get_option( $return_hide ? $this->option_items_hide : $this->option_items );
			return is_array( $R ) ? $R : array();
		}
		
		
		public function do_save_items( $items = array(), $items_hide = array() ){
			$R = array();
			if( is_array( $items ) ){
				update_option( $this->option_items, $items );
				update_option( $this->option_items_hide, $items_hide );
			}
			return $R;
		}
		
		
		public function do_clear(){
			update_option( $this->option_items, array() );
			update_option( $this->option_items_hide, array() );
		}
	}