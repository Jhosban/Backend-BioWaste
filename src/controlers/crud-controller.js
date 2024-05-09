import User from '../models/user-model.js';

export const showUsers = async (require, response) => {
    try {
       const users = await User.find({}).select('username apartment typeUser plan')

        response.status(200).json(users)
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}


