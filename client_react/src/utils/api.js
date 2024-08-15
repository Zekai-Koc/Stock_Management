export const getDevices = async () => {
   try {
      const response = await fetch("192.168.178.185:3000/api/v1/devices");
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices:", error);
      return { devicesByBrand: {} }; // Default fallback
   }
};

export const getStatusStats = async () => {
   try {
      const response = await fetch(
         "192.168.178.185:3000/api/v1/devices/statusstats"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching status stats:", error);
      return { devicesByStatus: [] }; // Default fallback
   }
};

export const getGrades = async () => {
   try {
      const response = await fetch(
         "192.168.178.185:3000/api/v1/stats/getGroupedDevicesByGradeWithCounts"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching grades:", error);
      return { devicesByGrade: [] }; // Default fallback
   }
};
