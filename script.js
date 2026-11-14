let students = [];
let editIndex = -1;

const form = document.getElementById("studentForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;

    let student = {
        name: name,
        roll: roll,
        course: course,
        marks: marks
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        document.getElementById("submitBtn").textContent =
            "Add Student";
    }

    form.reset();
    displayStudents();
});

function displayStudents() {
    let list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach(function(student, index) {
        let row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button class="edit"
                    onclick="editStudent(${index})">
                    Edit</button>

                    <button class="delete"
                    onclick="deleteStudent(${index})">
                    Delete</button>
                </td>
            </tr>
        `;

        list.innerHTML += row;
    });

    document.getElementById("total").textContent =
        students.length;
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function editStudent(index) {
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("course").value = student.course;
    document.getElementById("marks").value = student.marks;

    editIndex = index;

    document.getElementById("submitBtn").textContent =
        "Update Student";
}

document.getElementById("search").addEventListener(
    "input", function() {

    let value = this.value.toLowerCase();

    let rows = document.querySelectorAll("#studentList tr");

    rows.forEach(function(row) {
        let name = row.cells[0].textContent.toLowerCase();

        row.style.display =
            name.includes(value) ? "" : "none";
    });
});