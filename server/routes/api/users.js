const express = require("express");
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');

const passportAuth = str => {return passport.authenticate(str, {session:false})};

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const UsersController = require("../../controllers/users");

router.route("/signUp")
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route("/signIn")
    .post(validateBody(schemas.authSchema), passportAuth('local'), UsersController.signIn);

router.route('/signout')
  .get(UsersController.signOut);

router.route("/secret")
    .get(passportAuth('jwt'), UsersController.secret);

router.route('/status')
    .get(passport.authenticate('jwt', { session: false }), UsersController.checkAuth);

router.route("/oauth/facebook")
    .post(passportAuth('facebookToken'), UsersController.facebookOauth);

router.route('/oauth/link/facebook')
    .post(passportAuth('jwt'), passport.authorize('facebookToken', { session: false }), UsersController.linkFacebook)

router.route('/oauth/unlink/facebook')
    .post(passportAuth('jwt'), UsersController.unlinkFacebook);

router.route('/dashboard')
    .get(passportAuth('jwt'), UsersController.dashboard);

module.exports = router;