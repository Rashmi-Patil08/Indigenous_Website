import { getFirestore, collection, getDocs } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Fetch chart data from Firestore
export const fetchChartData = async () => {
  try {
    const chartDataCollection = collection(db, "chartData");
    const snapshot = await getDocs(chartDataCollection);
    const data = snapshot.docs.map((doc) => doc.data());
    console.log("Fetched chart data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
};
