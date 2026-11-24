
document.addEventListener("DOMContentLoaded", () => {
    const toast = document.getElementById("authErrorToast");

    if (!toast) return;

    const closeButton = toast.querySelector(".auth-error-close");

    closeButton.addEventListener("click", () => {
        toast.remove();
    });
});
