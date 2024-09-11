var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    // Get the form, resume elements, and buttons
    var form = document.getElementById('resume-form');
    var resume = document.getElementById('finalresume');
    var generateResumeBtn = document.querySelector('.button');
    var printButton = document.querySelector('.print');
    var editButton = document.querySelector('.edit');
    var downloadButton = document.querySelector('.download');
    var usernameElement = document.getElementById('username');
    var shareButton = document.querySelector('.share');
    var resumeData = {
        name: '',
        username: '',
        email: '',
        phone: '',
        objective: '',
        education: '',
        workExperience: '',
        skills: [],
    };
    // Function to validate form data
    function validateFormData(data) {
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
        var _this = this;
        if (!validateFormData(resumeData))
            return;
        var skillsList = resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
        var resumeHTML = "\n            <h1>".concat(resumeData.name, "</h1>\n            <p>").concat(resumeData.email, " <b>|</b> ").concat(resumeData.phone, "</p>\n            <h2>Objective</h2>\n            <p>").concat(resumeData.objective, "</p>\n            <h2>Education</h2>\n            <p>").concat(resumeData.education, "</p>\n            <h2>Work Experience</h2>\n            <p>").concat(resumeData.workExperience, "</p>\n            <h2>Skills</h2>\n            <ul>").concat(skillsList, "</ul>\n        ");
        resume.innerHTML = resumeHTML;
        resume.style.display = 'block';
        form.style.display = 'none';
        printButton.style.display = 'block';
        editButton.style.display = 'block';
        downloadButton.innerHTML = '';
        shareButton.innerHTML = '';
        // Create a downloadable link
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeHTML);
        downloadLink.download = "".concat(resumeData.username, "_resume.html");
        downloadLink.textContent = 'Download Resume';
        downloadButton.appendChild(downloadLink);
        downloadButton.style.display = 'block';
        //
        var shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Share Link";
        shareLinkButton.style.display = "block";
        shareLinkButton.addEventListener("mouseover", function () {
            shareLinkButton.style.backgroundColor = "darkgray"; // Change background color on hover
        });
        shareLinkButton.addEventListener("mouseout", function () {
            shareLinkButton.style.backgroundColor = "gray"; // Reset background color when not hovering
        });
        shareLinkButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var shareableLink, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        shareableLink = "https://yourdomain.com/resumes/".concat(resumeData.name.replace(/\s+/g, "_"), "_resume.html");
                        return [4 /*yield*/, navigator.clipboard.writeText(shareableLink)];
                    case 1:
                        _a.sent();
                        alert("Shareable link copied to clipboard");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error copying shareable link", err_1);
                        alert("Failed to copy shareable link");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        shareButton.appendChild(shareLinkButton);
        shareButton.style.display = "block";
        shareLinkButton.style.color = "white";
        shareLinkButton.style.backgroundColor = "gray";
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
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get the form data
        var formData = new FormData(form);
        formData.forEach(function (value, key) {
            if (key === 'skills') {
                resumeData[key] = value.toString().split(',').filter(function (skill) { return skill.trim() !== ''; });
            }
            else {
                resumeData[key] = value.toString();
            }
        });
        var username = usernameElement.value;
        var uniquePath = "resume/".concat(username.replace(/\s+/g, '_'), "_resume.html");
        generateResume();
    });
    // Event listener for print button
    printButton === null || printButton === void 0 ? void 0 : printButton.addEventListener('click', function () {
        // Ensure resume is visible before printing
        resume.style.display = 'block';
        form.style.display = 'none';
        printButton.style.display = 'none';
        editButton.style.display = 'none';
        downloadButton.style.display = 'none';
        shareButton.style.display = 'none';
        // Delay to ensure content is rendered
        setTimeout(function () {
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
    editButton === null || editButton === void 0 ? void 0 : editButton.addEventListener('click', handleEdit);
    // Print-specific CSS class to hide certain elements
    var style = document.createElement('style');
    style.textContent = "\n        @media print {\n            .printing, .printing * {\n                display: none !important;\n            }\n        }\n    ";
    document.head.appendChild(style);
});
