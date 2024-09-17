// This is a simple static HTML page with a form to build a resume.
// TypeScript version of the dynamic resume builder

document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form elements with type assertions
    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;
    const projectElement = document.getElementById(
      "project"
    ) as HTMLInputElement;

    // Check that elements are present
    if (
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      projectElement
    ) {
      // Get values from the form
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const project = projectElement.value;
       // Picture element
       const profilePictureFile = profilePictureInput.files?.[0];
       const profilePictureURL = profilePictureFile
         ? URL.createObjectURL(profilePictureFile)
         : "";

      // Create the resume output
      const resumeOutput = `
            <h2>Resume</h2>
             ${
              profilePictureURL
                ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
                : ""
            }
            <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
            <p><strong>Phone:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Work Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;
      
      // Add validation for required fields
      // Get the resume output element
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
      makeeditable();
      }
    } else {
      console.error("One or more form elements are missing.");
    }
  });
function makeeditable() {
  const editableElements = document.querySelectorAll("[editable]");
  editableElements.forEach((element) => {
    element.addEventListener("click",function(){
      const currentElement = element as HTMLInputElement;
      const currentValue = currentElement.textContent || "";

      //Replace content
      if (currentElement.tagName === "p" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("eding-input");
        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });
        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();

      }
    })
  })
}