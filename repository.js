const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    "857498320582-9pfs7khkdhf1vn6163erbk2c622h8j06.apps.googleusercontent.com",
    "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",
    "http://localhost");

oAuth2Client.setCredentials({
    type: "authorized_user",
    client_id: "857498320582-9pfs7khkdhf1vn6163erbk2c622h8j06.apps.googleusercontent.com",
    client_secret: "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",
    refresh_token: "1//0hA3jaYvJ24PZCgYIARAAGBESNwF-L9IroQtmANKijpagQ6Z818KZqWtFVTLncvFj-PAgZKL9x4h5pi1QbJbMbMpq7Sfj1NWI6cA"
});

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

async function read() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1RtE6nICcXs_lttgqEsPlbMofdxDNTt9RXC3iH7tQQis',
        range: 'products!A2:E',
    });
    const rows = res.data.values;
    const products = rows.map((row) => ({
        id: +row[0],
        name: row[1],
        price: +row[2],
        image: row[3],
        stock: +row[4],
    }));
    return products;
};

async function write(products) {
    let values = products.map(p => [p.id, p.name, p.price, p.image, p.stock])
    const resource = {
        values,
    };
    const result = sheets.spreadsheets.values.update({
        spreadsheetId: '1RtE6nICcXs_lttgqEsPlbMofdxDNTt9RXC3iH7tQQis',
        range: 'products!A2:E',
        valueInputOption: 'RAW',
        resource,
    });
    console.log(result.updateCells)

}

// async function readANDwrite() {
//     const products = await read();
//     await write(products);
// }

// readANDwrite();

module.exports = {
    read,
    write,
}
