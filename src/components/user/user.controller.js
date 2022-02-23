import HttpException from '../../utils/error.utils.js';
import { createNewUser, findUserById } from './user.DAL.js';
import { USER_ERROR_CODES } from './user.errors.js';
import { sendMail } from './user.helper.js';
import { User } from './user.model.js';

// const uploadPath = path.resolve('media/');

class UsersController {
    /**
     * Sign up new user and send mail to them
     * @param {Request} req => Express Request
     * @param {Response} res => Express Repponse
     * @param {NextFunction} next => Express next function
     */
    async signUpUser(req, res, next) {
        try {
            // Getting data from body and creating new user
            const { firstName, lastName, emailId, planType, mobileNo, password } = req.body;
            const userObject = {
                firstName,
                lastName,
                emailId,
                planType,
                mobileNo,
                password,
            };
            const user = await createNewUser(userObject);

            // sending mail to New user email
            sendMail(user.emailId, req.log);

            return res.status(200).json({ _id: user._id });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * Sign in user with credentials
     * @param {Request} req => Express Request
     * @param {Response} res => Express Repponse
     * @param {NextFunction} next => Express next function
     */
    async signInUser(req, res, next) {
        try {
            // Validating body data
            const { email, password } = req.body;
            if (!email || !password) {
                throw new HttpException(400, USER_ERROR_CODES.SIGN_IN_BAD_REQUEST, 'SIGN_IN_BAD_REQUEST', null);
            }

            // Finding user and validating data
            const userData = await User.findByCredentials(email, password);
            if (!userData) {
                throw new HttpException(404, USER_ERROR_CODES.SIGN_IN_FAIL, 'SIGN_IN_FAIL', null);
            }

            const userToken = await userData.getAuthToken();
            return res.status(200).json({
                accessToken: userToken,
                userId: userData._id,
                userName: userData.firstName,
                email: userData.emailId,
            });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * Get user profile of logged in user
     * @param {Request} req => Express Request
     * @param {Response} res => Express Repponse
     * @param {NextFunction} next => Express next function
     */
    async getUsers(req, res, next) {
        try {
            // Get user data of logIn user
            const userId = req.user._id;
            const user = await findUserById(userId);

            return res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    // eslint-disable-next-line consistent-return
    // async updateProfilePicture(req, res, next) {
    //     try {
    //         // Valudate request
    //         const userId = req.user._id;
    //         if (!userId) {
    //             throw new HttpException(
    //                 500,
    //                 USER_ERROR_CODES.BAD_REQUEST_FOR_UPLOAD_PROFILE_PHOTO,
    //                 'BAD_REQUEST_FOR_UPLOAD_PROFILE_PHOTO',
    //                 null,
    //             );
    //         }

    //         // Upload file to static storage
    //         let uploadedUrl;
    //         uploadFile({ uploadPath, fieldName: 'profilePic' })(req, res, err => {
    //             if (err) {
    //                 throw new HttpException(
    //                     500,
    //                     USER_ERROR_CODES.UPLOAD_PROFILE_IMAGE_FAILED,
    //                     'UPLOAD_PROFILE_IMAGE_FAILED',
    //                     err,
    //                 );
    //             }
    //             uploadedUrl = `${Config.BASE_URL}/${uploadPath}${encodeURI(req.file.originalname)}`;
    //             // update user data in db
    //             const updateObj = {
    //                 profilePicture: uploadedUrl,
    //             };
    //             userFindByIdAndUpdate(userId, updateObj);

    //             // return HTTP reponse
    //             return res.status(200).json({
    //                 url: uploadedUrl,
    //             });
    //         });
    //     } catch (err) {
    //         return next(err);
    //     }
    // }
}

export default UsersController;
