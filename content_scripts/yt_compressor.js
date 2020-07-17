(function(){
    if (window.hasRun){
      return
    }

    window.hasRun = true;

    function create_audio_compressor(){
      var video = document.querySelector('video');
        var audioCtx = new AudioContext()
      var gainVal = 100
      var source = audioCtx.createMediaElementSource(video);
      var compressor = audioCtx.createDynamicsCompressor()
    
      compressor.threshold.value = -gainVal
      compressor.ratio.value = 20
      compressor.attack.value = 0.1
      compressor.release.value = 1.0
    
      source.connect(compressor)
      compressor.connect(audioCtx.destination)
      let message_style = "color: white; background-color: hsl(200, 90%, 50%)"
      console.log('%c dynamic compressor active, turn off script and reload to deactivate', message_style)
      
    }
    
    
    create_audio_compressor()
    })()