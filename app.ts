
document.addEventListener('DOMContentLoaded', () =>{
  
    // Get the form, resume elements, and buttons
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resume = document.getElementById('finalresume') as HTMLDivElement;
    const generateResumeBtn = document.querySelector('.button') as HTMLButtonElement;
    const printButton = document.querySelector('.print') as HTMLButtonElement;
    const editButton = document.querySelector('.edit') as HTMLButtonElement;
    const downloadButton = document.querySelector('.download') as HTMLButtonElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;
    const shareButton = document.querySelector('.share') as HTMLButtonElement;
    
    // Define the resume data interface and initial state
    interface ResumeData {
        name: string;
        username: string;
        email: string;
        phone: string;
        objective: string;
        education: string;
        workExperience: string;
        skills: string[];
    }
    
    const resumeData: ResumeData = {
        name: '',
        username:'',
        email: '',
        phone: '',
        objective: '',
        education: '',
        workExperience: '',
        skills: [],
    };
    
    // Function to validate form data
    function validateFormData(data: ResumeData): boolean {
        if (!data.name || !data.username || !data.email || !data.phone || !data.objective || !data.education || !data.workExperience || !data.skills.length) {
            alert('Please fill in all the fields');
            return false;
        }
        if (!data.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert('Please enter a valid email');
            return false;
        }
        if (!data.phone.match(/^(\+92|03)\d{9}$/)) {
            alert('Please enter a valid phone number');
            return false;
        }
        return true;
    }
    
    // Function to generate resume HTML
    function generateResume() {
        if (!validateFormData(resumeData)) return;
    
        const skillsList = resumeData.skills.map(skill => `<li>${skill}</li>`).join('');
        const resumeHTML = `
            <h1>${resumeData.name}</h1>
            <p>${resumeData.email} <b>|</b> ${resumeData.phone}</p>
            <h2>Objective</h2>
            <p>${resumeData.objective}</p>
            <h2>Education</h2>
            <p>${resumeData.education}</p>
            <h2>Work Experience</h2>
            <p>${resumeData.workExperience}</p>
            <h2>Skills</h2>
            <ul>${skillsList}</ul>
        `;

    
        resume.innerHTML = resumeHTML;
        resume.style.display = 'block';
        form.style.display = 'none';
        printButton.style.display = 'block';
        editButton.style.display = 'block';
        downloadButton.innerHTML = '';
        shareButton.innerHTML = '';
        
         // Create a downloadable link
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeHTML);
    downloadLink.download = `${resumeData.username}_resume.html`;
    downloadLink.textContent = 'Download Resume';
    downloadButton.appendChild(downloadLink);
    downloadButton.style.display = 'block';

    //
    const shareLinkButton=document.createElement("button")
    shareLinkButton.textContent="Copy Share Link"
    shareLinkButton.style.display="block"
    shareLinkButton.addEventListener("mouseover", () => {
    shareLinkButton.style.backgroundColor = "darkgray"; // Change background color on hover
      });
      
      shareLinkButton.addEventListener("mouseout", () => {
        shareLinkButton.style.backgroundColor = "gray"; // Reset background color when not hovering
      });
    shareLinkButton.addEventListener("click",async()=>{
        try{
        // Generate shareable link
        const shareableLink=`https://yourdomain.com/resumes/${resumeData.name.replace(/\s+/g, "_")}_resume.html`;

        await navigator.clipboard.writeText(shareableLink)
        alert("Shareable link copied to clipboard")
    } catch(err){
        console.error("Error copying shareable link",err)
        alert("Failed to copy shareable link")
    }
    })
    shareButton.appendChild(shareLinkButton)
    shareButton.style.display="block"
    shareLinkButton.style.color="white";
    shareLinkButton.style.backgroundColor="gray";

    
    }
    
    // Function to handle the "Edit" button click
    function handleEdit() {
        resume.style.display = 'none';
        form.style.display = 'block';
        printButton.style.display = 'none';
        editButton.style.display = 'none';
        downloadButton.style.display = 'none';
        shareButton.style.display = 'none';
    }
    
    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get the form data
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            if (key === 'skills') {
                resumeData[key] = value.toString().split(',').filter(skill => skill.trim() !== '');
            } else {
                resumeData[key] = value.toString();
            }
        });
        const username = usernameElement.value;
    const uniquePath = `resume/${username.replace(/\s+/g, '_')}_resume.html`;
        
        generateResume();
    });
    
    
    // Event listener for print button
    printButton?.addEventListener('click', () => {
        // Ensure resume is visible before printing
        resume.style.display = 'block';
        form.style.display = 'none';
        printButton.style.display = 'none';
        editButton.style.display = 'none';
        downloadButton.style.display = 'none';
        shareButton.style.display = 'none';
        
    
        // Delay to ensure content is rendered
        setTimeout(() => {
            window.print();
            
            // Reset display properties after printing
            resume.style.display = 'block';
            form.style.display = 'none';
            printButton.style.display = 'block';
            editButton.style.display = 'block';
            downloadButton.style.display = 'block';
            shareButton.style.display = 'block';
            
        }, 500);
    });
    
    
    // // Event listener for edit button
    editButton?.addEventListener('click', handleEdit);

    
    
    
    
    // Print-specific CSS class to hide certain elements
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            .printing, .printing * {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    } )