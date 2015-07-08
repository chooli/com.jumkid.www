/**
 * Created by Chooli on 1/20/2015.
 */
(function($){

    $.JK.site.SocialCommentWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.SocialCommentWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'social-comment-wdg',

        module: null,

        moduleRefId: null,

        store: {},

        html: '<dummy>'+
        '<form id="social-comment-form">'+
        '<div><img src="../../images/site/icon_socialcomment.png" width="51px"/><textarea id="social-comment" name="content" style="width:490px"></textarea>'+
        '<div id="social-comment-user-id" style="display:none;"><div style="width:41px;float:left;padding:12px 0px 0px 10px;">'+SYSLang.Name+'</div><input type="text" id="social_user_id_txt" name="socialUserId" style="width:480px"/>'+
        '<input type="submit" value="发表"/>'+
        '</div>'+
        '</form>'+
        '<div class="di">&nbsp;</div>'+
        '{{for socialcomments}}'+
        '<div class="social-comment-history-panel">'+
        '<img src="../../images/site/icon_socialcomment.png" /><span style="font-weight:bold;">{{:socialUserId}}</span>'+
        '<div>{{:content}}</div>'+
        '</div>'+
        '{{/for}}'+
        '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var wdg = this;

            $('#social-comment').on('focus', function(e){
                $('#social-comment-user-id').css('display', 'block').hide(0).fadeIn("slow");
            });

            $("#social-comment-form").validate({
                rules: {
                    content: "required",
                    socialUserId: "required"
                },
                messages: {
                    content: "✖",
                    socialUserId: "✖"
                },

                submitHandler: function() {
                    wdg.save();
                }

            });

            return this;

        },

        load: function(){
            var wdg = this;

            var promise = $.ajax({
                type: "POST",
                url: $.JK.assembleUrl($.JK.API.SOCIALCOMMENT.LOAD),
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {module:this.getModule(), moduleRefId:this.getModuleRefId()},
                success: function(data, textStatus, request) {

                    if(data.success){
                        wdg.setStore(data);
                        wdg.show(true);
                    }

                    $.JK.checkoutProgress();
                },
                error: function(request, status, error){
                    $.JK.checkoutProgress();
                }

            });

            return promise;

        },

        setModule: function(module){
            this.module = module;
        },

        getModule: function(){
            return this.module;
        },

        setModuleRefId: function(module){
            this.moduleRefId = moduleRefId;
        },

        getModuleRefId: function(){
            return this.moduleRefId;
        },

        save: function(){
            var wdg = this;

            if(!$.JK.checkinProgress()) return;

            $.ajax({
                type: "POST",
                url: $.JK.assembleUrl($.JK.API.SOCIALCOMMENT.SAVE),
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: $.extend({module:this.getModule(), moduleRefId:this.getModuleRefId()}, $.JK.convertFormToJSON('social-comment-form')),
                success: function(data, textStatus, request) {

                    if(data.success){
                        $('#social-comment-user-id').css('display', 'none').hide(0).fadeIn("slow");
                        wdg.load().done(function(){
                            $('#social-comment-form').css('display', 'none').hide(0).fadeIn("slow");
                        });
                    }else{
                        //TODO
                    }

                    $.JK.checkoutProgress();
                    return wdg;

                },
                error: function(request, status, error){
                    $.JK.checkoutProgress();
                }

            });

        }

    });

})(jQuery);