window.onload = function () {
    const translateButton = document.getElementById("translate-button");
    const soundButtonTranslation = document.getElementById("sound-button-translation");
    const soundButtonTranslated = document.getElementById("sound-button-translated");
    const copyButtonTranslation = document.getElementById("copy-button-translation");
    const copyButtonTranslated = document.getElementById("copy-button-translated");
    const changeLangButton = document.getElementById("change-lang-button");
    const translation = document.getElementById('first-translate-input');
    const translationCount = document.getElementById('count-translation-textarea');
    let translationText = "";
    translationText = translation.value;
    translationCount.innerHTML = translationText.length;
    transaltionFunction(translationText);

    soundButtonTranslation.onclick = function () {
        SpeechSynthesis(translationText);
    }
    function copyText(textarea) {
        navigator.clipboard.writeText(document.getElementById(textarea).value);
    }
    function SpeechSynthesis(text) {
        let utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
    function transaltionFunction(translationText) {
        const translationFilter = document.querySelector("#translation-filter").querySelectorAll('.is-checked')[0].getAttribute('data-filter');
        const translatedFilter = document.querySelector("#translated-filter").querySelectorAll('.is-checked')[0].getAttribute('data-filter');
        if (translationText) {
            soundButtonTranslation.onclick = function () {
                SpeechSynthesis(translationText);
            }
            fetch('https://api.mymemory.translated.net/get?q=' + translationText + `&langpair=${translationFilter}|${translatedFilter}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("second-translate-input").value = data.responseData.translatedText;
                    soundButtonTranslated.onclick = function () {
                        SpeechSynthesis(data.responseData.translatedText);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            document.getElementById("second-translate-input").value = "";
        }
    }
    changeLangButton.onclick = function () {
        const translationFilter = document.querySelector("#translation-filter").querySelectorAll('.is-checked')[0].getAttribute('data-filter');
        const translatedFilter = document.querySelector("#translated-filter").querySelectorAll('.is-checked')[0].getAttribute('data-filter');

        for (let i = 0; i < document.querySelector("#translation-filter").querySelectorAll('.button-lang').length; i++) {
            if (translatedFilter === document.querySelector("#translation-filter").querySelectorAll('.button-lang')[i].getAttribute('data-filter')) {
                document.querySelector("#translated-filter").querySelectorAll('.is-checked')[0].classList.remove('is-checked');
                document.querySelector("#translation-filter").querySelectorAll('.button-lang')[i].classList.toggle('is-checked');
            }
        }

        for (let i = 0; i < document.querySelector("#translated-filter").querySelectorAll('.button-lang').length; i++) {
            if (translationFilter === document.querySelector("#translated-filter").querySelectorAll('.button-lang')[i].getAttribute('data-filter')) {
                document.querySelector("#translation-filter").querySelectorAll('.is-checked')[0].classList.remove('is-checked');
                document.querySelector("#translated-filter").querySelectorAll('.button-lang')[i].classList.toggle('is-checked');
            }
        }
    }
    copyButtonTranslation.onclick = function () {
        copyText("first-translate-input");
    }
    copyButtonTranslated.onclick = function () {
        copyText("second-translate-input");
    }
    translateButton.onclick = function () {
        translationText = translation.value;
        transaltionFunction(translationText);
    };
    translation.addEventListener("keyup", (event) => {
        translationText = translation.value;
        translationCount.innerHTML = translationText.length;

        transaltionFunction(translationText);
    });
    function filterLanguage(id) {
        $filters = document.getElementById(id).addEventListener('click', function (event) {
            let $this = event.target;
            let filterValue;
            if ($this.matches('.is-checked')) {
                filterValue = '*';
            } else {
                filterValue = $this.getAttribute('data-filter');
                document.querySelector("#" + id).querySelectorAll('.is-checked')[0].classList.remove('is-checked');
            }
            $this.classList.toggle('is-checked');
        });
    }
    filterLanguage('translation-filter');
    filterLanguage('translated-filter');
};