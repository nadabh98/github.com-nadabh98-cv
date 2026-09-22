/* =========================================================
   PORTFOLIO DATA
========================================================= */

const projects = [
  {
    id: "deforestation",
    number: "01",
    title: "AI Deforestation Detection",
    category: "Computer Vision · Google Cloud",
    short: "Detecting land-cover changes from multi-temporal Sentinel-2 imagery.",
    description:
      "A computer vision system using Sentinel-2 satellite imagery to detect land-cover changes. A U-Net segmentation model was trained with PyTorch and deployed through Google Cloud.",
    tools: [
      "Python",
      "PyTorch",
      "U-Net",
      "Sentinel-2",
      "Google Cloud",
      "Cloud Run",
      "Streamlit"
    ],
    result: "Dice 0.858 · IoU 0.752",
    stack: "PyTorch + Google Cloud",
    github: "https://github.com/nadabh98/deforestation-ai"
  },

  {
    id: "healthcare-rag",
    number: "02",
    title: "Healthcare RAG AI Assistant",
    category: "RAG · Azure AI",
    short: "A retrieval-augmented AI assistant for healthcare documents.",
    description:
      "An AI assistant combining document processing, embeddings, retrieval and LLM generation to produce responses grounded in a healthcare knowledge base.",
    tools: [
      "Python",
      "RAG",
      "Embeddings",
      "LLM",
      "Azure AI",
      "Azure AI Foundry",
      "OpenAI"
    ],
    result: "Grounded AI responses",
    stack: "Azure AI + RAG",
    github: "https://github.com/nadabh98/healthcare-rag-ai-assistant"
  },

  {
    id: "health-risk",
    number: "03",
    title: "AI Health Risk Prediction",
    category: "Machine Learning · AWS",
    short: "Machine-learning workflows using global air-quality data.",
    description:
      "A machine-learning project based on WHO air-quality data, covering data preparation, exploration and modelling of environmental health-related indicators.",
    tools: [
      "Python",
      "Pandas",
      "Machine Learning",
      "WHO Data",
      "AWS",
      "SageMaker"
    ],
    result: "Global environmental dataset",
    stack: "Python + AWS",
    github: "https://github.com/nadabh98/ai-health-aws"
  }
];


/* =========================================================
   STACK DATA
========================================================= */

const stackData = {
  "AI Engineering": {
    description:
      "Building machine-learning and generative-AI systems from experimentation to application.",
    skills: [
      "Python",
      "PyTorch",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "RAG",
      "LLM",
      "Embeddings",
      "Agents IA",
      "FastAPI"
    ]
  },

  "Cloud": {
    description:
      "Using cloud platforms to deploy AI applications and production-oriented workloads.",
    skills: [
      "Google Cloud",
      "Cloud Run",
      "Azure AI",
      "Azure AI Foundry",
      "OpenAI",
      "AWS AI",
      "SageMaker",
      "Docker"
    ]
  },

  "Data": {
    description:
      "Preparing, analysing and working with structured and unstructured data.",
    skills: [
      "SQL",
      "Pandas",
      "NumPy",
      "R",
      "Data Cleaning",
      "EDA",
      "Git",
      "GitHub"
    ]
  },

  "Biomedical": {
    description:
      "Connecting AI and engineering with healthcare and biomedical applications.",
    skills: [
      "Medical Imaging",
      "PET/CT",
      "DICOM",
      "3D Slicer",
      "Healthcare IT",
      "Medical Devices",
      "Biomedical Data"
    ]
  }
};


/* =========================================================
   PROJECTS
========================================================= */

function renderProjects() {

  const container = document.getElementById("project-list");

  if (!container) {
    console.error("project-list not found");
    return;
  }

  container.innerHTML = "";

  projects.forEach((project) => {

    const article = document.createElement("article");

    article.className = "project reveal";
    article.dataset.project = project.id;
    article.tabIndex = 0;

    article.innerHTML = `
      <div class="project-index">
        ${project.number}
      </div>

      <div class="project-main">

        <h3>${project.title}</h3>

        <div class="project-category">
          ${project.category}
        </div>

        <p class="project-description">
          ${project.short}
        </p>

        <div class="project-tools">
          ${project.tools.slice(0, 5).join(" · ")}
        </div>

      </div>

      <div class="project-result">
        <span>RESULT</span>
        <strong>${project.result}</strong>
      </div>

      <div class="project-arrow">
        →
      </div>
    `;

    container.appendChild(article);
  });

  observeReveals();
}


/* =========================================================
   PROJECT MODAL
========================================================= */

