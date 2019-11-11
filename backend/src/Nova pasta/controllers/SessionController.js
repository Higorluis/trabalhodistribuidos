// index listagem se sessao, show lista uma sessao, store criar uma sessao, uptade, destroy
const User = require('../models/User')

module.exports = {
    async store(req, res){
        const { email } = req.body;
    
        let user = await User.findOne({ email })

        if(!user){
            user = await User.create({ email })
        }
       
        return res.json(user);
    }
};