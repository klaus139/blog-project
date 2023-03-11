// import express from 'express'
// import { alowedTo, requireSignIn } from '../middleware/authorization';
// import { requireSignIn } from '../middleware/authorization';

// const router = express.Router()

// router.put(
//     "/",
//     requireSignIn,
//     alowedTo("admin", "user"),
//     updateUserValidator,
//     updateUser
//   );
  
//   // @desc Change Logged User Password
//   // @access Protect
//   router.put(
//     "/change-password",
//     requireSignIn,
//     alowedTo("user", "admin"),
//     changeUserPasswordValidator,
//     changeUserPassword
//   );
  
//   // @desc Permanantly Delete An Account
//   // @access Protect
//   router.delete(
//     "/delete-account",
//     requireSignIn,
//     alowedTo("user", "admin"),
//     deleteAccount
//   );
  
//   // @desc Delete a User
//   // @access Private/Admin
//   router.delete(
//     "/:id",
//     requireSignIn,
//     alowedTo("admin"),
//     deleteUserValidator,
//     deleteUser
//   );
  
//   // @desc Get All Users
//   router.get("/", allUsers);
  
//   // @desc Get a Single User
//   router.get("/:id", getUserValidator, getUser);
  
//   // @desc Uploaded profile image
//   // @access Protect
//   router.post(
//     "/profile-photo-upload",
//     requireSignIn,
//     alowedTo("user", "admin"),
//     uploadProfileImage,
//     profilePhotoUpload
//   );