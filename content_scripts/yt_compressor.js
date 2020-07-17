(function(){
    if (window.hasRun){
      return
    }

    window.hasRun = true;
   
    const youtube_play_bar = document.querySelector('.ytp-left-controls')
    let compression_on = false
    let compressor;
    let source;
    let audioCtx = new AudioContext()

    let icons = {
      'off' : `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M15,21H9V3H15V21M11,19H13V5H11V19M8,21H2V11H8V21M4,19H6V13H4V19M22,21H16V8H22V21M18,19H20V10H18V19Z" />
  </svg>`,
      "on" : `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M10,20H14V4H10V20M4,20H8V12H4V20M16,9V20H20V9H16Z" />
  </svg>`
    }

    // creates the audio context
    // grabs the video player turns it into a media source
    // create the compressor
    function create_audio_compressor(){
      var video = document.querySelector('video');
      var gainVal = 50
      source = audioCtx.createMediaElementSource(video);
      compressor = audioCtx.createDynamicsCompressor()
    
      compressor.threshold.value = -gainVal
      compressor.ratio.value = 20
      compressor.attack.value = 0.01
      compressor.release.value = 0.2

      source.connect(audioCtx.destination)
      
    }
    // helper function for creating the button
    function create_button(){
      var btn = document.createElement('button');
      btn.id = "yt_compression_button"
      btn.innerHTML = icons.off
      btn.classList.add('ytp-button')
      btn.style.cssText = `padding: 0.2em`
      youtube_play_bar.appendChild(btn)
      return btn
    }

    // helper function for disconnecting the audio context and
    // reconnecting it to the compressor
    // disconnect function does the opposite
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
    
    // quick function to place in the event listener
    // checks the state of the audio compressor and 
    // toggle both the button and the compressors
    function connect_objects(){
      compression_on = !compression_on
      if (compression_on){
        connect_compressor()
        compression_button.innerHTML = icons.on
      }
      else{
        disconect_compressor()
        compression_button.innerHTML = icons.off
      }
    }

    let compression_button = create_button()

    compression_button.addEventListener('click', connect_objects)
    
    })()