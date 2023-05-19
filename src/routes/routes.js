import {Router} from 'express'

const router = Router()
let BASE_URL = "https://noderailway-production-14d7.up.railway.app/" || "localhost";
router.get(`${BASE_URL}/`,(req,res) =>res.render('index', {title : 'Team Fight'}))
router.get(`${BASE_URL}/league`,(req,res) =>res.render('league', {title : 'League'}))
router.get(`${BASE_URL}/login`,(req,res) =>res.render('login', {title : 'Login'}))
router.get(`${BASE_URL}/valorant`,(req,res) =>res.render('valorant', {title : 'Valorant'}))
router.get(`${BASE_URL}/siege`,(req,res) =>res.render('siege', {title : 'Siege'}))
router.get(`${BASE_URL}/indexLogged`,(req,res) =>res.render('indexLogged', {title : 'Team Fight'}))
router.get(`${BASE_URL}/leagueLogged`,(req,res) =>res.render('leagueLogged', {title : 'Team Fight'}))
router.get(`${BASE_URL}/valorantLogged`,(req,res) =>res.render('valorantLogged', {title : 'Team Fight'}))
router.get(`${BASE_URL}/siegeLogged`,(req,res) =>res.render('siegeLogged', {title : 'Team Fight'}))
router.get(`${BASE_URL}/leagueGame`,(req,res) =>res.render('leagueGame', {title : 'Team Fight'}))
router.get(`${BASE_URL}/usuario`,(req,res) =>res.render('usuario', {title : 'Team Fight'}))
export default router