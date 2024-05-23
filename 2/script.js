document.getElementById("filterForm")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        const currentForm = event.target;
        const formData = new FormData(currentForm);
        const query = formData.get("query");

        fetch("https://vm.nathoro.ru/timetable/by-group/ПИбд-41")
            .then(data => data.json())
            .then(data => {
                console.log(data);

                // Поиск контейнера в DOM-дереве.
                const root = document.getElementById("root");
                root.innerHTML = '';

                const subjectsTable = document.createElement("table");
                const headerRow = document.createElement("tr");
                const teacherName = document.createElement("th");
                const subjectName = document.createElement("th");
                const subjectType = document.createElement("th");
                teacherName.textContent = "TeacherName";
                subjectName.textContent = "SubjectName";
                subjectType.textContent = "SubjectType";
                headerRow.appendChild(teacherName);
                headerRow.appendChild(subjectName);
                headerRow.appendChild(subjectType);

                subjectsTable.appendChild(headerRow);

                var lessons = data[0].days[2].lessons;

                console.log("lessons: ", lessons);
                for (let index = 0; index < lessons.length; index++) {

                    if (!lessons[index])
                        continue;

                    const tr = document.createElement("tr");
                    const teacherNameCell = document.createElement("th");
                    const subjectNameCell = document.createElement("th");
                    const subjectTypeCell = document.createElement("th");

                    teacherNameCell.textContent = lessons[index].subject.teacher.fullName;
                    subjectNameCell.textContent = lessons[index].subject.name;
                    subjectTypeCell.textContent = lessons[index].subject.type;

                    if (lessons[index].subject.type.includes(query)) {
                        subjectTypeCell.classList.add("highlight");
                        console.log(subjectNameCell.classList);
                    }

                    tr.appendChild(teacherNameCell);
                    tr.appendChild(subjectNameCell);
                    tr.appendChild(subjectTypeCell);

                    subjectsTable.appendChild(tr);
                }
                root.appendChild(subjectsTable);
            });
    });

document.getElementById("clearBtn")
    .addEventListener("click", () => {
        const root = document.getElementById("root");
        root.innerHTML = '';
    });