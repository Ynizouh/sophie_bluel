console.log("script.js loaded");

const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";
const filtersContainer = document.querySelector(".filters");


fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        console.log("data works:", data);
        data.forEach((work) => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;
            const caption = document.createElement("figcaption");
            caption.textContent = work.title;
            figure.appendChild(img);
            figure.appendChild(caption);
            gallery.appendChild(figure);
            console.log("work:", work);
        });
    })
    .catch((error) => {
        console.error("Error fetching works:", error);
    });

fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
        console.log("data categories:", categories);
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.dataset.categoryId = "all";
        filtersContainer.appendChild(allButton);
        categories.forEach((category) => {
            const button = document.createElement("button");
            button.textContent = category.name;
            button.dataset.categoryId = category.id;
            filtersContainer.appendChild(button);
            console.log("category:", category);
        });
    });
    