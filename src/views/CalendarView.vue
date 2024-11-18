<template>
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  
  export default defineComponent({
    components: { FullCalendar },
    props: {
      appointments: {
        type: Array,
        required: true,
      },
      onEventAdd: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: 'timeGridWeek',
          editable: true,
          selectable: true,
          events: [],
          select: this.handleEventSelect,
          eventClick: this.handleEventClick,
        },
      };
    },
    mounted() {
      // Initialize events after component is mounted
      this.calendarOptions.events = this.appointments;
    },
    methods: {
      handleEventSelect(selectionInfo) {
        const title = prompt('Enter a title for your appointment:');
        if (title) {
          const newEvent = {
            title,
            start: selectionInfo.startStr,
            end: selectionInfo.endStr,
            allDay: selectionInfo.allDay,
          };
          this.onEventAdd(newEvent); // Pass new event to parent
        }
      },
      handleEventClick(clickInfo) {
        alert(`Event: ${clickInfo.event.title}`);
      },
    },
    watch: {
      appointments: {
        handler(newAppointments) {
          // Update events when appointments prop changes
          this.calendarOptions.events = newAppointments;
        },
        immediate: true,
        deep: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .calendar-container {
    max-width: 900px;
    margin: 0 auto;
  }
  </style>
  