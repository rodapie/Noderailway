import {Router} from 'express'

const router = Router()

router.get('/',(req,res) =>res.render('index', {title : 'Team Fight'}))
router.get('/league',(req,res) =>res.render('league', {title : 'League'}))
router.get('/login',(req,res) =>res.render('login', {title : 'Login'}))
router.get('/valorant',(req,res) =>res.render('valorant', {title : 'Valorant'}))
router.get('/siege',(req,res) =>res.render('siege', {title : 'Siege'}))
router.get('/indexLogged',(req,res) =>res.render('indexLogged', {title : 'Team Fight'}))
router.get('/leagueLogged',(req,res) =>res.render('leagueLogged', {title : 'Team Fight'}))
router.get('/valorantLogged',(req,res) =>res.render('valorantLogged', {title : 'Team Fight'}))
router.get('/siegeLogged',(req,res) =>res.render('siegeLogged', {title : 'Team Fight'}))
router.get('/leagueGame',(req,res) =>res.render('leagueGame', {title : 'Team Fight'}))
router.get('/leagueGameLogged',(req,res) =>res.render('leagueGameLogged', {title : 'Team Fight'}))
router.get('/usuario',(req,res) =>res.render('usuario', {title : 'Team Fight'}))
export default router