export const deviceStats = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicestats"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching device stats:", error);
      return { deviceStats: [] }; // Default fallback
   }
};

export const devicesByBrand = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicesbybrand"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices by brand:", error);
      return { devicesByStatus: [] }; // Default fallback
   }
};

export const devicesByModel = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicesbymodel"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices by model:", error);
      return { devicesByGrade: [] }; // Default fallback
   }
};

export const devicesByStatus = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicesbystatus"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices by status:", error);
      return { devicesByGrade: [] }; // Default fallback
   }
};

export const devicesByRAM = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicesbyram"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices by RAM:", error);
      return { devicesByGrade: [] }; // Default fallback
   }
};

export const devicesByStorage = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicesbystorage"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices by Storage:", error);
      return { devicesByGrade: [] }; // Default fallback
   }
};

export const devicesByColor = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicesbycolor"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices by Color:", error);
      return { devicesByGrade: [] }; // Default fallback
   }
};

export const devicesByGrade = async () => {
   try {
      const response = await fetch(
         "http://192.168.178.185:7000/api/v1/stats/devicesbygrade"
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.json();
   } catch (error) {
      console.error("Error fetching devices by Grade:", error);
      return { devicesByGrade: [] }; // Default fallback
   }
};
