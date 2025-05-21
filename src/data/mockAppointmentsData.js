import { addDays, subDays, addHours, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// Appointment types with corresponding colors
export const appointmentTypes = [
  { id: 1, name: "Check-up", color: "primary" },
  { id: 2, name: "Follow-up", color: "secondary" },
  { id: 3, name: "Consultation", color: "blue" },
  { id: 4, name: "Procedure", color: "amber" },
  { id: 5, name: "Emergency", color: "red" },
  { id: 6, name: "Lab Work", color: "purple" },
  { id: 7, name: "Imaging", color: "indigo" },
  { id: 8, name: "Therapy", color: "emerald" }
];

// Appointment statuses
export const appointmentStatuses = [
  { id: 1, name: "Scheduled", color: "badge-blue" },
  { id: 2, name: "Confirmed", color: "badge-green" },
  { id: 3, name: "Checked In", color: "badge-purple" },
  { id: 4, name: "In Progress", color: "badge-yellow" },
  { id: 5, name: "Completed", color: "badge-green" },
  { id: 6, name: "Cancelled", color: "badge-red" },
  { id: 7, name: "No-show", color: "badge-red" },
  { id: 8, name: "Rescheduled", color: "badge-purple" }
];

// Providers
export const providers = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "General Medicine", color: "#4f46e5" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Cardiology", color: "#0891b2" },
  { id: 3, name: "Dr. Emily Williams", specialty: "Pediatrics", color: "#16a34a" },
  { id: 4, name: "Dr. Robert Garcia", specialty: "Neurology", color: "#9333ea" },
  { id: 5, name: "Dr. Lisa Thompson", specialty: "Dermatology", color: "#ea580c" },
  { id: 6, name: "Dr. James Wilson", specialty: "Orthopedics", color: "#be123c" },
];

