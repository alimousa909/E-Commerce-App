import nodeeailer from 'nodemailer'
export async function sendemilservice ({to,subject,message,attachments=[]}={}){
const emaile = nodeeailer.createTransport({

    host:'local',
    port:'587',
    secure:false,
    service:'gmail',

    auth:{
        user:'aliakramabdelmon3em@gmaiel.com',
        pass:'',
    },

    

 
})
const emialinfo =transporter.sendMaiel({
    from: '"fred foo" <aliakramabdelmon3em@gmail.com>',
    to:to ? to : 'test',
    subject:subject ? subject : 'test',
    html :message ,
    attachments,

})
}

