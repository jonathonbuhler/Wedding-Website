import nodemailer from "nodemailer"
import 'dotenv/config'

function splitName(name) {
    const splitName = name.split(" ");
    const first_name = splitName[0];
    let last_name = '';
    if (splitName.length >= 2) {
        last_name = splitName[splitName.length - 1];
    }
    return { first_name, last_name }
}

async function sendRSVPConfirmation(email, first_name, last_name, attendingSealing, attendingLuncheon, attendingReception) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ionos.com",
        port: 465,
        secure: true,
        auth: {
            user: "info@emmalynandjonathon.com",
            pass: process.env.PASSWORD,
        }
    })

    let emailBody = `
    <html>
    <head>
        <style>
            h2, p, h3 {
                font-family: "EB Garamond", serif;                
                font-size: large;
            }
        </style>
    </head>
    <body>
        <h2>Hi, ${first_name},</h2>
        <p>We're so excited to see you on our special day! Here are the details so you don't forget:</p>
        <hr />
        ${attendingSealing.length > 0 ? `
            <h3>Sealing:</h3>
            <p>May 10, 2025<br>10:00 a.m. (arrive 30 minutes early)<br>Manti Temple<br><a href="https://maps.app.goo.gl/gKywY9GonNwJT1AU7">200 East 510 North, Manti, UT 84642</a></p>
            <p><strong>Guests attending the Sealing:</strong>            
            ${attendingSealing.join(', ')}</p>
            <hr />` : ''}

        ${attendingLuncheon.length > 0 ? `
            <h3>Luncheon:</h3>
            <p>May 10, 2025<br>2:00 p.m.<br>Hawks Rest Chapel<br><a href="https://maps.app.goo.gl/LGiuXgWfLZBLMhwS7">825 Hawks Rest Dr, Mapleton, UT 84664</a></p>
            <p><strong>Guests attending the Luncheon:</strong>
            
             ${attendingLuncheon.join(', ')}</p>
             <hr />` : ''}        
        ${attendingReception.length > 0 ? `
            <h3>Reception:</h3>
            <p>May 10, 2025<br>Schedule:<br>&nbsp;&nbsp;&nbsp;&nbsp;Line: 6:30 p.m. - 7:30 p.m.<br>&nbsp;&nbsp;&nbsp;&nbsp;Celebration & Traditions: 7:30 p.m - 8:30 p.m.<br>&nbsp;&nbsp;&nbsp;&nbsp;Send-Off: 8:30 p.m.<br>The Barn on Mapleton Pond<br><a href="https://maps.app.goo.gl/CiBwtF4Hi2AUR1ga8">1250 S Nemelka Ln, Mapleton, UT 84664</a></p>
            <p><strong>Guests attending the Reception:</strong> ${attendingReception.join(', ')}</p>
            <hr />` : ''}
        
        <p>We can't wait to celebrate with you!</p>
    </body>
    </html>
`;
        

    const mailOptions = {
        from: '"Emmalyn and Jonathon" <info@emmalynandjonathon.com>',
        to: email,
        subject: "RSVP Confirmation for Emmalyn and Jonathon's Wedding",
        html: emailBody,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("RSVP Confirmation sent: " + info.response);
    } catch (err) {
        console.error("Error sending confirmation email", err)
    }
    
}

export { splitName, sendRSVPConfirmation };