/**
 * Created by denmedia on 20.11.16.
 */

var hw_adminmenu = {

    enable: false,

    e_adminmenu: '#adminmenu',
    e_adminmenu_active: '.hw_adminmenu',
    e_adminmenu_elements: '> li',

    init: function(){
        hw_adminmenu.make_adminmenu();
    },


    make_adminmenu: function(){
        jQuery(hw_adminmenu.e_adminmenu).addClass(hw_adminmenu.e_adminmenu_active.substr(1));
        hw_adminmenu.make_sortable();
    },



    make_sortable: function(){
        jQuery(hw_adminmenu.e_adminmenu_active).sortable({
            start: function(e, el){
                hw_adminmenu.start_shake();
                el.helper.removeClass('opensub');
                console.info('!!!');
            }
        });
    },


    start_shake: function(){
        jQuery(hw_adminmenu.e_adminmenu_active).find(hw_adminmenu.e_adminmenu_elements+' > a').shakeme({
            x: 0.5, y: 0.2, rotation:1, speed: 200
        }).trigger('startRumble');
    },

    stop_shake: function(){
        jQuery(hw_adminmenu.e_adminmenu_active).find(hw_adminmenu.e_adminmenu_elements+' > a').trigger('stopRumble');
    }

};


jQuery(document).ready(hw_adminmenu.init);