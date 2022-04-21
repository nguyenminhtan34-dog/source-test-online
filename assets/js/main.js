const btn = document.getElementById("btn");
const sideBar = document.querySelector(".sidebar");
btn.onclick = () => {
  sideBar.classList.toggle("toggle");
  btn.classList.toggle("move-to-right");
};

const userAva = document.querySelector(".user-ava");
const info = document.querySelector(".change-info");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-icon");
userAva.onclick = () => {
  info.classList.add("active");
  overlay.classList.add("show");
};
closeBtn.onclick = () => {
  info.classList.remove("active");
  overlay.classList.remove("show");
};

const selectedAll = document.querySelectorAll(".selected");

selectedAll.forEach((selected) => {
  const optionsContainer = selected.previousElementSibling;
  const searchBox = selected.nextElementSibling;

  const optionsList = optionsContainer.querySelectorAll(".option");

  selected.addEventListener("click", () => {
    if (optionsContainer.classList.contains("active")) {
      optionsContainer.classList.remove("active");
    } else {
      let currentActive = document.querySelector(".options-container.active");

      if (currentActive) {
        currentActive.classList.remove("active");
      }

      optionsContainer.classList.add("active");
    }

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active")) {
      searchBox.focus();
    }
  });

  optionsList.forEach((o) => {
    o.addEventListener("click", () => {
      selected.innerHTML = o.querySelector("label").innerHTML;
      optionsContainer.classList.remove("active");
    });
  });

  searchBox.addEventListener("keyup", function (e) {
    filterList(e.target.value);
  });

  const filterList = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach((option) => {
      let label =
        option.firstElementChild.nextElementSibling.innerText.toLowerCase();
      if (label.indexOf(searchTerm) != -1) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  };
});

google.charts.load("current", { packages: ["bar"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Ngày", "Danh thu", "Lợi nhuận"],
    ["16/09", 78000, 60000],
    ["17/09", 90000, 110000],
    ["18/09", 130000, 60000],
    ["19/09", 157000, 115000],
  ]);

  var chart = new google.charts.Bar(
    document.getElementById("columnchart_material")
  );

  chart.draw(data, google.charts.Bar.convertOptions());
}
