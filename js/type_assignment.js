var evaluateButton = document.querySelector("#evaluate");
var score = 0;
function redirectToType() {
    var url;
    if (score < 23) {
        url = "/online-guide-digitale-weiterbildung/typzuordnung-auswertung-typ-1/";
    } else if (score < 34) {
        url = "/online-guide-digitale-weiterbildung/typzuordnung-auswertung-typ-2/";
    } else {
        url = "/online-guide-digitale-weiterbildung/typzuordnung-auswertung-typ-3/";
    }
    document.location.href = document.location.origin + url;
    evaluateButton.classList.remove("disabled");
}
var wpcf7Elm = document.querySelector(".wpcf7");
wpcf7Elm.addEventListener("wpcf7submit", function(event) {
    redirectToType();
}, false);
evaluateButton.addEventListener("click", function(event) {
    event.preventDefault();
    evaluateButton.classList.add("disabled");
    const evaluationResults = new Map();
    [].slice.call(document.querySelectorAll("input.evaluation-scale")).forEach(function(input) {
        if (!evaluationResults.has(input.name)) {
            evaluationResults.set(input.name, "2.5");
        }
        if (input.checked) {
            evaluationResults.set(input.name, input.value);
        }
    });
    var inputMissing = false;
    evaluationResults.forEach(function(value, key) {
        if ("2.5" === value) {
            inputMissing = true;
            document.getElementById("evaluation_form_required").style.display = "block";
        }
    });
    if (inputMissing) {
        evaluateButton.classList.remove("disabled");
        return;
    }
    score = 0;
    evaluationResults.forEach(function(value, key) {
        var wpcf7Input = document.querySelector("[name=\"" + key + "_form\"]");
        if (wpcf7Input) {
            wpcf7Input.value = value;
        }
        score += parseFloat(value);
    });
    var typeUserIdInput = document.querySelector("#type_user_id");
    if (typeUserIdInput) {
        typeUserIdInput.value = TypeUserId.getCookie();
    }
    var wpcf7Form = wpcf7Elm.querySelector("form");
    if (wpcf7Form.requestSubmit) {
        wpcf7Form.requestSubmit();
    } else {
        redirectToType();
    }
});
