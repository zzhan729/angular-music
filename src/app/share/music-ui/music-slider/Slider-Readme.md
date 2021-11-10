# Horizontal Slider
    track: width
    handle: left
# Verical Slider
    track: height
    handle: bottom

# PC
    mousedown mousemove mouseup
    MouseEvent

    event.pageX ||  event.pageY 

# Phone
    touchstart touchmove touchend
    TouchEvent
    
    event.touch[0].pageX || event.touch[0].pageY

# Slider postion
position => val
position / length of slider === (val - min)/ (max-min)

ratio === (val-min) / (max-min)

ratio * (max-min) + min === val