import { jsPDF } from "jspdf"
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('nikosh-normal.ttf', font);
this.addFont('nikosh-normal.ttf', 'nikosh', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
