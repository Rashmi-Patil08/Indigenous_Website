<template>
    <div>
      <!-- <h1>Geo Location</h1> -->
      <div id="map"></div>
      <div class="search-container">
        <input
          v-model="locationQuery"
          placeholder="Enter a location"
          class="search-input"
        />
        <button @click="searchLocation" class="search-button">
          Search
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import mapboxgl from "mapbox-gl";
  
  export default {
    data() {
      return {
        map: null,
        marker: null,
        locationQuery: "", // For search input
        mapboxAccessToken: "pk.eyJ1IjoicmFzaHUwOCIsImEiOiJjbTNsNzBzenowbG1rMm1vazR5cHI2MTlpIn0.5FYAbsEg-bKzVI-Shx6WjQ", // Replace with your Mapbox token
      };
    },
    mounted() {
      mapboxgl.accessToken = this.mapboxAccessToken;
  
      // Initialize Map
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [144.9631, -37.8136], // Default center: Melbourne
        zoom: 12,
      });
    },
    methods: {
      async searchLocation() {
        if (!this.locationQuery) {
          alert("Please enter a location");
          return;
        }
  
        // Make the API request to the Mapbox Geocoding API
        const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          this.locationQuery
        )}.json?access_token=${this.mapboxAccessToken}`;
  
        try {
          const response = await fetch(geocodeUrl);
          const data = await response.json();
  
          if (data.features && data.features.length > 0) {
            const [longitude, latitude] = data.features[0].center;
  
            // Center the map and adjust zoom
            this.map.flyTo({ center: [longitude, latitude], zoom: 14 });
  
            // Add or update marker
            if (this.marker) {
              this.marker.setLngLat([longitude, latitude]);
            } else {
              this.marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(this.map);
            }
  
            // Removed the max bounds restriction to allow the map to pan freely
            // this.map.setMaxBounds(this.map.getBounds()); // This line is removed
          } else {
            alert("No results found for the location");
          }
        } catch (error) {
          console.error("Error fetching geocoding data:", error);
          alert("Failed to fetch location data. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    width: 80%;
    height: 500px;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1em;
    font-family: Arial, sans-serif;
    font-size: 24px;
  }
  
  .search-container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
  
  .search-input {
    width: 300px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .search-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: darkblue;
  }
  </style>
  