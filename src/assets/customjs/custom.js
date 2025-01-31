window.onload = function () {
  let menuLinks = document.querySelectorAll(".iocn-link");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      let clickedLi = e.target.closest("li"); // Get the clicked <li> element
      let allLiItems = document.querySelectorAll(".nav-links > li"); // Get all <li> items in nav-links

      // Check if the clicked <li> is already active
      if (clickedLi.classList.contains("showMenu")) {
        // If the clicked item is already open, close it
        clickedLi.classList.remove("active");
        clickedLi.classList.remove("showMenu");
      } else {
        // Otherwise, close all other <li> items
        allLiItems.forEach(item => {
          item.classList.remove("active");
          item.classList.remove("showMenu");
        });

        // Add 'active' and 'showMenu' class to the clicked <li>
        clickedLi.classList.add("active");
        clickedLi.classList.add("showMenu");
      }
    });
  });
}