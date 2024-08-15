import React from "react";
import { useParams } from "react-router-dom";

const UpdateDevice = () => {
   const { imei } = useParams(); // Get the IMEI from the URL

   return (
      <div>
         <h1>Update Device</h1>
         <p>Editing device with IMEI: {imei}</p>
         {/* Add the form or other logic to handle device update */}
      </div>
   );
};

export default UpdateDevice;
