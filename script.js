// Load projects from localStorage or use default
let projects = JSON.parse(localStorage.getItem("projects")) || [
  {
    title: "Portfolio Website",
    description: "Personal responsive portfolio website"
  }
];

// Render projects
function renderProjects() {
  let output = "";
  projects.forEach((project, index) => {
    output += `
      <div class="card p-3 mb-3">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
      </div>
    `;
  });

  document.getElementById("projects-list").innerHTML = output;
}

// Add project
function addProject() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Please fill all fields");
    return;
  }

  projects.push({ title, description });
  localStorage.setItem("projects", JSON.stringify(projects));

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  renderProjects();
}

// Load on page start
renderProjects();
