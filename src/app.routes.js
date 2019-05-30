const express = require('express')
const router = express.Router()
const Auths = require('./auth/Auths')
const upload = require('./connections/multer')

router.get('/', (req, res) => res.send(`Hi! I'm uFaculties`))

const authCtrl = require('./controllers/AuthController')
router.post('/signin', authCtrl.signIn)
router.post('/admin/register', authCtrl.registerAsAdmin)

const userCtrl = require('./controllers/UserController')
router.post('/users',userCtrl.findAll)
router.get('/users/types', userCtrl.findDistinctTypes)
router.get('/users/degrees', userCtrl.findDistinctDegrees)
router.get('/users/:userId/select', userCtrl.selectFields)
router.get('/users/:userId', userCtrl.findById)
router.post('/users/new', Auths.isAuthenticated(), Auths.hasRole('admin'), userCtrl.save)
router.post('/users/bulk', Auths.isAuthenticated(), Auths.hasRole('admin'), upload.single('importer'), userCtrl.bulkSave)
router.post('/users/:userId/research', Auths.isAuthenticated(), Auths.hasPermissionOnUserProfile(), userCtrl.updateResearchFields)
router.put('/users/:userId', Auths.isAuthenticated(), Auths.hasPermissionOnUserProfile(), userCtrl.updateById)
router.delete('/users/:userId', Auths.isAuthenticated(), Auths.hasRole('admin'), userCtrl.removeById)


const departmentCtrl = require('./controllers/DepartmentController')
router.get('/departments',departmentCtrl.findAll)
router.get('/departments/:departmentId', departmentCtrl.findById)
router.get('/departments/:departmentId/officers', departmentCtrl.findUsersByDepartment)
router.post('/departments', Auths.isAuthenticated(), Auths.hasRole('admin'), departmentCtrl.save)
router.put('/departments/:departmentId', Auths.isAuthenticated(), Auths.hasRole('admin'), departmentCtrl.updateById)
router.delete('/departments/:departmentId', Auths.isAuthenticated(), Auths.hasRole('admin'), departmentCtrl.removeById)

const fieldCtrl = require('./controllers/ResearchFieldController')
router.get('/fields',fieldCtrl.findAll)
router.get('/fields/roots',fieldCtrl.findRoots)
router.get('/fields/:fieldId/children', fieldCtrl.findChildrenByParent)
router.get('/fields/:fieldId/officers', fieldCtrl.findUsersByField)
router.get('/fields/:fieldId', fieldCtrl.findById)
router.post('/fields', Auths.isAuthenticated(), Auths.hasRole('admin'), fieldCtrl.save)
router.put('/fields/:fieldId', Auths.isAuthenticated(), Auths.hasRole('admin'), fieldCtrl.updateById)
router.delete('/fields/:fieldId', Auths.isAuthenticated(), Auths.hasRole('admin'), fieldCtrl.removeById)



router.get('*', (req, res) => res.redirect('/'))

module.exports = router
