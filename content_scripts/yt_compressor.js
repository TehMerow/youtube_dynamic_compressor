

(function(){
  
    // Quick check to see if the addon has run 
    // on the page before.
    if (window.hasRun){
      return
    }

    window.hasRun = true;
    const default_compressor_settings = {
      "threshold" : -50,
      "ratio" : 20,
      "attack" : 0.01,
      "release" : 0.2
    }
    // Grabs the Youtube play bar where the 
    // left hand controls are. Used so 
    // the compression button has a place to go.
    const youtube_play_bar = document.querySelector('.ytp-left-controls')
    
    // Compression boolean if it's on
    // or off.
    let compression_on = false

    // creates compressor, source and audio context variables
    let compressor;
    let source;
    let audioCtx = new AudioContext()

    // Dictionary for storing the SVG icons
    // that represent the On and Off states.
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
    function create_audio_compressor(thresh, ratio, attack, release){
      var video = document.querySelector('video');
      source = audioCtx.createMediaElementSource(video);
      compressor = audioCtx.createDynamicsCompressor()
      
      // compressor settings
      // TODO
      // Expose these controls in a settings page 
      compressor.threshold.value = thresh
      compressor.ratio.value = ratio
      compressor.attack.value = attack
      compressor.release.value = release

      // Connect the audio source (the video player)
      // to the audio context.
      // For some reason the audio completely breaks 
      // if you don't do this. 
      source.connect(audioCtx.destination)
      
    }
    // Helper function for creating the button
    // Creates the button, adds and ID 
    // Inserts the off SVG icon (could be a better way to do this?)
    // Adds the ytp-buttton class which is the youtube player button
    // Class that styles it the same as the other buttons
    // Adds some padding
    // appends it to the ytp-playbar
    // returns button
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


    // Function for instatiating the compressor
    // and then propogating the values with 
    // either default values or if a 
    // local storage entry exists, fill it 
    // with the local storage values
   function _instance_compressor(){
     let ls = localStorage
     if (ls.getItem("compression_settings_threshold") == null){
       create_audio_compressor(
         default_compressor_settings.threshold,
         default_compressor_settings.ratio,
         default_compressor_settings.attack,
         default_compressor_settings.release,
       )
     }else{
       create_audio_compressor(
        ls.getItem("compression_settings_threshold"),
        ls.getItem("compression_settings_ratio"),
        ls.getItem("compression_settings_attack"),
        ls.getItem("compression_settings_release")
       )
     }
   }
    
   _instance_compressor()

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

    // Create the compression button and cache 
    // in variable
    let compression_button = create_button()

    // Attaches a click event to the button
    compression_button.addEventListener('click', connect_objects)
    
    })()