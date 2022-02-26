import { Router } from 'express';
import { validateRequestMiddleware } from '../../middleware/error.middleware.js';
import UserController from './user.controller.js';
import { signInUserSchema, signUpUserSchema } from './user.model.js';

/**
 * User route class
 */
class UsersRoute {
    path = '/users';

    router = Router();

    userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        // No Auth router
        this.router.post(`${this.path}`, validateRequestMiddleware(signUpUserSchema), this.userController.signUpUser);
        this.router.post(
            `${this.path}/signIn`,
            validateRequestMiddleware(signInUserSchema),
            this.userController.signInUser,
        );

        // Auth Router
        // this.router.get(`${this.path}/me`, authenticateMiddleware.authorize, this.userController.getUsers);
        // this.router.post(
        //     `${this.path}/profile`,
        //     authenticateMiddleware.authorize,
        //     this.userController.updateProfilePicture,
        // );
    }
}

export default UsersRoute;
