const { Sequelize } = require("sequelize");
const Device = require("../models/Device");
const Status = require("../models/Status");

async function getStatusCounts() {
   console.log("Fetching status counts...");
   try {
      const statusCounts = await Device.findAll({
         attributes: [
            "statusId",
            [Sequelize.fn("COUNT", Sequelize.col("statusId")), "count"],
         ],
         include: [
            {
               model: Status,
               attributes: ["name"],
            },
         ],
         group: ["statusId", "Status.id"], // Group by both statusId and Status.id
      });

      // Format the result to return status name and count
      return statusCounts.map((sc) => ({
         status: sc.Status.name, // Status name
         count: sc.get("count"), // Count of devices with this status
      }));
   } catch (error) {
      console.error("Error fetching status counts:", error);
      throw error;
   }
}

module.exports = { getStatusCounts };
