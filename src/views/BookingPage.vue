<template>
    <div class="booking-page">
      <h1>Appointment Booking</h1>
      <CalendarView
        :appointments="appointments"
        :onEventAdd="addAppointment"
      />
    </div>
  </template>
  
  <script>
  import CalendarView from '@/components/CalendarView.vue';
  
  export default {
    components: { CalendarView },
    data() {
      return {
        appointments: [
          {
            title: 'Meeting',
            start: '2024-11-16T10:00:00',
            end: '2024-11-16T11:00:00',
          },
        ],
      };
    },
    methods: {
      addAppointment(newEvent) {
        const hasConflict = this.appointments.some((event) => {
          return (
            (newEvent.start >= event.start && newEvent.start < event.end) ||
            (newEvent.end > event.start && newEvent.end <= event.end)
          );
        });
  
        if (hasConflict) {
          alert('Conflict detected! Please choose another slot.');
          return;
        }
  
        this.appointments.push(newEvent);
      },
    },
  };
  </script>
  
  <style scoped>
  .booking-page {
    max-width: 900px;
    margin: 20px auto;
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  