// Generate mock appointments
const generateMockAppointments = () => {
  const today = new Date();
  const daysInCurrentMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today)
  });
  
  // Sample patients
  const patients = [
    { id: 101, firstName: "Emma", lastName: "Thompson", age: 42, gender: "Female" },
    { id: 102, firstName: "Michael", lastName: "Chen", age: 35, gender: "Male" },
    { id: 103, firstName: "Sophia", lastName: "Martinez", age: 28, gender: "Female" },
    { id: 104, firstName: "James", lastName: "Wilson", age: 56, gender: "Male" },
    { id: 105, firstName: "Olivia", lastName: "Johnson", age: 31, gender: "Female" },
    { id: 106, firstName: "William", lastName: "Davis", age: 47, gender: "Male" },
    { id: 107, firstName: "Ava", lastName: "Rodriguez", age: 23, gender: "Female" },
    { id: 108, firstName: "John", lastName: "Brown", age: 62, gender: "Male" },
    { id: 109, firstName: "Isabella", lastName: "Miller", age: 39, gender: "Female" },
    { id: 110, firstName: "David", lastName: "Garcia", age: 51, gender: "Male" },
  ];
  
  // Time slots
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];
  
  // Visit reasons
  const visitReasons = [
    "Annual physical examination",
    "Blood pressure monitoring",
    "Medication review",
    "Flu symptoms",
    "Back pain",
    "Headache evaluation",
    "Skin condition assessment",
    "Diabetes management",
    "Heart health check",
    "Vaccination",
    "Post-surgical follow-up",
    "Lab result discussion",
    "Respiratory issues",
    "Joint pain evaluation"
  ];
  
  const randomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
  
  let appointments = [];
  let appointmentId = 1;
  
  // Create appointments for each day in the current month (fewer on weekends)
  daysInCurrentMonth.forEach(day => {
    // Skip some days to avoid having appointments every single day
    if (Math.random() > 0.7) return;
    
    // Fewer appointments on weekends
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const appointmentCount = isWeekend ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 7) + 3;
    
    // Available time slots for this day
    const availableTimeSlots = [...timeSlots];
    
    for (let i = 0; i < appointmentCount; i++) {
      if (availableTimeSlots.length === 0) break;
      
      // Pick a random time slot and remove it from available slots
      const timeIndex = Math.floor(Math.random() * availableTimeSlots.length);
      const time = availableTimeSlots[timeIndex];
      availableTimeSlots.splice(timeIndex, 1);
      
      const patient = randomFromArray(patients);
      const type = randomFromArray(appointmentTypes);
      const provider = randomFromArray(providers);
      const status = randomFromArray(appointmentStatuses);
      const reason = randomFromArray(visitReasons);
      
      // Duration between 15 and 60 minutes, in 15-minute increments
      const durationMinutes = (Math.floor(Math.random() * 4) + 1) * 15;
      
      // Create an appointment date with the time
      const [hours, minutes] = time.split(':').map(Number);
      const appointmentDate = new Date(day);
      appointmentDate.setHours(hours, minutes, 0, 0);
      
      // Calculate end time
      const endDate = new Date(appointmentDate);
      endDate.setMinutes(endDate.getMinutes() + durationMinutes);
      
      // Generate notes based on appointment type and status
      let notes = '';
      if (status.name === "Checked In") {
        notes = `Patient arrived ${Math.floor(Math.random() * 10) + 1} minutes ${Math.random() > 0.5 ? 'early' : 'late'}.`;
      } else if (status.name === "Completed") {
        notes = `Appointment completed. ${type.name === "Check-up" ? "Overall health is good." : "Follow-up needed in 3 months."}`;
      } else if (status.name === "No-show") {
        notes = "Patient did not show up. Attempted to contact.";
      } else if (status.name === "Cancelled") {
        notes = `Cancelled by patient on ${format(subDays(day, Math.floor(Math.random() * 5) + 1), 'MMM dd')}.`;
      } else if (status.name === "Rescheduled") {
        notes = `Rescheduled from original date of ${format(subDays(day, Math.floor(Math.random() * 10) + 3), 'MMM dd')}.`;
      }
      
      appointments.push({
        id: appointmentId++,
        patientId: patient.id,
        patientName: `${patient.firstName} ${patient.lastName}`,
        patientAge: patient.age,
        patientGender: patient.gender,
        date: appointmentDate,
        endDate: endDate,
        formattedDate: format(appointmentDate, 'yyyy-MM-dd'),
        formattedTime: format(appointmentDate, 'HH:mm'),
        formattedEndTime: format(endDate, 'HH:mm'),
        duration: durationMinutes,
        type: type,
        typeId: type.id,
        reason: reason,
        providerId: provider.id,
        provider: provider.name,
        providerSpecialty: provider.specialty,
        providerColor: provider.color,
        status: status.name,
        statusId: status.id,
        statusColor: status.color,
        notes: notes,
        isRecurring: Math.random() > 0.85,
        recurringPattern: Math.random() > 0.85 ? 'Weekly' : Math.random() > 0.5 ? 'Monthly' : 'Bi-weekly',
        waitTime: status.name === "Checked In" ? Math.floor(Math.random() * 30) : null,
        created: subDays(day, Math.floor(Math.random() * 30) + 5),
        lastUpdated: Math.random() > 0.7 ? subDays(day, Math.floor(Math.random() * 4) + 1) : null
      });
    }
  });
  
  // Add some appointments for today specifically
  const todayString = format(today, 'yyyy-MM-dd');
  const todayAppointments = appointments.filter(apt => apt.formattedDate === todayString);
  
  // If less than 5 appointments today, add a few more
  if (todayAppointments.length < 5) {
    const additionalCount = 5 - todayAppointments.length;
    const availableTimeSlots = [...timeSlots];
    
    // Remove already used time slots
    todayAppointments.forEach(apt => {
      const index = availableTimeSlots.indexOf(apt.formattedTime);
      if (index !== -1) {
        availableTimeSlots.splice(index, 1);
      }
    });
    
    // Add additional appointments
    for (let i = 0; i < additionalCount && availableTimeSlots.length > 0; i++) {
      const existingAppointment = randomFromArray(appointments);
      const timeIndex = Math.floor(Math.random() * availableTimeSlots.length);
      const time = availableTimeSlots[timeIndex];
      availableTimeSlots.splice(timeIndex, 1);
      
      const [hours, minutes] = time.split(':').map(Number);
      const appointmentDate = new Date(today);
      appointmentDate.setHours(hours, minutes, 0, 0);
      
      const newAppointment = {...existingAppointment, id: appointmentId++, date: appointmentDate, formattedDate: todayString, formattedTime: time};
      appointments.push(newAppointment);
    }
  }
  
  return appointments.sort((a, b) => a.date - b.date);
};

export const mockAppointments = generateMockAppointments();