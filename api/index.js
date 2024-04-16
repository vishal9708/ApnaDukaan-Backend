const express = require('express')
const authRoutes = require('../src/authentication/auth.router')
const adminRoutes = require('../src/admin/admin.router')
const router = express.Router()

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes)

module.exports = router;