// Skript für Formulare

/**
 * Überträgt den Seitentitel in Digitalcheck_Evaluation_Inhaltsblock- und Digitalcheck_Evaluation_Typzuordung-Formulare
 */
var currentPageInput = document.querySelector("#");
if (currentPageInput) {
    currentPageInput.value = document.querySelector("title").innerText;
}
/**
 * Überträgt die generierte Benutzer-ID in die Formulare
 */
var typeUserIdInput = document.querySelector("#type_user_id");
if (typeUserIdInput) {
    typeUserIdInput.value = TypeUserId.getCookie();
}
