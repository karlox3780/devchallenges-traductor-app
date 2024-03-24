window.onload = function () {
    const translateButton = document.getElementById("translate-button");
    const translation = document.getElementById('first-translate-input');
    const translationCount = document.getElementById('count-translation-textarea');
    let translationText = "";
    translationText = translation.value;
    translationCount.innerHTML = translationText.length;

    translateButton.onclick = function () {
        translationText = translation.value;
        fetch('https://api.mymemory.translated.net/get?q=' + translationText + '&langpair=en|fr')
            .then(response => response.json())
            .then(data => {
                console.log(data.responseData.translatedText)
                document.getElementById("second-translate-input").value = data.responseData.translatedText;
            })
            .catch(error => {
                console.log(error)
            })
    };
    translation.addEventListener("keyup", (event) => {
        translationText = translation.value;
        translationCount.innerHTML = translationText.length;
    });
};