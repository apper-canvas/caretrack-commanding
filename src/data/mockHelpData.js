export const helpData = {
  userGuides: [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "home",
      description: "Learn how to use the dashboard to get an overview of your practice",
      content: [
        {
          title: "Dashboard Overview",
          text: "The CareTrack dashboard gives you a quick overview of your practice's key metrics and activities. It's designed to show you what needs your attention at a glance."
        },
        {
          title: "Key Metrics",
          text: "The dashboard displays important metrics like today's appointments, pending lab results, and patients requiring follow-up. Click on any metric card to see more detailed information."
        },
        {
          title: "Recent Activity",
          text: "The Recent Activity section shows the latest updates across your practice, including new appointments, updated patient records, and completed tasks."
        },
        {
          title: "Customizing Your Dashboard",
          text: "You can customize your dashboard by clicking the 'Customize' button in the top right corner. This allows you to add, remove, or rearrange dashboard widgets based on what's most important to you."
        }
      ]
    },
    {
      id: "patients",
      title: "Patients Management",
      icon: "users",
      description: "How to manage patient records, demographics, and history",
      content: [
        {
          title: "Patient Records Overview",
          text: "The Patients section allows you to manage all your patient information. You can view patient demographics, medical history, appointments, and more in one place."
        },
        {
          title: "Adding a New Patient",
          text: "To add a new patient, click the 'Add Patient' button in the top right corner of the Patients page. Fill out the required information in the form and click 'Save' to create the patient record."
        },
        {
          title: "Searching for Patients",
          text: "Use the search bar at the top of the Patients page to quickly find patients by name, ID, or phone number. The search results will update as you type."
        },
        {
          title: "Viewing Patient Details",
          text: "Click on a patient's name to view their detailed profile. From there, you can access their medical history, appointments, insurance information, and more."
        },
        {
          title: "Editing Patient Information",
          text: "To update a patient's information, navigate to their profile and click the 'Edit' button. Make your changes in the form and click 'Save' to update the record."
        },
        {
          title: "Patient Context Banner",
          text: "When you select a patient, a context banner appears at the top of the screen showing key patient information. This helps you keep track of which patient you're working with as you navigate through different sections of the application."
        }
      ]
    },
    {
      id: "appointments",
      title: "Appointment Scheduling",
      icon: "calendar",
      description: "How to schedule, manage and track patient appointments",
      content: [
        {
          title: "Appointments Overview",
          text: "The Appointments section allows you to schedule and manage patient appointments. You can view appointments in calendar or list view, filter by provider or appointment type, and manage scheduling conflicts."
        },
        {
          title: "Creating a New Appointment",
          text: "To schedule a new appointment, click the 'New Appointment' button or click on an available time slot in the calendar. Select a patient, provider, appointment type, and time to create the appointment."
        },
        {
          title: "Calendar View",
          text: "The Calendar view shows appointments by day, week, or month. You can switch between views using the tabs at the top of the calendar. Click on any appointment to see details or make changes."
        },
        {
          title: "List View",
          text: "The List view shows appointments in a table format. You can sort by date, patient name, or provider. Use the filters to narrow down the list by date range, provider, or appointment type."
        },
        {
          title: "Managing Appointment Status",
          text: "Update appointment status by clicking on an appointment and selecting the appropriate status (Scheduled, Checked In, In Progress, Completed, No Show, Cancelled). This helps track patient flow through your practice."
        },
        {
          title: "Rescheduling Appointments",
          text: "To reschedule, open the appointment details and click the 'Reschedule' button. Select a new date and time, then save the changes. The system will automatically update the patient's record."
        }
      ]
    },
    {
      id: "medical-records",
      title: "Medical Records",
      icon: "file-text",
      description: "How to view and manage patient medical records and history",
      content: [
        {
          title: "Medical Records Overview",
          text: "The Medical Records section provides access to patients' complete medical history, including diagnoses, medications, lab results, and clinical notes. Records are organized chronologically for easy review."
        },
        {
          title: "Viewing Patient Timeline",
          text: "The timeline view shows all medical events for a patient in chronological order. Each entry is color-coded by type (visit, lab result, medication, etc.) for quick identification."
        },
        {
          title: "Adding Clinical Notes",
          text: "To add a new clinical note, navigate to a patient's medical record and click 'Add Note'. Select the note type, enter your observations, and save. Notes are immediately added to the patient's timeline."
        },
        {
          title: "Managing Medications",
          text: "Track current and past medications in the Medications tab. You can add new prescriptions, update dosages, and document medication changes or discontinuations."
        },
        {
          title: "Lab Results",
          text: "View and manage lab results in the Labs tab. Results can be uploaded manually or received electronically from integrated lab systems. Abnormal results are highlighted for quick review."
        },
        {
          title: "Documenting Diagnoses",
          text: "Record patient diagnoses with ICD codes, onset dates, and status. The system maintains a comprehensive list of all diagnoses for each patient, allowing for accurate tracking of chronic conditions."
        }
      ]
    },
    {
      id: "settings",
      title: "Settings & Preferences",
      icon: "settings",
      description: "How to configure application settings and user preferences",
      content: [
        {
          title: "Settings Overview",
          text: "The Settings section allows you to customize the application to meet your practice's specific needs. You can configure user accounts, practice information, appointment types, and more."
        },
        {
          title: "User Management",
          text: "Manage user accounts for staff members in the User Management section. You can add new users, update existing accounts, assign roles and permissions, and reset passwords."
        },
        {
          title: "Practice Information",
          text: "Update your practice details including name, address, phone number, and office hours. This information appears on patient-facing materials and helps configure system defaults."
        },
        {
          title: "Appointment Types",
          text: "Configure appointment types, durations, and colors in the Appointment Settings. This helps streamline scheduling and ensures appropriate time allocation for different visit types."
        },
        {
          title: "System Preferences",
          text: "Adjust system-wide settings like default view (calendar/list), date format, time zone, and notification preferences to customize the user experience."
        },
        {
          title: "Dark Mode",
          text: "Toggle between light and dark mode using the moon/sun icon in the top navigation bar. You can also set it to follow your system preferences in the display settings."
        }
      ]
    }
  ],
  
  faqs: [
    {
      id: "general",
      name: "General",
      questions: [
        {
          id: "faq-1",
          question: "What is CareTrack?",
          answer: "CareTrack is a comprehensive healthcare management system designed to help medical practices manage patient information, schedule appointments, document medical records, and streamline administrative tasks."
        },
        {
          id: "faq-2",
          question: "How do I reset my password?",
          answer: "Click on the 'Forgot Password' link on the login page. Enter your email address, and you'll receive instructions to reset your password. If you still have trouble, contact your system administrator."
        },
        {
          id: "faq-3",
          question: "Is my data secure?",
          answer: "Yes, CareTrack implements industry-standard security measures including data encryption, secure servers, regular security audits, and role-based access controls to protect sensitive patient information in compliance with HIPAA regulations."
        },
        {
          id: "faq-4",
          question: "Can I access CareTrack on my mobile device?",
          answer: "Yes, CareTrack is fully responsive and works on smartphones, tablets, and desktop computers. You can access it through any modern web browser without needing to install a separate app."
        }
      ]
    },
    {
      id: "patients",
      name: "Patients",
      questions: [
        {
          id: "faq-5",
          question: "How do I add a new patient?",
          answer: "Navigate to the Patients section, click the 'Add Patient' button, and fill out the required information in the form. Click 'Save' to create the new patient record."
        },
        {
          id: "faq-6",
          question: "Can I import patient data from another system?",
          answer: "Yes, CareTrack supports importing patient data in various formats. Go to Settings > Data Management > Import and follow the instructions to import patient records."
        },
        {
          id: "faq-7",
          question: "How do I merge duplicate patient records?",
          answer: "If you identify duplicate patient records, go to the Patients section, select both records using the checkboxes, and click 'Merge Selected'. Review the merged data before confirming."
        }
      ]
    },
    {
      id: "appointments",
      name: "Appointments",
      questions: [
        {
          id: "faq-8",
          question: "How do I schedule a recurring appointment?",
          answer: "When creating a new appointment, check the 'Recurring' box and set the frequency (weekly, monthly, etc.) and end date. The system will create all appointments in the series."
        },
        {
          id: "faq-9",
          question: "What happens when I cancel an appointment?",
          answer: "When you cancel an appointment, you'll be asked if you want to notify the patient. The appointment will be marked as 'Cancelled' and the time slot will become available for other appointments."
        },
        {
          id: "faq-10",
          question: "Can I set different appointment lengths for different visit types?",
          answer: "Yes, go to Settings > Appointment Types to configure different durations for each type of visit (e.g., 15 minutes for follow-ups, 30 minutes for new patients)."
        }
      ]
    },
    {
      id: "records",
      name: "Medical Records",
      questions: [
        {
          id: "faq-11",
          question: "How do I document a patient encounter?",
          answer: "From the patient's profile, go to Medical Records > Add Entry > Clinical Note. Select the visit type, complete the required fields, and save the note."
        },
        {
          id: "faq-12",
          question: "Can I upload documents to a patient's record?",
          answer: "Yes, from the patient's Medical Records tab, click 'Upload Document'. Select the file from your computer, add a description, choose a document type, and click 'Upload'."
        },
        {
          id: "faq-13",
          question: "How do I add a diagnosis with ICD code?",
          answer: "In the patient's Medical Records, go to the 'Diagnoses' tab and click 'Add Diagnosis'. Start typing the condition and select from the ICD code suggestions, then add onset date and status."
        }
      ]
    }
  ],
  
  troubleshooting: [
    {
      id: "login-issues",
      title: "Can't Log In",
      description: "Solutions for problems accessing your account",
      symptoms: [
        "Unable to log in despite entering correct credentials",
        "Receiving 'Invalid username or password' error",
        "Forgotten password"
      ],
      steps: [
        "Verify that you're using the correct email address and password",
        "Check if Caps Lock is turned on",
        "Clear your browser cache and cookies",
        "Try using a different browser",
        "Click the 'Forgot Password' link on the login page to reset your password",
        "If problems persist, contact your system administrator for assistance"
      ]
    },
    {
      id: "slow-performance",
      title: "System Running Slowly",
      description: "How to address performance issues",
      symptoms: [
        "Pages take a long time to load",
        "Actions like saving records are delayed",
        "Calendar view is sluggish"
      ],
      steps: [
        "Clear your browser cache and cookies",
        "Close unnecessary browser tabs and applications",
        "Check your internet connection speed",
        "Try using a different browser",
        "If using a mobile device, switch to a desktop computer if available",
        "If problems persist, contact support and provide details about when the slowness occurs"
      ]
    },
    {
      id: "missing-data",
      title: "Patient Data Not Displaying",
      description: "What to do when patient information is missing",
      symptoms: [
        "Patient records appear incomplete",
        "Recent appointments or notes are missing",
        "Medical history is not visible"
      ],
      steps: [
        "Refresh the page to ensure you're viewing the most recent data",
        "Verify that you have the correct patient selected",
        "Check if you have the appropriate permissions to view all patient data",
        "Look in other sections where the data might be stored",
        "If data was recently entered, wait a few minutes and try again",
        "If you're certain data is missing, contact your administrator to check for data synchronization issues"
      ]
    },
    {
      id: "printing-issues",
      title: "Cannot Print Documents",
      description: "Fixing problems with printing from CareTrack",
      symptoms: [
        "Print dialog doesn't appear",
        "Printed documents are incomplete or formatted incorrectly",
        "Receiving printer errors"
      ],
      steps: [
        "Ensure your printer is connected and has paper/ink",
        "Use the browser's print function (Ctrl+P or Cmd+P) instead of the application's print button",
        "Try printing as PDF first to verify the document generates correctly",
        "Adjust your printer settings to match the document size",
        "Try using a different browser",
        "If printing a specific form or report, check if there's a dedicated print button for that document"
      ]
    }
  ]
};