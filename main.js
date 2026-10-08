window.onload = pageLoad;

function pageLoad() {
    setupSkillsObserver();
    setupProjects();
}

function setupSkillsObserver() {
    const items = document.querySelectorAll('.skills-item');
    
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    items.forEach(function(item) {
        observer.observe(item);
    });
}

function handleIntersection(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}

const projectData = {
    "Into My Intern": {
        role: "Web Developer",
        timeline: "1 Months",
        year: "2023",
        image: "./img/IntoMyInern.png"
    },
    "Magnet Rush": {
        role: "Game Developer",
        timeline: "1 Months",
        year: "2025",
        image: "./img/MagnetRush.png"
    },
    "3D Model/Animator": {
        role: "3D Artist / Animator",
        timeline: "--.--",
        year: "2021-2026",
        image: "images/3d-model.png"
    },
    "VFX": {
        role: "VFX Artist",
        timeline: "--.--",
        year: "2022-2026",
        image: "images/vfx.png"
    }
};

function createProjectInfo(title, value) {
    const container = document.createElement("div");
    container.classList.add("project-info");

    const label = document.createElement("span");
    label.textContent = title;

    const text = document.createElement("p");
    text.textContent = value;

    container.appendChild(label);
    container.appendChild(text);

    return container;
}

function createProjectImage(src) {
    const img = document.createElement("img");
    img.classList.add("project-img");
    img.src = src;
    return img;
}

function createProjectDetail(data) {
    const detail = document.createElement("div");
    detail.classList.add("project-detail");

    const role = createProjectInfo("ROLE", data.role);
    const timeline = createProjectInfo("TIMELINE", data.timeline);
    const year = createProjectInfo("YEAR", data.year);
    const image = createProjectImage(data.image);

    detail.appendChild(role);
    detail.appendChild(timeline);
    detail.appendChild(year);
    detail.appendChild(image);

    return detail;
}

function setupProjects() {
    const projects = document.querySelectorAll(".project-item");

    console.log("พบ Project ทั้งหมด:", projects.length);

    projects.forEach(function(project) {
        project.addEventListener("mouseenter", function() {
            console.log("Hover:", project.querySelector(".project-name").textContent);

            const projectName = project.querySelector(".project-name").textContent.trim();
            const data = projectData[projectName];

            if (!data) {
                console.log("ไม่พบข้อมูลของ:", projectName);
                return;
            }

            const oldDetail = project.querySelector(".project-detail");

            if (oldDetail) {
                oldDetail.remove();
            }

            const detail = createProjectDetail(data);
            project.appendChild(detail);
        });

        project.addEventListener("mouseleave", function() {
            const detail = project.querySelector(".project-detail");

            if (detail) {
                detail.remove();
            }
        });
    });
}