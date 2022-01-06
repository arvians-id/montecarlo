// CREATED BY WIDDY ARFIANSYAH
// Selector
const form = document.querySelector('#form');
const submit = document.querySelector('#submit');
const showPermintaan = document.querySelector('#show-permintaan');
const showLast = document.querySelector('#show-last');
const frekuensi = document.getElementsByName('frekuensi[]');
const angka_acak = document.querySelector('[name="angka_acak"]');
const harga = document.querySelector('[name="harga"]');
const showResultPermintaan = document.querySelector('#permintaan');
const showResultPendapatan = document.querySelector('#pendapatan');

form.addEventListener('submit', function(e){
    e.preventDefault();

    // Init
    let totalPermintaan = 0;
    let totalProbabilitas = 0;
    let intval = 0;
    let tablePermintaan = '';
    let data = [];

    // Get Total Frekuensi
    Array.from(frekuensi).map(val => data.push(parseInt(val.value)));
    const totalPermintaanTable = data.reduce((val, i) => val + i);

    // Make Table
    let dataIntval = [];
    for(let i=0; i<data.length; i++){
        data[-1] = 0;
        const value = parseInt(data[i]);
        totalPermintaan += value;
        totalProbabilitas += parseFloat((value / totalPermintaanTable).toFixed(2));

        const v = parseInt(data[(i - 1) < 0 ? -1 : (i - 1)]);
        intval += parseFloat((v / totalPermintaanTable).toFixed(2));
        
        tablePermintaan += `<tr>
                                <td>${i}</td>
                                <td>${value}</td>
                                <td>${(value / totalPermintaanTable).toFixed(2)}</td>
                                <td>${totalProbabilitas.toFixed(2)}</td>
                                <td>${Math.round(intval.toFixed(2) * 100)} - ${Math.round((totalProbabilitas.toFixed(2) * 100) - 1)}</td>
                            </tr>`;

        dataIntval.push([Math.round(intval.toFixed(2) * 100), Math.round((totalProbabilitas.toFixed(2) * 100) - 1), i]);

    }
    let tableJumlahPermintaan = '';
    let totPermintaan = 0;
    let hasil = 0;
    for(let j=0; j<angka_acak.value; j++){
        let bilAcak = Math.floor(Math.random() * 100) + 1;
        let intvalAcak = '';
        dataIntval.map(val => {
            if(check(bilAcak, val[0], val[1])){
                intvalAcak = val[2]
            }
        })
        tableJumlahPermintaan += `<tr>
                                    <td>${j + 1}</td>
                                    <td>${bilAcak}</td>
                                    <td>${intvalAcak}</td>
                                    <td>${(intvalAcak * harga.value)}</td>
                                </tr>`;
        totPermintaan += intvalAcak;
        hasil += (intvalAcak * harga.value);
    }
    
    tableJumlahPermintaan += `<tr style="font-weight:bold">
                                    <td>Jumlah</td>
                                    <td></td>
                                    <td>${totPermintaan}</td>
                                    <td>${hasil}</td>
                                </tr>`;
    showLast.innerHTML = tableJumlahPermintaan;
    
    showResultPermintaan.innerHTML = 'Rata-rata permintaan : ' + (totPermintaan / parseInt(angka_acak.value));
    showResultPendapatan.innerHTML = 'Rata-rata pendapatan : ' + (hasil / parseInt(angka_acak.value));

    funcPermintaan(tablePermintaan, totalPermintaan, totalProbabilitas);
})

function check(bil, first, end){
    if(bil >= first && bil <= end){
        return true;
    }
    return false;
}
// Table Permintaan
function funcPermintaan(table, total, probabilitas){
    table += `<tr style="font-weight:bold">
                <td>Total</td>
                <td>${total}</td>
                <td>${probabilitas}</td>
                <td></td>
                <td></td>
                </tr>`;
    showPermintaan.innerHTML = table;
}