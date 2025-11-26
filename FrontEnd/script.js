console.log("script.js loaded");

const gallery = document.querySelector(".gallery");
const filtersContainer = document.querySelector(".filters");

let allWorks = [];

fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        allWorks = data;
        displayWorks(allWorks);
    })
    .catch((error) => {
        console.error("Erreur API Works:", error);
    });


fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.dataset.categoryId = "all";
        allButton.classList.add("filter-btn", "active");
        filtersContainer.appendChild(allButton);

        allButton.addEventListener("click", () => {
            setActiveButton(allButton);
            displayWorks(allWorks);
        });

        categories.forEach((category) => {
            const button = document.createElement("button");
            button.textContent = category.name;
            button.dataset.categoryId = category.id;
            button.classList.add("filter-btn");
            filtersContainer.appendChild(button);

            button.addEventListener("click", () => {
                setActiveButton(button);
                const filtered = allWorks.filter(
                    work => work.categoryId == category.id
                );
                displayWorks(filtered);
            });
        });
    })
    .catch((error) => {
        console.error("Erreur API Categories:", error);
    });

fetch("http://localhost:5678/api/users/login")
    .then((response) => response.json())
    .then((data) => {
        console.log("User login data:", data);
    })
    .catch((error) => {
        console.error("Erreur API Users Login:", error);
    });

function displayWorks(works) {
    gallery.innerHTML = "";

    works.forEach((work) => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const caption = document.createElement("figcaption");
        caption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    });
}


function setActiveButton(activeButton) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    activeButton.classList.add("active");
}
