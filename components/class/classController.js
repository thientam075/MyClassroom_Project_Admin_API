const nodemailer = require('nodemailer');

const service = require('./classService');
module.exports.listAllClass = async function(req, res, next){
    const result = await service.listAllClass();
    res.json({
        data: result,
    })
}
module.exports.listClass = async (req, res, next) => {
    if(req.user){
        const listClass = await service.listClass(req.user);
        res.json(listClass.Classes);
    }
    else 
        res.json();
}

module.exports.getClass = async (req, res, next) => {
    const result = await service.getClass(parseInt(req.params.id));
    if(result){
        res.json(result);
    }
    else{
        res.json({"id": -1});
    }
}

module.exports.getRoleClass = async (req, res, next) => {
    if(req.user)
    {
        const role = await service.getRoleClass(parseInt(req.params.id), req.user.id);
        if(role)
            res.json(role);
        else
            res.json({"role": -1});
    }
    else 
        res.json({"role": -1});
}

module.exports.addClass = async (req, res, next) => {
    if(req.user && req.body.name !== "" && req.body.name !== null && req.body.name !== undefined)
    {
        await service.addClass(req.user, req.body.name, req.body.subject);
        res.json('Create successful');
    }
    else
        res.json('Create unsuccessful');
}

module.exports.deleteOrLeaveClass = async (req, res, next) => {
    await service.removeClass(req.user.id, parseInt(req.params.id));
    res.json('Delete or leave successful');
}

module.exports.sendEmailInvite = async (req, res, next) => {
    const cls = await service.getClass(parseInt(req.params.id));

    if(cls && req.body.email && req.query.role && req.body.url)
    {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: req.body.email, 
            subject: req.query.role === "Teacher" ? "Lời mời cùng dạy lớp: " + cls.name : "Lời mời tham gia lớp: " + cls.name,
            text: req.query.role === "Teacher" ?  "Bạn có một lời mời cùng dạy lớp " + cls.name + "\nLink tham gia: " + req.body.url + cls.inviteCodeTeacher
                    : "Bạn có một lời mời tham gia lớp " + cls.name + "\nLink tham gia: " + req.body.url + cls.inviteCodeStudent,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.json({"result": 0});
            } else {
                console.log('Email sent: ' + info.response);
                res.json({"result": 1});
            }
        });
    }
    else{
        res.json({"result": 0});
    }
}

