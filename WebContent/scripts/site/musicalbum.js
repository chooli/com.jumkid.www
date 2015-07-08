/**
 * Created by Chooli on 1/20/2015.
 */
(function($){

    $.JK.site.MusicAlbumWidget = function(settings){
        $.extend(true, this, settings);
        $.JK.setCmp(this.getId(), this);
        return this;
    };

    $.JK.site.MusicAlbumWidget.prototype = $.extend(false, new $.JK.Widget(), {

        id: 'music-album-wdg',

        store: {},

        isLoop: false,

        html: '<dummy>'+
			        '<div><img id="music-album-btn-play-all" src="../../images/site/icon_play.png" style="height: 46px; cursor: pointer;" alt="Play all"/></div>'+
			        '{{for attachments}}{{if mimeType.indexOf("audio")!==-1}}'+
			        '<div class="album_audio_item">'+
			        '<img src="../../file/tmb/{{:uuid}}" />'+
			        '<label>{{if title}}{{:title}}{{else}}{{:filename}}{{/if}}</label>'+
			        '<div class="album_audio_control"><img id="music-album-btn-play-{{:#getIndex()}}" src="../../images/site/icon_play.png" style="height: 32px;" alt="{{:#getIndex()}}"/><span id="music-album-play-time-{{:#getIndex()}}">&nbsp;</span></div>'+
			        '<audio preload="none" alt="{{:#getIndex()}}">'+
			        '<source src="../../file/s/{{:uuid}}" type="audio/mpeg">'+
			        'Your browser does not support the audio element.'+
			        '</audio>'+
			        '</div>'+
			        '{{/if}}{{/for}}'+
		        '</dummy>',

        show: function(){
            $.JK.Widget.prototype.show.apply(this, arguments);
            var wdg = this,
                attachments = this.getStore().attachments;

            $('#music-album-btn-play-all').on('click', function(e){

                var btn = $('#music-album-btn-play-all'),
                    isPlay = btn.attr('src').indexOf('stop.png') != -1;

                if(!isPlay){
                    btn.attr('src', '../../images/site/icon_stop.png');
                    wdg.playAt(0);
                }else{
                    btn.attr('src', '../../images/site/icon_play.png');
                    wdg.stopAll();
                }

                wdg.setLoop(true);
            });

            for(var i=0;i<attachments.length;i++){
                if($('#music-album-btn-play-'+i)){
                    $('#music-album-btn-play-'+i).on('click', function(e){
                        var index = parseInt($(this).attr('alt'));

                        wdg.playAt(index);

                    });

                    if($('audio')[i]){
                        $('audio')[i].onended = function(e){
                            var index = parseInt($(this).attr('alt'));
                            $('#music-album-btn-play-'+index).attr('src', '../../images/site/icon_play.png');
                            $(this).currentTime = 0;

                            //play the next song if isLoop
                            index ++;
                            if(wdg.getLoop()){
                                if($('#music-album-btn-play-'+index)) wdg.playAt(index);
                                else wdg.playAt(0);
                            }

                        };
                    }

                }

            }

        },

        playAt: function(index){
            this.stopAll(index);

            var btn = $('#music-album-btn-play-'+index),
                isPlay = btn.attr('src').indexOf('pause.png') != -1;

            if(!isPlay){
                btn.attr('src', '../../images/site/icon_pause.png');
                $('audio')[index].play();
            }else{
                btn.attr('src', '../../images/site/icon_play.png');
                $('audio')[index].pause();
            }
        },

        stopAll: function(exclude){
            var attachments = this.getStore().attachments;
            //stop all other playing audio
            for(var j=0;j<attachments.length;j++){
                if(exclude===j) continue;
                if(attachments[j].mimeType.indexOf("audio")>-1){
                    $('audio')[j].pause();
                    if($('audio')[j].currentTime && $('audio')[j].currentTime!==0){
                    	$('audio')[j].currentTime=0;
                    }
                    $('#music-album-btn-play-'+j).attr('src', '../../images/site/icon_play.png');
                }
            }
        },

        setLoop: function(isLoop){
            this.isLoop = isLoop;
        },

        getLoop: function(){
            return this.isLoop;
        }

    });

})(jQuery);