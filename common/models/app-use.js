'use strict';

module.exports = function(Appuse) {

    Appuse.observe('after save', function(ctx, next) {
        if (ctx.isNewInstance === true) {
            var instance = ctx.instance;
            instance.createAccessToken(1209600000, function(err, response) {
                if (err === null) {
                    console.log(response)
                    ctx.instance['userId'] = response.userId
                    ctx.instance["token"] = response.id;
                }
                next();
            });
        }
        else {
            next();
        }
    });

    Appuse.afterRemote('login', async(ctx, user, next) => {
        if (user) {
            console.log("hit")
            user.token = user.id;

            let userData = await Appuse.find({
                fields: { password: false, username: false, realm: false, '_id': 0 },
                include: {
                    relation: 'favorites'
                    // ,
                    // scope: {
                    //     fields: ['name', 'temp_f']
                    // },
                },
                where: {
                    id: user.userId
                }
            })
            console.log()
            user.userData = userData[0]
        }
    })

};
