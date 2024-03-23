window.onload = function () {
    const translateButton = document.getElementById("translate-button");
    const translateText = document.getElementById('first-translate-input').value;
    translateButton.onclick = function () {
        fetch('https://api.mymemory.translated.net/get?q=' + translateText + '&langpair=en|fr')
            .then(response => response.json())
            .then(data => {
                console.log(data.responseData.translatedText)
                document.getElementById("second-translate-input").value = data.responseData.translatedText;
            })
            .catch(error => {
                console.log(error)
            })
    };
};