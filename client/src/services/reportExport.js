import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const reportExportService = {
  getExtraHoursData: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/report-info`);
      return response.data;
    } catch (error) {
      console.error("Error fetching extra hours data:", error);
      throw error;
    }
  },
};

export default reportExportService;
