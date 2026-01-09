// Load projects on page load
fetchProjects();

function fetchProjects() {
  fetch("/projects")
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.forEach((project, index) => {
        output += `
          <div class="card p-3 mb-3">
            <h4>${project.title}</h4>
            <p>${project.description}</p>

            <button class="btn btn-warning btn-sm me-2"
              onclick="editProject(${index}, '${project.title}', '${project.description}')">
              Edit
            </button>

            <button class="btn btn-danger btn-sm"
              onclick="deleteProject(${index})">
              Delete
            </button>
          </div>
        `;
      });
      document.getElementById("projects-list").innerHTML = output;
    });
}

// CREATE
function addProject() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  fetch("/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  }).then(() => {
    fetchProjects();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  });
}

// UPDATE
function editProject(index, oldTitle, oldDescription) {
  const title = prompt("Edit title:", oldTitle);
  const description = prompt("Edit description:", oldDescription);

  fetch(`/projects/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  }).then(() => fetchProjects());
}

// DELETE
function deleteProject(index) {
  fetch(`/projects/${index}`, {
    method: "DELETE"
  }).then(() => fetchProjects());
}
