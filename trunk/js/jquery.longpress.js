/**
 * Created by denmedia on 20.11.16.
 */
(function ($) {


    var delta = 500;

    $(document).on('mousedown', '*', function (event) {

        var thisElement = $(event.currentTarget);
        var deltaTimer = setTimeout(function () {
            thisElement.trigger('longpress', thisElement);
            //thisElement.removeData('startTimestamp');
        }, delta);

        thisElement.data('startTimestamp', new Date().getTime());
        thisElement.data('timer', deltaTimer);
    }).on('mouseleave', '*', function (event) {

        var thisElement = $(event.currentTarget);
        clearTimeout(thisElement.data('timer'));

        thisElement.removeData('startTimestamp');
        thisElement.removeData('timer');
    }).on('mouseup', '*', function (event) {

        var thisElement = $(event.currentTarget);
        var startTimestamp = thisElement.data('startTimestamp');
        clearTimeout(thisElement.data('timer'));

        if (startTimestamp !== undefined && !isNaN(parseInt(startTimestamp))) {

            if (new Date().getTime() >= (startTimestamp + delta)) {
                thisElement.trigger('longclick', thisElement);
            } else {
                //console.log('short press!');
            }
        }

        thisElement.removeData('startTimestamp');
        thisElement.removeData('timer');
    });


}(jQuery));