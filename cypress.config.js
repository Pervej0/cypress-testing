const { defineConfig } = require("cypress");
const fetchOTP = require("./cypress/plugins/fetchOtp");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // log("Registering custom tasks...");
      on("task", {
        fetchOTP: async () => {
          try {
            const otp = await fetchOTP();
            console.log("OTP Retrieved:", otp); // Debugging
            return otp || null;
          } catch (error) {
            console.error("Task fetchOTP Error:", error);
            return null;
          }
        },
      });

      return config;
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
