(function(){
    if (window.hasRun){
      return
    }

    window.hasRun = true;
   
    var audioCtx = new AudioContext()
    function create_audio_compressor(){
      var video = document.querySelector('video');
      var gainVal = 100
      var source = audioCtx.createMediaElementSource(video);
      var compressor = audioCtx.createDynamicsCompressor()
    
      compressor.threshold.value = -gainVal
      compressor.ratio.value = 20
      compressor.attack.value = 0.1
      compressor.release.value = 1.0
    
 
      let message_style = "color: white; background-color: hsl(200, 90%, 50%)"
      console.log('%c dynamic compressor active, turn off script and reload to deactivate', message_style)
      
    }

    function connect_compressor(){
      source.disconnect(audioCtx.destination)
      source.connect(compressor)
      compressor.connect(audioCtx.destination)
    }
    function disconect_compressor(){
      source.disconnect(compressor)
      compressor.disconnect(audioCtx.destination)
      source.connect(audioCtx.destination);
    }
    create_audio_compressor()
    

    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "compress_active"){
        connect_compressor()
      }
      else if (message.command == "compress_inactive"){
        disconect_compressor()
      }
    })
    
    })()