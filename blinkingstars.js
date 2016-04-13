////////////////
// Blinking stars
//
// Jose Manuel Gómez Poveda
////////////////

var _supports_gradients;
function supports_gradients()
{
    if (_supports_gradients == undefined)
    {
        var mElem  = document.createElement('modern');
        var mStyle = mElem.style;

        ["","-o-","-moz-","-webkit-","-ms-"].forEach(function(el,i) { mStyle.backgroundImage = el+"linear-gradient(top, #9f9, white)"; })
        mStyle.backgroundImage = "-webkit-gradient(linear, top, bottom, from(#9f9), to(white))"

        _supports_gradients = (mStyle.backgroundImage.indexOf("gradient") != -1);

        console.log("Gradients supported: " + _supports_gradients);
        return _supports_gradients;
    }
    else return _supports_gradients;
}

function createStarsParticleGradients(id, maxParticleSize, maxParticleDelayMs)
{
    // Let's have some variation in the stars
    var delay = Number((Math.random()*maxParticleDelayMs).toFixed())
    var size = 1 + Number((Math.random()*(maxParticleSize-1)).toFixed());

    // Creation of the gradient

    var particleDiv = document.createElement('div');
    particleDiv.className  = "blinkingstar"
    particleDiv.style.position = "absolute";
    particleDiv.style.top    = (Math.random()*99)+"%";
    particleDiv.style.left   = (Math.random()*99)+"%";
    particleDiv.style.width  = size + "px";
    particleDiv.style.height = size + "px";

    var color = Number((size * 192 / maxParticleSize).toFixed()).toString(16);
    color = "#" + color + "" + color + "" + color;
    particleDiv.style.background = color;

    particleDiv.style.background = "-webkit-radial-gradient(center, ellipse cover, " + color + " 0%, rgba(0,0,0,0) 100%)"; // Chrome10+,Safari5.1+
    particleDiv.style.background = "radial-gradient(ellipse at center, " + color + " 0%, rgba(0,0,0,0) 100%)"; // W3C
    particleDiv.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(opacity=100, finishopacity=0, style=2)"; // IE8-9

    particleDiv.style.animationDelay       = delay + "ms";
    particleDiv.style.WebkitAnimationDelay = delay + "ms";

    return particleDiv;
}

function createStarsParticleNoGradients(id, maxParticleSize)
{
    // Let's have some variation in the stars
    var size = 1 + Number((Math.random()*(maxParticleSize-1)).toFixed());

    // Creation of the gradient using concentric circles

    var particleDiv = document.createElement('div');
    particleDiv.style.position = "absolute";
    particleDiv.style.top    = (Math.random()*99)+"%";
    particleDiv.style.left   = (Math.random()*99)+"%";
    particleDiv.style.width  = size + "px"
    particleDiv.style.height = size + "px"

    for (var s = size-1; s > 0; s--)
    {
        var circle;
        if (size == 1)
        {
            circle = particleDiv;
        }
        else
        {
            circle = document.createElement('div');
            particleDiv.appendChild(circle);
            particleDiv.textAlign = "center";
        }

        circle.style.position     = "absolute";
        circle.style.display      = "inline-block";
        circle.style.margin       = "0 auto";
        circle.style.borderRadius = "10px";
        circle.style.top    = (maxParticleSize / 2).toFixed() - s + "px";
        circle.style.left   = (maxParticleSize / 2).toFixed() - s + "px";
        circle.style.width  = s*2-1 + "px";
        circle.style.height = s*2-1 + "px";

        var color = Number(((size-s) * 256 / maxParticleSize).toFixed()).toString(16);
        circle.style.background = "#" + color + "" + color + "" + color;
    }

    return particleDiv;
}

function createStars(containerId, numberOfParticles, maxParticleSize, maxParticleDelayMs)
{
    console.log("Creating " + numberOfParticles + " stars (max size: " + maxParticleSize + " pixels, max delay: " + maxParticleDelayMs + " ms)");

    var container = document.getElementById(containerId);

    var createParticle = createStarsParticleGradients;
    if (!supports_gradients())
        createParticle = createStarsParticleNoGradients;    // fallback for IE 8-9

    for (var i = 0; i < numberOfParticles; i++)
    {
        container.appendChild(createParticle(i, maxParticleSize, maxParticleDelayMs));
    }

    console.log("Stars created");
}

function createDefaultStars()
{
    var numberOfParticles  = 125;
    var maxParticleSize    = 5;
    var maxParticleDelayMs = 10000;

    //var starsDiv = document.createElement("div");
    //starsDiv.id = "blinkingstars";
    //document.body.appendChild(starsDiv);

    createStars("blinkingstars", numberOfParticles, maxParticleSize, maxParticleDelayMs);
}

//window.onload = createDefaultStars();
window[ addEventListener ? 'addEventListener' : 'attachEvent' ]( addEventListener ? 'load' : 'onload', createDefaultStars );