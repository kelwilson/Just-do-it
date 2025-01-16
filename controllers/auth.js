const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/tasks')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/tasks')
      })
    })(req, res, next)
  }
  
  // Old code always gives errors and cause connection issues
  // exports.logout = (req, res) => {
  //   req.logout(() => {
  //     console.log('User has logged out.')
  //   })
  //   req.session.destroy((err) => {
  //     if (err) console.log('Error : Failed to destroy the session during logout.', err)
  //     req.user = null
  //     res.redirect('/')
  //   })
  // }

    exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
      req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err)
        req.user = null
        res.redirect('/')
      })
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/tasks')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  // Old deprecated code 
  // exports.postSignup = (req, res, next) => {
  //   const validationErrors = []
  //   if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  //   if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
  //   if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
  //   if (validationErrors.length) {
  //     req.flash('errors', validationErrors)
  //     return res.redirect('../signup')
  //   }
  //   req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
  //   const user = new User({
  //     userName: req.body.userName,
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  
  //   User.findOne({$or: [
  //     {email: req.body.email},
  //     {userName: req.body.userName}
  //   ]}, (err, existingUser) => {
  //     if (err) { return next(err) }
  //     if (existingUser) {
  //       req.flash('errors', { msg: 'Account with that email address or username already exists.' })
  //       return res.redirect('../signup')
  //     }
  //     user.save((err) => {
  //       if (err) { return next(err) }
  //       req.logIn(user, (err) => {
  //         if (err) {
  //           return next(err)
  //         }
  //         res.redirect('/tasks')
  //       })
  //     })
  //   })
  // }


  // New code
  exports.postSignup = async (req, res, next) => {
    const validationErrors = [];
  
    // Validate user input
    if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: 'Please enter a valid email address.' });
    }
    if (!validator.isLength(req.body.password, { min: 8 })) {
      validationErrors.push({ msg: 'Password must be at least 8 characters long.' });
    }
    if (req.body.password !== req.body.confirmPassword) {
      validationErrors.push({ msg: 'Passwords do not match.' });
    }
  
    // If there are validation errors, redirect back with error messages
    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      return res.redirect('../signup');
    }
  
    // Normalize email
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  
    // Create a new user object
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
  
    try {
      // Check if a user with the same email or username already exists
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }],
      });
  
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' });
        return res.redirect('../signup');
      }
  
      // Save the new user
      await user.save();
  
      // Log in the user after successful signup
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/tasks');
      });
    } catch (err) {
      next(err); // Pass errors to the error-handling middleware
    }
  };