change the ip addresses as follows for the following files:

client_react/src/pages/ViewDevices.js
         "http://192.168.178.185:7000/api/v1/selectoptions"
         "http://192.168.178.185:7000/api/v1/devices"

client_react/src/utils/api.js
      "192.168.178.185:3000/api/v1/devices"
      "192.168.178.185:3000/api/v1/devices/statusstats"
      "192.168.178.185:3000/api/v1/stats/getGroupedDevicesByGradeWithCounts"

server/database/database.js
   port: 5433,
