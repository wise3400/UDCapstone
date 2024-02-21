// FUNCTION FROM: https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
// AND: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
// breaks the colors from HEX to RGB
function hexToRgb(hex) 
{
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// function from https://stackoverflow.com/a/9733420/3695983 
// AND: https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o                   
// this is the relative luminance calculation algorithm
function getLuminance(r, g, b) 
{
    var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
        ? v / 12.92
      : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Referred to: https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
function getContrastRatio(textColor, backgroundColor) 
{
    var textColor1 = hexToRgb(textColor);
    var backgroundColor1 = hexToRgb(backgroundColor);

    // This calculates the luminance
    var L1 = getLuminance(textColor1.r, textColor1.g, textColor1.b);
    var L2 = getLuminance(backgroundColor1.r, backgroundColor1.g, backgroundColor1.b);

    // L1 is relative luminance of lighter colors
    // L2 is relative luminance of darker colors
    // Compares luminance values of the textColor and backgroundColor 
    // If L1 is greater equal to L2, calculate the contrast ratio using the forumula
    // If L2 is greater than L1, calculate the contrast ratio using the formula
    if (L1 >= L2) 
    {
        // Contrast ratio formula
        return (L1 + 0.05) / (L2 + 0.05);
    } 
    else 
    {
        return (L2 + 0.05) / (L1 + 0.05);
    }
}

function checkContrast() {
    // getting the textColor and backgroundColor data from the HTML file
    var textColor = document.getElementById("textColor").value;
    var backgroundColor = document.getElementById("background").value;

    // this calculates the contrast ratio for both textColor and backgroundColor
    var contrastRatio = getContrastRatio(textColor, backgroundColor);

    // this displays the results 
    var contrastRatioData = document.getElementById("showData");
    
    // the toFixed method rounds the string to a specified number of decimals 
    contrastRatioData.innerHTML = "<br> Contrast Ratio: " + contrastRatio.toFixed(2) + "<br>" + "<br>";

    // if the contrast ratio is greater equal to 7
    if (contrastRatio >= 7) 
    {
        // WCAG AAA passes!
        contrastRatioData.innerHTML += "WCAG AAA - PASS <br>";
    } 
    else
    {
        contrastRatioData.innerHTML += "WCAG AAA - FAIL <br>";
    }
    
    if (contrastRatio >= 4.5) 
    {
        // WCAG AA passes
        contrastRatioData.innerHTML += "WCAG AA - PASS <br>";
    } 
    else
    {
        // fails
        contrastRatioData.innerHTML += "WCAG AA - FAIL";
    }
    

}






