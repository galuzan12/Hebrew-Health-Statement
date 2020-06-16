const puppeteer = require('puppeteer');
const fs = require('fs');
const { sendEmail } = require("./Email");

const generatePdf = async (req, res, next) => {

    try {
        let { name, id, company, degrees, trimmedDataURL, questions, date } = req.body;
        date = date.split('T')[0].split('-')
        const dir = setDirectory(name, date, company);
        const { questionsArray, reportPerson } = setData(questions, degrees);
        const finalDate = `${date[2]}/${date[1]}/${date[0]}`;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent('<html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>הצהרת בריאות</title> </head> <body dir="rtl"> <!-- <div class="a"> <img class="i"src="https://upload.wikimedia.org/wikipedia/he/thumb/e/e3/SupergasLogo.svg/1280px-SupergasLogo.svg.png" alt=""></div> --><div class="b"> <b>הנדון: <u>הצהרת כניסה למקום עבודה בהתאם לתקנות שעת חירום (נגיף הקורונה החדש - הגבלת פעילות) תשף - 2020</u></b> </div> <div class="c"> <p> שם מלא: ' + name + '</p> <p> תעודת זהות: ' + id + '</p> <p> חברה: ' + company + '</p> </div> <div class="d"> <table border="1"> <thead> <th></th> <th>כן</th> <th>לא</th> </thead> <tbody> <tr> <th>האם אתה משתעל?</th> <td>' + questionsArray[0] + '</td> <td>' + questionsArray[1] + '</td> </tr> <tr> <th>האם חום גופך מעל 38 מעלות צלזיוס או האם היה לך חום כאמור בשבוע האחרון</th> <td>' + questionsArray[2] + '</td> <td>' + questionsArray[3] + '</td> </tr> <tr> <th>האם היית במגע קרוב עם חולה קורונה בשבועיים האחרונים</th> <td>' + questionsArray[4] + '</td> <td>' + questionsArray[5] + '</td> </tr> </tbody> </table> </div> <div class="e"> <p><u>הוראה לאחראי על מקום העבודה: </u>יש למנוע כניסה למקום העבודה למי שלא השיב בשלילה על כל אחת מהשאלות הנ"ל, למעט אדם שתמשתעל בשל מצב כרוני כגון אסתמה או אלגריה אחרת</p> </div> <div class="f"> <b>תוצאת מדידת חום באמצעי לא פולשני: ' + degrees + ' מעלות צלזיוס</b> </div> <div class="e"> <p><u>הוראה לאחראי על מקום העבודה: </u>יש למנוע כניסה למקום העבודה של אדם עם חום גוף של 38 מעלות צלזיוס ומעלה </p> </div> <div class="g"> <p>תאריך: ' + finalDate + '</p> </div> <div class="h"> <p>חתימה: </p> <img class="j" src=' + trimmedDataURL + ' alt=""> </div> <div class="k"> <p>משרד ראשי: רחוב יד חרוצים 36 ת.ד. 8774 א.ת נתניה דרום 42505 טלפון: 09-8308101 פקס: 09-8308181</p> </div> </body> <style> .a { align-items: center; margin-bottom: 3%; } .b { font-size: 150%; text-align: center; margin: 0 10%; } .c { font-size: 150%; text-align: right; margin: 0 10%; } .d, .e, .f, .g, .h { font-size: 130%; text-align: right; margin: 0 10%; } .i { margin: 1% auto; width: 20%; height: 10%; display: block; } table { width: 100%; } tbody { text-align: right; } .j { font-size: 130%; text-align: right; margin: 0 10%; width: 50px; height: 50px; } .k { position: fixed; bottom: 0; right: 0; left: 0; text-align: center; } </style> </html>');
        await page.pdf({
            path: dir,
            format: 'A4',
            printBackground: true
        });
        await browser.close();
        if (reportPerson) {
            return await sendEmail(req, res, dir);
        }
        return res.status(200).json({ result: true });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ result: false })
    }
}

const setData = (questions, degrees) => {
    let questionsArray = [];
    let reportPerson = false;
    for (let element in questions) {
        if (questions[element] === 'כן') {
            questionsArray.push('X');
            questionsArray.push('');
            reportPerson = true;
        }
        else {
            questionsArray.push('');
            questionsArray.push('X');
        }
    }
    if (Number(degrees) >= 38) reportPerson = true;

    return { questionsArray, reportPerson };
}

const setDirectory = (name, date, company) => {
    let finalDate = `${date[2]}-${date[1]}-${date[0]}`;
    let dir = `Statments/${company}/${finalDate}`;

    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
    return `${dir}/${name} - ${finalDate}.pdf`;
}


exports.generatePdf = generatePdf;
