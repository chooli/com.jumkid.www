/**
 * Created by Chooli on 1/20/2015.
 */

(function($){

    $.JK.site.ContactUsWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.ContactUsWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'contact-us-wdg',

        html: '<dummy>'+
                '<form id="contactus_form">'+
                    '<div><label for="firstname">'+SYSLang.Firstname+'</label><input type="text" id="firstname" name="firstname"></div>'+
                    '<div><label for="lastname">'+SYSLang.Lastname+'</label><input type="text" id="lastname" name="lastname" /></div>'+
                    '<div><label for="email">'+SYSLang.Email+'</label><input type="text" id="email" name="email" /></div>'+
                    '<div><label for="phone">'+SYSLang.Phone+'</label><input type="text" id="phone" name="phone" /></div>'+
                    '<div><label for="comment">'+SYSLang.Comment+'</label><textarea id="comment" name="comment" rows="10" cols="50"></textarea></div>'+

                    '<div style="margin: 13px 0px 5px 130px; font-size: 16px;" id="form-submit"><input class="submit" type="submit" value="'+SYSLang.Submit+'" /</div>'+
                '</form>'+
        '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var wdg = this;
            /*-- event bindings --*/
            $("#contactus_form").validate({
                rules: {
                    firstname: "required",
                    lastname: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    comment: {
                        required: true,
                        minlength: 2
                    }
                },
                messages: {
                    firstname: "✖",
                    lastname: "✖",
                    email: "✖",
                    comment: "✖"
                },

                submitHandler: function() {
                    wdg.save();
                }

            });

            return wdg;
        },

        save: function(){
            var wdg = this;

            if(!$.JK.checkinProgress()) return;

            var formData = $.JK.convertFormToJSON('contactus_form');

            $.ajax({
                type: "POST",
                url: $.JK.assembleUrl($.JK.API.CONTACT.SAVE),
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: formData,
                success: function(data, status, request) {

                    if(data.success){
                        $('#form-submit-btn').remove();
                        $('#form-submit').text(SYSLang.CMSG_REQUEST_SUBMIT);
                    }else{
                        //TODO
                    }

                    $.JK.checkoutProgress();
                    return wdg;

                },
                error: function(request, status, error){
                    $.JK.checkoutProgress();
                    return wdg;
                }
            });
        }

    });

})(jQuery);