function setupProjectModal() {

  const modal = document.getElementById("project-modal");
  const content = document.getElementById("modal-content");
  const closeButton = document.getElementById("modal-close");
  const backdrop = document.querySelector(".modal-backdrop");
  const list = document.getElementById("project-list");

  if (!modal || !content || !list) return;

  function openProject(id) {

    const project = projects.find(
      (item) => item.id === id
    );

    if (!project) return;

    content.innerHTML = `
      <div class="modal-number">
        PROJECT ${project.number}
      </div>

      <h2>${project.title}</h2>

      <div class="modal-category">
        ${project.category}
      </div>

      <p class="modal-description">
        ${project.description}
      </p>

      <div class="modal-meta">

        <div class="modal-meta-block">
          <div class="modal-label">Stack</div>
          <div class="modal-value">
            ${project.stack}
          </div>
        </div>

        <div class="modal-meta-block">
          <div class="modal-label">Result</div>
          <div class="modal-value">
            ${project.result}
          </div>
        </div>

        <div class="modal-meta-block">
          <div class="modal-label">Technologies</div>

          <div class="modal-tools">
            ${project.tools
              .map(
                (tool) =>
                  `<span class="modal-tool">${tool}</span>`
              )
              .join(" · ")}
          </div>
        </div>

        <div class="modal-meta-block">
          <div class="modal-label">Type</div>
          <div class="modal-value">
            AI Engineering Project
          </div>
        </div>

      </div>

      <a
        href="${project.github}"
        target="_blank"
        rel="noopener"
        class="button button-primary modal-github"
      >
        View on GitHub <span>↗</span>
      </a>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  list.addEventListener("click", (event) => {

    const project = event.target.closest(".project");

    if (!project) return;

    openProject(project.dataset.project);
  });

  list.addEventListener("keydown", (event) => {

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const project = event.target.closest(".project");

    if (!project) return;

    event.preventDefault();

    openProject(project.dataset.project);
  });

  closeButton.addEventListener("click", closeProject);
  backdrop.addEventListener("click", closeProject);

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeProject();
    }
  });
}


/* =========================================================
   STACK
========================================================= */

function renderStack() {

  const tabsContainer = document.getElementById("stack-tabs");
  const contentContainer = document.getElementById("stack-content");

  if (!tabsContainer || !contentContainer) {
    console.error("Stack containers not found");
    return;
  }

  const names = Object.keys(stackData);

  tabsContainer.innerHTML = "";

  names.forEach((name, index) => {

    const button = document.createElement("button");

    button.className = "stack-tab";

    if (index === 0) {
      button.classList.add("active");
    }

    button.dataset.stack = name;
    button.textContent = name;

    tabsContainer.appendChild(button);
  });


  function showStack(name) {

    const data = stackData[name];

    contentContainer.innerHTML = `
      <h3>${name}</h3>

      <p>
        ${data.description}
      </p>

      <div class="skill-list">
        ${data.skills
          .map(
            (skill) =>
              `<span class="skill">${skill}</span>`
          )
          .join("")}
      </div>
    `;
  }


  showStack(names[0]);


  tabsContainer.addEventListener("click", (event) => {

    const button = event.target.closest(".stack-tab");

    if (!button) return;

    document
      .querySelectorAll(".stack-tab")
      .forEach((tab) => {
        tab.classList.remove("active");
      });

    button.classList.add("active");

    showStack(button.dataset.stack);
  });
}


/* =========================================================
   REVEAL
========================================================= */

let revealObserver = null;

function observeReveals() {

  const elements =
    document.querySelectorAll(".reveal");

  if (!elements.length) return;

  if (!revealObserver) {

    revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.05
        }
      );
  }

  elements.forEach((element) => {

    if (!element.classList.contains("visible")) {
      revealObserver.observe(element);
    }

  });
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
}


/* =========================================================
   ACTIVE NAV
========================================================= */

function setupActiveNavigation() {

  const links =
    document.querySelectorAll(".nav-links a");

  const sections = [
    document.getElementById("projects"),
    document.getElementById("stack"),
    document.getElementById("journey"),
    document.getElementById("contact")
  ].filter(Boolean);

  if (!sections.length) return;

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          links.forEach((link) => {

            link.style.color = "";

            if (
              link.getAttribute("href") ===
              `#${entry.target.id}`
            ) {
              link.style.color =
                "#f1f2ef";
            }
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

  sections.forEach((section) => {
    observer.observe(section);
  });
}


/* =========================================================
   START
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  renderProjects();

  renderStack();

  setupProjectModal();

  setupNavigation();

  setupActiveNavigation();

  observeReveals();

});
