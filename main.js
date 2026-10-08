document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.skills-item');

    const observerOptions = {
        root: null, 
        rootMargin: "0px 0px -15% 0px", 
        threshold: 0 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    items.forEach(item => {
        observer.observe(item);
    });
});

window.onload = pageLoad;

function pageLoad() {
    addProjectDetails();
}

function addProjectDetails() {
    // 1. ข้อมูล Role / Timeline / Year ของแต่ละโปรเจกต์
    const projectData = [
        { role: "Game Developer, Technical Artist", timeline: "4 Months", year: "2026" }, // 1. Into My Intern
        { role: "Game Producer", timeline: "3 Months", year: "2026" },                   // 2. Magnet Rush
        { role: "Animator, QA", timeline: "", year: "2026" },                             // 3. 3D Model/Animator
        { role: "VFX Artist", timeline: "", year: "2026" }                                // 4. VFX
    ];

    const rows = document.querySelectorAll(".project-row");

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const data = projectData[i];
        
        const nameSpan = row.querySelector(".project-name");
        const imgEl = row.querySelector(".project-img"); // หาแท็กรูปที่มีอยู่ใน HTML

        // --- จัดการฝั่งซ้าย (สร้างกล่องครอบชื่อ และรายละเอียด) ---
        const colTitle = document.createElement("div");
        colTitle.className = "col-title";
        row.insertBefore(colTitle, nameSpan);
        colTitle.appendChild(nameSpan);

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "expandable-details";
        
        let innerContent = `<div class="details-inner">`;
        innerContent += `<div><small>ROLE</small><p>${data.role}</p></div>`;
        if (data.timeline !== "") {
            innerContent += `<div><small>TIMELINE</small><p>${data.timeline}</p></div>`;
        }
        innerContent += `<div><small>YEAR</small><p>${data.year}</p></div>`;
        innerContent += `</div>`;
        detailsDiv.innerHTML = innerContent;
        colTitle.appendChild(detailsDiv);

        // --- จัดการฝั่งขวา (สร้างกล่องครอบรูปภาพ) ---
        const expandImgDiv = document.createElement("div");
        expandImgDiv.className = "expandable-image";
        
        const imgInner = document.createElement("div");
        imgInner.className = "image-inner";
        expandImgDiv.appendChild(imgInner);

        // ถ้ารูปมีอยู่แล้วใน HTML ให้จับย้ายมาใส่ในกล่องแอนิเมชัน
        if (imgEl) {
            row.insertBefore(expandImgDiv, imgEl);
            imgInner.appendChild(imgEl);
        } else {
            // ถ้าแถวไหนไม่มีรูป (เช่นโดนคอมเมนต์ไว้) ก็ใส่กล่องเปล่าจองพื้นที่ไว้ก่อน
            row.appendChild(expandImgDiv);
        }
    }
}