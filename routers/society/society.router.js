const { Router } = require("express");
const { test, society_signup, getRegisteredSocieties, society_login, getProfile, generateOtp, checkOtp, resetPassword } = require("../../controllers/society/society.controller");
const { createApplication, updateApplication, getApplicationBySocietyId } = require("../../controllers/society/application/application.society.controller");
const { requireSocietyAuth } = require("../../middlewares/societies.middleware");
const { getApplicationById } = require("../../controllers/application/application.controller");
const uploadSupportingDocuments = require("../../middlewares/upload_middlewares/uploadSupporting.middleware");
const updateSupportingDocs = require("../../middlewares/upload_middlewares/updateSupporting.middleware");
const uploadLogoController = require("../../middlewares/upload_middlewares/uploadlogo.middleware")
const societyRouter = Router();

societyRouter.get("/test", test)
societyRouter.get("/registered-societies", getRegisteredSocieties);
societyRouter.get("/get-application/:id", requireSocietyAuth, getApplicationById)
societyRouter.get("/get-profile", requireSocietyAuth, getProfile)
societyRouter.get("/get-your-applications", getApplicationBySocietyId)
societyRouter.get("/generate-otp", requireSocietyAuth, generateOtp);

societyRouter.post("/create-application", requireSocietyAuth, uploadSupportingDocuments, createApplication);
societyRouter.post("/update-application/:id", updateSupportingDocs, updateApplication)
societyRouter.post("/signup", uploadLogoController.uploadLogo, society_signup);
societyRouter.post("/login", society_login)
societyRouter.post("/check-otp", requireSocietyAuth, checkOtp);
societyRouter.post("/reset-password", requireSocietyAuth, resetPassword)

module.exports = societyRouter;