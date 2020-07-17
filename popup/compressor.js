
const toggle_button = document.querySelector('#compressor_toggle');
let is_compressor_active = false

toggle_button.addEventListener('click', function(){
    is_compressor_active = !is_compressor_active
    toggle_button.children[0].classList.toggle('active')
})

function _toggle_compressor(tabs){
    if(is_compressor_active){
        browser.tabs.sendMessage(tabs[0].id, {
            command: "compress_active", 
    
        })
    }else if(is_compressor_active == false){
        browser.tabs.sendMessage(tabs[0].id, {
            command: "compress_inactive", 
    
        })
    }
}

browser.tabs.executeScript({file: '/content_Scripts/yt_compressor.js'})