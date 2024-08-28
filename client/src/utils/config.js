function getApiUrl() {
   const ipRegex = /192\.168\.178\./;
   const apiUrl = ipRegex.test(window.location.hostname)
      ? "http://192.168.178.184:7000/api/v1"
      : "http://localhost:7000/api/v1";

   return apiUrl;
}

const config = {
   apiUrl: getApiUrl(),
};

export default config;
