export default class HomeController {
  status(_req, res) {
    return res.status(200).json({ status: 'ok', projeto: 'FIPP21' });
  }
}
