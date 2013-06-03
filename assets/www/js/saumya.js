var saumyaApp = {
		isRecording:false,
		src : '',
		mediaRec: '',
		init: function(){
			console.log('saumya : init : ');
			var that=this;

			$("#button_record").addClass("button_not_recording");
			//$("#info").html('Tap to begin recording.');
			//add event listeners
			$("#button_record").on("click",{scopeRef:that},this.onRecordTapped);
		},
		onRecordTapped: function(event){
			var scopeObj = event.data.scopeRef;
			console.log('saumyaApp : onRecordTapped : ');

			if(scopeObj.isRecording===false){
				console.log('saumyaApp : onRecordTapped : STARTED : ');
				scopeObj.isRecording=true;
				//scopeObj.startAudioRecording();//method 1 (fires device audio recorder UI)
				scopeObj.startAudioRecording2();//method 2

				$("#button_record").removeClass("button_not_recording");
				$("#button_record").addClass("button_recording");
			}else{
				console.log('saumyaApp : onRecordTapped : STOPPED : ');
				scopeObj.isRecording=false;
				scopeObj.stopAudioRecording2();

				$("#button_record").removeClass("button_recording");
				$("#button_record").addClass("button_not_recording");
			}
			
		},

		startAudioRecording: function(){
			console.log('saumyaApp : startAudioRecording : ');
			//playback or record
			//var media = new Media(src, mediaSuccess, [mediaError], [mediaStatus]);
			// limit capture operation to 3 media files, no longer than 10 seconds each
			//record
			//var options = { limit: 3, duration: 10 };
			//navigator.device.capture.captureAudio(captureSuccess, captureError, options);
			var that= this;
			//start recording
			var options = {};//Android : duration NOT supported, iOS: limit NOT supported 
			navigator.device.capture.captureAudio(that.onRecordSuccess, that.onRecordError, options);
		},
		onRecordSuccess: function(mediaFiles){
			console.log('saumyaApp : onRecordSuccess : ');
			var i, path, len;
		    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		        path = mediaFiles[i].fullPath;
		        // do something interesting with the file
		        console.log('saumyaApp : onRecordSuccess : path='+path);
		    }
		},
		onRecordError: function(error){
			console.log('saumyaApp : onRecordError : error code='+error.code);
		},


		startAudioRecording2: function(){
			console.log('saumyaApp : startAudioRecording2 : ');
			var d = new Date();
			var now = d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds()+'-'+d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
			this.src= now+'.mp3';
			console.log('saumyaApp : startAudioRecording2 : name='+this.src);
			var that = this;
		    this.mediaRec = new Media(this.src,
						        // success callback
						        function() {
						            console.log("recordAudio():Audio Success");
						            //returns here,
						            //once recording is stopped by user
						            //TODO:now play
						            //this.mediaRec.release();
						            that.onRecordingSuccess2();
						        },
						        // error callback
						        function(err) {
						            console.log("recordAudio():Audio Error: ");
						            console.log('========================');
						            var s = 'code: '+ error.code+ '\n' + 'message: ' + error.message + '\n';
						            console.log(s);
						            console.log('========================');
						        },
						        // status callback
						        function(){
						        	console.log("recordAudio(): Status : ");
						        });

		    // Record audio
		    this.mediaRec.startRecord();
		    //$("#info").html('Recording');
		    $("#info").html('');
		},
		stopAudioRecording2:function(){
			console.log('saumyaApp : stopAudioRecording2 : ');
			this.mediaRec.stopRecord();
		},
		onRecordingSuccess2: function(){
			console.log('saumyaApp : onRecordingSuccess2 : ');
			//this.mediaRec.release();
			//$("#info").html('Done. Saved as '+this.src+'. Tap to begin another.');
			$("#info").html('Saved as '+this.src+'.');
			this.mediaRec.release();//release the media resource
		}


};