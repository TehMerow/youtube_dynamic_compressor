// The is the Settings Page script file
// everything in here is for the settings page
// aka handling the slider values, checking 
// localstorage for things and setting
// localstorage items.

const default_compressor_settings = {
    "threshold" : -50,
    "ratio" : 20,
    "attack" : 0.01,
    "release" : 0.2
}


// helper function for setting the sliders 
// on the settings page
function set_sliders(th,ra,at,re){
    document.querySelector('#threshold').value = th
    document.querySelector('#ratio').value = ra
    document.querySelector('#attack').value = at
    document.querySelector('#release').value = re
}


// Checks to see if a localstorage item exists
// if it doesn't, fill with default values
// else fill with local storage items
function grab_local_storage(){
    var ls = localStorage
    if(ls.getItem('compression_settings_threshold') == null){
        set_sliders(
            default_compressor_settings.threshold,
            default_compressor_settings.ratio,
            default_compressor_settings.attack,
            default_compressor_settings.release
        )
        return
    }
    set_sliders(
        ls.getItem('compression_settings_threshold'),
        ls.getItem('compression_settings_ratio'),
        ls.getItem('compression_settings_attack'),
        ls.getItem('compression_settings_release')
    )
}

// helper function for caching the values of the sliders 
// into the local storage for further useage
function cache_sliders(){
    let ls = localStorage
    document.querySelector('#threshold').addEventListener('change', e => localStorage.setItem('compression_settings_threshold', e.target.value))
    document.querySelector('#ratio').addEventListener('change', e => localStorage.setItem('compression_settings_ratio', e.target.value))
    document.querySelector('#attack').addEventListener('change', e => localStorage.setItem('compression_settings_attack', e.target.value))
    document.querySelector('#release').addEventListener('change', e => localStorage.setItem('compression_settings_release', e.target.value))
}

// run the functions
grab_local_storage()
cache_sliders()