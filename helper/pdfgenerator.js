const html_to_pdf = require("html-pdf-node");
const path = require("path");

const generateHTML = (datas) => {
    let html = `<table>`
    datas.forEach(data => {
        const keys = Object.keys(data);
        html += `<tr>
                    <th>${data.key}</th>
                </tr>`
        
        keys.forEach( key => {
            if(key !== 'key') {
                html += `<tr>
                            <td>
                                ${key}
                            </td>
                            <td>
                                ${data[key]}
                            </td>
                        </tr>`
            }
        })
    })
    html += `</table>`
    return html;
}

const generatePdf = async (datas, filename) => {
  await html_to_pdf.generatePdf(
    { content: generateHTML(datas) },
    { format: "A4", path: path.join(__dirname, '..', `public/${filename}.pdf`) }
    // { format: "A4", path: `./public/${filename}.pdf` }
  );
};

module.exports = generatePdf;