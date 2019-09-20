import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: 'This email has already been registered' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }
}

export default new UserController();
