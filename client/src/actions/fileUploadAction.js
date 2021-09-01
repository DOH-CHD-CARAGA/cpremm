import {
    SET_SHEET_DATA,
    UPLOAD_STATUS_UPDATE,
    UPDATE_SHEET_STATUS,
    SET_SHEET_DATA2,
    UPLOAD_STATUS_UPDATE2,
    UPDATE_SHEET_STATUS2,
 } from './types';

import {
    ArrangeNumber
} from './helpers/displayAction';
  
import { SERVER_API, JWT } from '../config';
import axios from 'axios';
 
 
 export const arrangeSheetData = (data, sheetName, i) => (dispatch, getState) => {
    var arrangeData = [], keys = [], temp;

    dispatch({
        type: UPLOAD_STATUS_UPDATE,
        msg: "Preparing Sheet #" + (i+1) + " (" + sheetName + ")"
    });

    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);

        if (data[x].BRAND && data[x].MODEL){
            temp = {
                qty  : data[x].QTY || 0,
                brand: data[x].BRAND || "",
                desc : data[x].DESCRIPTION || "",
                model: data[x].MODEL || "",
                cost : data[x]["UNIT COST"] || 0,
            };
    
            for (let y = 0, len2 = keys.length; y < len2; y++){
                if (keys[y] != "BRAND" && keys[y] != "DESCRIPTION" && keys[y] != "MODEL" && keys[y] != "UNIT COST" && keys[y] != "QTY"){
                    if (data[x].hasOwnProperty(keys[y]) && data[x][keys[y]] != 0) {
                        temp[keys[y]] = data[x][keys[y]];
                    }
                }
            }
    
            arrangeData.push(temp);    
        }



        // delete data[x].QTY;
        // delete data[x].BRAND;
        // delete data[x].DESCRIPTION;
        // delete data[x].MODEL;
        // delete data[x]["UNIT COST"];
    }

    dispatch({
        type: SET_SHEET_DATA,
        data: arrangeData,
        sheetName: sheetName,
        ind: i
    });

 }
  
export const saveSheetToDB = (sheet, ind) => (dispatch, getState) => {
    axios({
        url: `${SERVER_API}/inventory/uploaddata`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem(JWT)
        },
        data: {
            ...sheet
        }
    })
        .then(result => {
            dispatch(
                updateSheetStatus(ind, 1)
            );
        })
        .catch(err => {
            dispatch(
                updateSheetStatus(ind, 4)
            );
        });
    
}

export const updateSheetStatus = (ind, status) => (dispatch, getState) => {
    var sheetStatus = [...getState().fileUpload.sheetStatus]; 
    sheetStatus[ind] = status;

    dispatch({
        type: UPDATE_SHEET_STATUS,
        sheetStatus: sheetStatus
    })
}

//// FILE UPLOAD TYPE 2 
export const arrangeSheetDataRecords = (data, sheetName) => (dispatch, getState) => {
    var avr = [{"number":"1","brand":"SECURE","serial":"","propertyCode":""},{"number":"2","brand":"","serial":"","propertyCode":""},{"number":"3","brand":"ELITE AVR","serial":"","propertyCode":""},{"number":"4","brand":"PARAMOUNT","serial":"","propertyCode":""},{"number":"5","brand":"PROTEC","serial":"YY10070104031","propertyCode":""},{"number":"6","brand":"APC 1100 VA","serial":"","propertyCode":""},{"number":"7","brand":"POWER FOR AVR 500W","serial":"","propertyCode":""},{"number":"8","brand":"IDEAL 600 VA","serial":"13305359264","propertyCode":""},{"number":"9","brand":"POWER BOX AVR","serial":"","propertyCode":""},{"number":"10","brand":"DELKIN 500 W","serial":"","propertyCode":""},{"number":"11","brand":"ZEUS 500W","serial":"","propertyCode":""},{"number":"12","brand":"NVX-AVR 501","serial":"","propertyCode":""},{"number":"13","brand":"L-TECH 100W AVR","serial":"","propertyCode":""},{"number":"14","brand":"NVX AVR-501","serial":"","propertyCode":""},{"number":"15","brand":"PROTEC","serial":"","propertyCode":""},{"number":"17","brand":"MITSUI","serial":"","propertyCode":""},{"number":"18","brand":"APC 625 VA/POWER AVR","serial":"3B1521X04106","propertyCode":"2015-10-278-IT"},{"number":"19","brand":"POWERTEK","serial":"","propertyCode":""},{"number":"20","brand":"BOOST ART 500","serial":"2016-08-329-IT","propertyCode":"B01409208120"},{"number":"21","brand":"INFINITE APX 1200 VA","serial":"431402303908","propertyCode":""},{"number":"22","brand":"ORION 650 VA","serial":"EZ20160100869","propertyCode":"2016-08-335-IT"},{"number":"23","brand":"INFINITE APX 1200 VA","serial":"431211303884","propertyCode":""},{"number":"24","brand":"IDEAL 500W","serial":"","propertyCode":""},{"number":"25","brand":"ZEUS 500W","serial":"","propertyCode":""},{"number":"26","brand":"ZEUS 500 W","serial":"","propertyCode":""},{"number":"27","brand":"SECURE 500 W","serial":"","propertyCode":""},{"number":"28","brand":"SECURE 500 W","serial":"","propertyCode":""},{"number":"29","brand":"SECURE 500 W","serial":"","propertyCode":"2017-04-111-IT"},{"number":"30","brand":"POWERLINE 500 W","serial":"","propertyCode":""},{"number":"31","brand":"POWERLINE 500 W AVR","serial":"","propertyCode":""},{"number":"33","brand":"SECURE 500 W","serial":"","propertyCode":""},{"number":"34","brand":"POWER BOXX AVR","serial":"","propertyCode":""},{"number":"35","brand":"AVR GIANT POWER","serial":"","propertyCode":""},{"number":"36","brand":"ZEUS","serial":"","propertyCode":""},{"number":"37","brand":"POWERTEK","serial":"","propertyCode":""},{"number":"38","brand":"GIANT POWER","serial":"","propertyCode":""},{"number":"39","brand":"DELKIN 500W AVR","serial":"","propertyCode":""},{"number":"40","brand":"NVX AVR-501","serial":"","propertyCode":""},{"number":"41","brand":"PARAMOUNT 500W","serial":"","propertyCode":""},{"number":"42","brand":"I-TECH","serial":"","propertyCode":""},{"number":"43","brand":"BOOST ART 500","serial":"","propertyCode":""},{"number":"44","brand":"ECO POWER","serial":"","propertyCode":""},{"number":"45","brand":"NVX 500W AVR","serial":"","propertyCode":""},{"number":"46","brand":"ZEUS","serial":"","propertyCode":""},{"number":"48","brand":"IDEAL 600 VA","serial":"16238755375","propertyCode":""},{"number":"49","brand":"NVX AVR 501","serial":"","propertyCode":""},{"number":"50","brand":"NVX AVR 500W","serial":"","propertyCode":""},{"number":"51","brand":"SECURE 500W","serial":"YYL7102820200","propertyCode":""},{"number":"53","brand":"SECURE 500W","serial":"","propertyCode":""},{"number":"55","brand":"GIANT POWER 500W AVR","serial":"","propertyCode":""},{"number":"56","brand":"","serial":"","propertyCode":""},{"number":"57","brand":"AVR 500 W","serial":" ","propertyCode":" "},{"number":"58","brand":"ICUTE PL600 POWERLINE","serial":"   EZ20130500931","propertyCode":" "},{"number":"59","brand":"ORION 600 VA","serial":"2013-8-050-ICS","propertyCode":""}];
    var ups = [{"number":"1","brand":"IDEAL 600 VA","serial":"172810519052","propertyCode":""},{"number":"2","brand":"INFINITE APX 1200","serial":"SMXK032568","propertyCode":""},{"number":"3","brand":"ALPHA 600 VA","serial":"","propertyCode":""},{"number":"4","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"5","brand":"","serial":"","propertyCode":""},{"number":"6","brand":"ULTRA POWER","serial":"","propertyCode":""},{"number":"7","brand":"ORION 600 VA","serial":"EZ20130500391","propertyCode":""},{"number":"8","brand":"APC 1100 VA","serial":"381632X25603","propertyCode":""},{"number":"9","brand":"ORION","serial":"EZ20150800397","propertyCode":""},{"number":"10","brand":"IDEAL 600 VA","serial":"XAF150519125740435","propertyCode":""},{"number":"11","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"12","brand":"INFINITE APX 1200 VA","serial":"431402303898","propertyCode":""},{"number":"13","brand":"INFINITE APX 1200","serial":"431211303498","propertyCode":""},{"number":"14","brand":"IDEAL 600 VA","serial":"","propertyCode":"04-4820-IT"},{"number":"15","brand":"APC 1100 ","serial":"30722X03119","propertyCode":"2017-11-196"},{"number":"16","brand":"INFINITE APX 1200 VA","serial":"3D1722X03082","propertyCode":""},{"number":"17","brand":"APC 1100 VA","serial":"3B1722X03253","propertyCode":"2017-111-4438-IT"},{"number":"18","brand":"IDEAL VA","serial":"3B1722X03253","propertyCode":""},{"number":"19","brand":"APC 1100 VA","serial":"3B1722X03253","propertyCode":""},{"number":"20","brand":"INFINITE APX 1200","serial":"431311300207","propertyCode":""},{"number":"21","brand":"IDEAL 600 VA","serial":"9100629960","propertyCode":""},{"number":"22","brand":"ORION 600 VA","serial":"","propertyCode":""},{"number":"23","brand":"ORION 600 VA","serial":"EZ20130500932","propertyCode":""},{"number":"24","brand":"APC 1100 VA","serial":"3B1538XO7160","propertyCode":""},{"number":"25","brand":"IDEAL 600 VA","serial":"15177465156","propertyCode":""},{"number":"26","brand":"IDEAL 600 VA","serial":"15016894621","propertyCode":""},{"number":"27","brand":"INFINITE APX 1200 VA","serial":"43140230915","propertyCode":""},{"number":"28","brand":"PC-STAR","serial":"","propertyCode":""},{"number":"29","brand":"UPS SOLARIS HYBRID","serial":"","propertyCode":""},{"number":"30","brand":"INFINITE APX 1200 VA","serial":"11-5492-IT-10","propertyCode":""},{"number":"31","brand":"DELKIN","serial":"","propertyCode":""},{"number":"32","brand":"INFINITE APX 1200","serial":"431402303704","propertyCode":""},{"number":"33","brand":"ORION","serial":"","propertyCode":""},{"number":"34","brand":"IDEAL UPS 1200 VA","serial":"431402303934","propertyCode":""},{"number":"35","brand":"APC 650 VA","serial":"3B1234X21532","propertyCode":""},{"number":"36","brand":"APC 625 VA","serial":"3B1521Y05379","propertyCode":"2015-10-279-IT"},{"number":"37","brand":"APC 625 VA","serial":"3B1447X08843","propertyCode":""},{"number":"38","brand":"INFINITE 1200 VA APX","serial":"431211303578","propertyCode":""},{"number":"39","brand":"INFINITE APX 1200 VA","serial":"431311300213","propertyCode":""},{"number":"40","brand":"KSTAR MICRO 800","serial":"310020553681784100896","propertyCode":""},{"number":"41","brand":"UPS","serial":"EZ20130100876","propertyCode":""},{"number":"42","brand":"ORION 650 VA","serial":"EZ20130100876","propertyCode":""},{"number":"43","brand":"KSTAR","serial":"XAAF150519125751077","propertyCode":""},{"number":"44","brand":"ORION 650 VA","serial":"EZ20160100566","propertyCode":""},{"number":"45","brand":"INFINITE APX 1200","serial":"431402303867","propertyCode":""},{"number":"46","brand":"BOOST ART 500 10","serial":"","propertyCode":""},{"number":"47","brand":"IDEAL 500 VA","serial":"15177467416","propertyCode":""},{"number":"48","brand":"RISE UPS 800 VA","serial":"","propertyCode":""},{"number":"50","brand":"INFINITE 1200 VA","serial":"4313110300165","propertyCode":""},{"number":"53","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"54","brand":"MITSUI","serial":"","propertyCode":""},{"number":"55","brand":"INFINITE APX 1200 VA","serial":"431211303854","propertyCode":""},{"number":"56","brand":"INFINITE APX 1200 VA","serial":"431211303854","propertyCode":""},{"number":"57","brand":"INFINITE APX 1200 VA","serial":"431211303595","propertyCode":""},{"number":"58","brand":"IDEAL 600 VA","serial":"15177465086","propertyCode":""},{"number":"59","brand":"EATON UPS","serial":"","propertyCode":""},{"number":"60","brand":"INFINITE APX 1200 VA","serial":"431211303578","propertyCode":""},{"number":"61","brand":"INFINITE APX 1200 VA","serial":"431211303854","propertyCode":""},{"number":"62","brand":"INFINITE APX 1200 VA","serial":"431211303462","propertyCode":""},{"number":"63","brand":"K-STAR 600 VA UPS","serial":"XAFF150519125740220","propertyCode":"2016-08-304-IT"},{"number":"64","brand":"APC 625 VA","serial":"3B1714X00465","propertyCode":"2017-09-162-IT"},{"number":"65","brand":"APC BLACK UPS 1100","serial":"","propertyCode":""},{"number":"66","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"67","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"68","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"69","brand":"IDEAL 600 VA 211","serial":"","propertyCode":""},{"number":"70","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"73","brand":"IDEAL 600 VA","serial":"16238755375","propertyCode":""},{"number":"74","brand":"INFINITE APX 1200","serial":"431311300173","propertyCode":""},{"number":"75","brand":"IDEAL 600 VA","serial":"10491996795","propertyCode":""},{"number":"78","brand":"ORION 650 VA","serial":"","propertyCode":""},{"number":"79","brand":"IDEAL 600 VA","serial":"14416467324","propertyCode":""},{"number":"80","brand":"INFINITE APX 1200 VA","serial":"431211303676","propertyCode":""},{"number":"81","brand":"INFINITE APX 1200","serial":"431211303577","propertyCode":""},{"number":"82","brand":"IDEAL 600 VA","serial":"","propertyCode":""},{"number":"83","brand":"INFINITE APX 1200","serial":"431211303576","propertyCode":""},{"number":"84","brand":"INFINITE APX 1200","serial":"431211303455","propertyCode":""},{"number":"85","brand":"ORION 600 VA","serial":"EZ20130100007","propertyCode":""},{"number":"86","brand":"INFINITE APX 1200","serial":"431311300137","propertyCode":""},{"number":"87","brand":"ZEUS","serial":"","propertyCode":""},{"number":"88","brand":"INFINITE APX 1200 VA","serial":"431211303884","propertyCode":""},{"number":"89","brand":"ORION","serial":"EZ20150200597","propertyCode":""},{"number":"90","brand":"UPS 600 VA","serial":"","propertyCode":""},{"number":"91","brand":"IDEAL 600 VA","serial":"16128542682","propertyCode":""},{"number":"92","brand":"ORION","serial":"EZ0120150500014","propertyCode":"2016-08-334-IT"},{"number":"93","brand":"IDEAL 600 VA","serial":"EZ0120180500017","propertyCode":""},{"number":"94","brand":"IDEAL UPS","serial":"EZ0120180500017","propertyCode":""},{"number":"95","brand":"ORION 600 VA","serial":"","propertyCode":""},{"number":"96","brand":"APC 1100VA","serial":"3B1538X07167","propertyCode":""},{"number":"97","brand":"IDEAL UPS","serial":"","propertyCode":""},{"number":"98","brand":"DELTA 1500 VA","serial":"641806501743","propertyCode":"2019-07-213-IT"},{"number":"99","brand":"ORION","serial":"EZ20161000897","propertyCode":" "},{"number":"100","brand":"KEBOS 1500 VA","serial":"15001901500087","propertyCode":"  "},{"number":"101","brand":"INFINITE APX 1200 VA","serial":"43140230370","propertyCode":"2015-06-151-IT"},{"number":"102","brand":"INFINITE APX 1200 VA","serial":"431402303670","propertyCode":""},{"number":"103","brand":"APC 625 VA","serial":"3B164X37715","propertyCode":""},{"number":"104","brand":"IDEAL 600 VA","serial":"08410460727","propertyCode":"2009-04-4812-IT"},{"number":"105","brand":"ORION 650 VA","serial":"EZ0120161200388","propertyCode":""},{"number":"106","brand":"INFINITE APX 1200 VA","serial":"431402303930","propertyCode":" "},{"number":"107","brand":"IDEAL 600VA","serial":"15016894522","propertyCode":"2016-014-029-IT"},{"number":"108","brand":"ORION 600 VA","serial":" ","propertyCode":" "},{"number":"109","brand":"IDEAL 600 VA","serial":"161285444732","propertyCode":""}];
    var scanner = [{"number":"1","brand":"EPSON L360","serial":"X5C3235500","propertyCode":""},{"number":"2","brand":"CANONLIDE","serial":"KEFA20572","propertyCode":""},{"number":"3","brand":"CANONLIDE FLATBED","serial":"KEFE78569","propertyCode":"2014-03-81-IT"},{"number":"4","brand":"CANONLIDE ","serial":"KEFA20572","propertyCode":""},{"number":"5","brand":"HP SCANJET N6310","serial":"","propertyCode":""},{"number":"6","brand":"DLP ACER P1340","serial":"","propertyCode":""},{"number":"9","brand":"CANONLIDE 120 FLATBED","serial":"KJL1388824","propertyCode":""},{"number":"10","brand":"CANOSCAN","serial":"KJLB88824","propertyCode":""},{"number":"11","brand":"CANONLIDE","serial":"KEFB88646","propertyCode":""},{"number":"12","brand":"CANONLIDE FLATBED","serial":"KJLB89095","propertyCode":""},{"number":"14","brand":"CANONLIDE 120","serial":"","propertyCode":"2015-08-192-IT"},{"number":"16","brand":"FLATBED L110 CANON","serial":"KEFE76342","propertyCode":"2014-03-082-IT"},{"number":"17","brand":"SCANNER ","serial":"VGFK272511","propertyCode":"2018-04-230-IT"},{"number":"18","brand":"CANONLIDE 120","serial":"KJLB88128","propertyCode":"2015-10-263-IT"},{"number":"19","brand":"CANONLIDE 100","serial":"KDMC10541/KDMCIDD530","propertyCode":"2010-02-5088-IT"}];
    var printer = [{"number":"1","built":"1","name":"EPSON L220","code":"","serial":"VCWK160578","user":""},{"number":"2","built":"2","name":"EPSON L360","code":"","serial":"VGFK152245","user":""},{"number":"3","built":"3","name":"HP L3110 (DONATED)","code":"","serial":"XD5Y032826","user":""},{"number":"4","built":"4","name":"HP LASERJET 1102","code":"","serial":"VNF3572831","user":""},{"number":"5","built":"5","name":"","code":"","serial":"","user":""},{"number":"6","built":"6","name":"BROTHER DCP-T700W","code":"","serial":"EZ4708K7H619260","user":""},{"number":"7","built":"7","name":"EPSON L120","code":"","serial":"TP3K216454","user":""},{"number":"8","built":"10","name":"BROTHER-MPC J220","code":"","serial":"K3F439608","user":""},{"number":"9","built":"14","name":"HP P1102","code":"","serial":"VNF8Q40927","user":""},{"number":"10","built":"15","name":"BROTHER DCP-T700W","code":"","serial":"E74708K7H619429","user":""},{"number":"11","built":"19","name":"HP LASERJET 1102","code":"2016-04-145-IT","serial":"VNF8Z35469","user":""},{"number":"12","built":"20","name":"HP DESKJET G 5810","code":"2018-10-412-IT","serial":"CN78VG140","user":""},{"number":"13","built":"28","name":"HP 1102","code":"","serial":"VNF300336","user":""},{"number":"14","built":"29","name":"HP DESKJET INK ADVANTAGE 2010","code":"","serial":"CN38E79A76","user":""},{"number":"15","built":"30","name":"HP 1102","code":"","serial":"VNC324493","user":""},{"number":"16","built":"33","name":"HP LASERJET 1006","code":"","serial":"VNC3501018","user":""},{"number":"17","built":"36","name":"EPSON L360","code":"","serial":"VGFK394225","user":""},{"number":"18","built":"38","name":"BROTHER HL 5340D","code":"","serial":"E666817M9J451310","user":""},{"number":"19","built":"39","name":"EPSON LQ-300 II","code":"2017-11-4438-IT","serial":"G85Y006130","user":""},{"number":"20","built":"40","name":"EPSON LQ300","code":"","serial":"G85Y006310","user":""},{"number":"21","built":"41","name":"EPSON L360","code":"","serial":"","user":""},{"number":"22","built":"42","name":"EPSON L220","code":"2016-07-303-IT","serial":"VGWK10832","user":""},{"number":"23","built":"43","name":"EPSON L360","code":"","serial":"VGFK394223","user":""},{"number":"24","built":"47","name":"EPSON L360","code":"","serial":"VGFK394556","user":""},{"number":"25","built":"48","name":"EPSON L360 ","code":"2018-05-273-IT","serial":"VGFK394202","user":""},{"number":"26","built":"49","name":"EPSON L360","code":"","serial":"","user":""},{"number":"27","built":"50","name":"BROTHER MFC-J220","code":"","serial":"E67793K3F439527","user":""},{"number":"28","built":"52","name":"HP LASERJET 1102","code":"","serial":"VNF3R03704","user":""},{"number":"29","built":"54","name":"LASERJET PRO M102A","code":"","serial":"VNC3421367","user":""},{"number":"30","built":"55","name":"EPSON L220","code":"","serial":"VGWK108380","user":""},{"number":"31","built":"57","name":"CANON MP 287","code":"","serial":"LFMJ29823","user":""},{"number":"32","built":"58","name":"HP DESKTOP INK ADVANTAGE","code":"","serial":"1H78E9VC9B","user":""},{"number":"33","built":"59","name":"HP 1102","code":"","serial":"15016894621","user":""},{"number":"35","built":"61","name":"HP LASERJET 1102","code":"","serial":"VNF3C89422","user":""},{"number":"36","built":"62","name":"HP LASERJET 1006","code":"","serial":"VNF5102009","user":""},{"number":"37","built":"64","name":"BROTHER DCP-J100","code":"","serial":"373184L4H405602","user":""},{"number":"38","built":"65","name":"HP 1102","code":"","serial":"VNF7R94372","user":""},{"number":"39","built":"69","name":"LASER JET ENTERPRISE P3015","code":"","serial":"VNC3602325","user":""},{"number":"40","built":"70","name":"HP PRINTER LASERJET 2015","code":"","serial":"CNC1F08822","user":""},{"number":"41","built":"71","name":"CANON IP 2770","code":"2016-01-005-IT","serial":"HRVU61236","user":""},{"number":"42","built":"73","name":"HP DESKJET INK ADVANTAGE 115","code":"","serial":"CN6CL28648","user":""},{"number":"43","built":"76","name":"CANON 3 IN 1","code":"","serial":"","user":""},{"number":"44","built":"77","name":"BROTHER HL-1110","code":"","serial":"E72063F5N695301","user":""},{"number":"45","built":"78","name":"HP LASERJET P1006","code":"","serial":"VNF6J01337","user":""},{"number":"46","built":"79","name":"HP LASERJET P1102","code":"","serial":"VNC4P00734","user":""},{"number":"47","built":"81","name":"HP P1102","code":"2015-10-300-IT","serial":"VNF8K29551","user":""},{"number":"48","built":"82","name":"HP P1102","code":"2016-10-397-IT","serial":"VNF5CS4091","user":""},{"number":"49","built":"83","name":"EPSON L360 3 N 1","code":"2017-10-215-IT","serial":"VGFK237763","user":""},{"number":"50","built":"84","name":"HP P1120","code":"2014-03-088","serial":"VNF7V00288","user":""},{"number":"51","built":"85","name":"EPSON LX-300 II","code":"","serial":"68NY236798","user":""},{"number":"52","built":"86","name":"ALL IN 1 WIRELESS PRINTER","code":"2016-12-573-IT","serial":"W9GY000316","user":""},{"number":"53","built":"87","name":"EPSON L360","code":"2017-07-178-IT","serial":"VGF183347","user":""},{"number":"54","built":"88","name":"BROTHER DCP-T500W","code":"","serial":"E7470705H717650","user":""},{"number":"55","built":"90","name":"EPSON L360","code":"","serial":"VGFK278482","user":""},{"number":"56","built":"91","name":"EPSON L220","code":"","serial":"VGK160599","user":""},{"number":"57","built":"92","name":"EPSON L360","code":"2017-10-216-IT","serial":"VGFK278471","user":""},{"number":"58","built":"94","name":"EPSON L220","code":"","serial":"VGWK039880","user":""},{"number":"59","built":"98","name":"HP 1010","code":"2016-04-169","serial":"SGDFK91697","user":""},{"number":"60","built":"99","name":"BROTHER DCP-T500W","code":"","serial":"E74707J5H142244","user":""},{"number":"61","built":"100","name":"EPSON L360","code":"2018-08-358-IT","serial":"VGFK420779","user":""},{"number":"62","built":"104","name":"EPSON L360","code":"2016-12-571-IT","serial":"VGFKQ55411","user":""},{"number":"63","built":"105","name":"HP 1102 ","code":"2014-10-209-IT","serial":"VNF3C30637","user":""},{"number":"64","built":"107","name":"EPSON L120","code":"2017-03-074-IT","serial":"TP3K337250","user":""},{"number":"65","built":"109","name":"HP LASERJET PRO M102A","code":"2017-03-080-IT","serial":"VNC4L05490","user":""},{"number":"66","built":"110","name":"HP LASERJET 3015","code":"2014-06-167-IT","serial":"VNC3602332","user":""},{"number":"67","built":"111","name":"EPSON L120","code":"2015-10-260-IT","serial":"TP3K174216","user":""},{"number":"68","built":"112","name":"HP LASERJET PRO M102A","code":"2017-03-078-IT","serial":"VNC4L05503","user":""},{"number":"69","built":"113","name":"HP 1102","code":"","serial":"VNC6W25447","user":""},{"number":"70","built":"114","name":"HP LASERJET 1102","code":"","serial":"VNC8W25447","user":""},{"number":"71","built":"116","name":"HP DESKJET GT 5810","code":"","serial":"CN7985G2M1","user":""},{"number":"73","built":"118","name":"LASERJET PRO M102A","code":"2017-03-80-IT","serial":"VNC4LD5696","user":""},{"number":"75","built":"120","name":"EPSON L120","code":"2016-07-251-IT","serial":"TP3K238643","user":""},{"number":"76","built":"121","name":"EPSON L120","code":"2015-06-114-IT","serial":"TP3K100531","user":""},{"number":"77","built":"122","name":"BROTHER DCP-T700W","code":"","serial":"E74708K7H619028","user":""},{"number":"78","built":"123","name":"BROTHER DCP-T700W","code":"","serial":"E74708K7H619020","user":""},{"number":"79","built":"125","name":"HP 1006","code":"","serial":"VNF4Y11756","user":""},{"number":"80","built":"126","name":"HP 2015 PRINTER","code":"","serial":"CNC1XQ304","user":""},{"number":"81","built":"127","name":"HP LASERJET 1102 FROM LEA LUDIE","code":"2016-07-299","serial":"VNF8505543","user":""},{"number":"82","built":"128","name":"HP DESKJET G1 5810","code":"","serial":"CN78V5G13Z","user":""},{"number":"83","built":"129","name":"EPSON LX-500","code":"","serial":"","user":""},{"number":"84","built":"130","name":"HP LASERJET 1102","code":"","serial":"VNF8805543","user":""},{"number":"85","built":"132","name":"FUJI PRINTER XEROX M115W","code":"","serial":"722660","user":""},{"number":"86","built":"134","name":"BROTHER DCP-T500W","code":"2017-08-194-IT","serial":"E74707E5H746398","user":""},{"number":"87","built":"135","name":"EPSON L220","code":"2016-10-394-IT","serial":"VGWK219057","user":""},{"number":"88","built":"138","name":"EPSON L120","code":"2009-04-4814-IT","serial":"SMQK030805","user":""},{"number":"89","built":"139","name":"HP LASERJET P1006","code":"2013-03-128-IT","serial":"","user":""},{"number":"90","built":"140","name":"CANON","code":"04-4813-IT-09","serial":"","user":""},{"number":"91","built":"141","name":"EPSON L350","code":"2015-09-217-IT","serial":"SMTK998946","user":""},{"number":"92","built":"142","name":"EPSON L120","code":"2016-08-306-IT","serial":"TP3K244604","user":""},{"number":"93","built":"144","name":"EPSON LX 300","code":"","serial":"G8NY241968","user":""},{"number":"94","built":"145","name":"EPSON LX-300 II","code":"","serial":"G8NY241968","user":""},{"number":"95","built":"146","name":"BROTHER HL-1110 MONOCHROME","code":"","serial":"E72063D5N642826","user":""},{"number":"96","built":"150","name":"EPSON L360","code":"","serial":"VGFK298300","user":""},{"number":"102","built":"159","name":"CANON PIXMA","code":"","serial":"LRHE93550","user":""},{"number":"103","built":"160","name":"BROTHER DCP J125","code":"","serial":"E67789K1F427517","user":""},{"number":"104","built":"161","name":"CANON PIXMA IP 2870","code":"","serial":"KBJM05757","user":""},{"number":"105","built":"162","name":"EPSON L120","code":"","serial":"TP3K116697","user":""},{"number":"106","built":"163","name":"HP 1505","code":"","serial":"VNC6NW18242","user":""},{"number":"107","built":"164","name":"HP 1115","code":"2017-08-184-IT","serial":"","user":""},{"number":"108","built":"165","name":"HP","code":"","serial":"TP3K402322","user":""},
                   {"number":"109","built":"167","name":"HP LASERJET 1102","code":"","serial":"VNF3800427","user":""},{"number":"110","built":"169","name":"EPSON L120","code":"","serial":"TP3K402322","user":""},{"number":"111","built":"170","name":"HP P1102","code":"","serial":"VNC3T29234","user":""},{"number":"112","built":"171","name":"EPSON L120","code":"","serial":"TP3K288063","user":""},{"number":"113","built":"172","name":"EPSON L220","code":"","serial":"SMXK183124","user":""},{"number":"114","built":"173","name":"HP LASERJET P1102W","code":"","serial":"VNF3800416","user":""},{"number":"115","built":"176","name":"EPSON L120","code":"","serial":"TP3K573253","user":""},{"number":"116","built":"177","name":"EPSON L120","code":"","serial":"TP3K288080","user":""},{"number":"117","built":"178","name":"HP 1102","code":"","serial":"VNF8320854","user":""},{"number":"118","built":"180","name":"EPSON L120","code":"","serial":"TP3K085120","user":""},{"number":"119","built":"183","name":"EPSON L120","code":"","serial":"TP3K3K08317","user":""},{"number":"120","built":"184","name":"EPSON L120","code":"","serial":"TP3K280946","user":""},{"number":"121","built":"187","name":"HP 1102 ","code":"","serial":"VNF4K4504","user":""},{"number":"122","built":"188","name":"HP LASERJET P1102","code":"","serial":"VNC4W03121","user":""},{"number":"123","built":"189","name":"EPSON L120","code":"","serial":"TP3K402311","user":""},{"number":"124","built":"190","name":"HP DESKJET 1000","code":"","serial":"CN33R1DGNV","user":""},{"number":"125","built":"191","name":"EPSON L220 ","code":"","serial":"VGWK077108","user":""},{"number":"126","built":"193","name":"GESTETNER MP C2530","code":"","serial":"V2135240001","user":""},{"number":"127","built":"194","name":"HP 1102 ","code":"","serial":"VNF4K62260","user":""},{"number":"128","built":"196","name":"EPSON L120","code":"","serial":"TP3K085140","user":""},{"number":"131","built":"200","name":"EPSON L120","code":"","serial":"TP3K304341","user":""},{"number":"132","built":"201","name":"HP 1102","code":"","serial":"VNF5C54090","user":""},{"number":"133","built":"202","name":"CANON PIXMA IP 2700","code":"","serial":"HRVW54139","user":""},{"number":"134","built":"203","name":"CANON IP2700 PIXMA","code":"","serial":"HRVW54139","user":""},{"number":"135","built":"204","name":"EPSON L565","code":"","serial":"VJLY064137","user":""},{"number":"136","built":"117","name":"LASERJET PRO M102A ","code":"2017-03-083-IT","serial":"VNC4L07015","user":"JOVIE ARQUION"},{"number":"137","built":"108","name":"HP LASERJET 1200","code":" ","serial":"SGDN004432","user":"ZALDY GUMAPAC"},{"number":"138","built":"119","name":"HP LASERJET PRO M102A","code":"2017-03-479-IT","serial":"VNC4L05478","user":"GLYNNA ANDOY"},{"number":"139","built":"9","name":"BROTHER DCP-T700W","code":" ","serial":"374708K7H19035","user":"Dr. Rodolfo Antonio Albornoz"},{"number":"140","built":"31","name":"Brother","code":" ","serial":"FB6GE0003951510","user":" "},{"number":"141","built":"31","name":"BROTHER DCP-J100 PRINTER","code":" ","serial":"E73184L4H405602","user":"  "},{"number":"142","built":"168","name":"EPSON L360 ","code":" ","serial":"VGFK036493","user":" "},{"number":"143","built":"208","name":"HP 3015","code":"2014-06-161-IT","serial":"VNF3500181","user":" "},{"number":"144","built":"210","name":"EPSON L120","code":"2017-05-121-IT","serial":"TP3K331325","user":"ERWIN PINGAL"},{"number":"145","built":"211","name":"CANON LBP 2900","code":"2012-03-221-IT","serial":"MGQA-352649","user":" "},{"number":"146","built":"212","name":"EPSON L120","code":"2017-11-272-IT","serial":"TP3K496358","user":" "},{"number":"147","built":"153","name":"EPSON 385","code":"2018-02-037-IT","serial":"X2QL002340","user":""},{"number":"148","built":"158","name":"EPSON L120","code":"2015-03-052-IT","serial":"SMXK222101","user":" "},{"number":"149","built":"155","name":"EPSON L120","code":"2013-04-231-IT","serial":"VGFK272511","user":" "},{"number":"150","built":"157","name":"EPSON L120","code":"2016-01-012-IT","serial":"TP3K166490","user":" "},{"number":"151","built":"157","name":"EPSON L3110","code":"2019-04-075-IT","serial":"X5DY143599","user":" "},{"number":"152","built":"156","name":"EPSON","code":"2018-04-230-IT","serial":"VGFK278451","user":" "},{"number":"153","built":"197","name":"EPSON L130","code":"2018-05-270-IT","serial":"VGFK394226","user":" "},{"number":"154","built":"199","name":"HP LASERJET 1102","code":"2016-11-485-IT","serial":"VNF8402547","user":" "},{"number":"155","built":"60","name":"HP LASERJET 1102","code":"2016-03-138-IT","serial":"VNF8Z37286","user":" "},{"number":"156","built":"215","name":"HP LASERJET 1102","code":"2015-08-193-IT","serial":"VNF8Q27481","user":""},{"number":"157","built":"216","name":"CANON G210","code":"2018-12-482-IT","serial":"QC5-6618-D01-01-01","user":""},{"number":"158","built":"218","name":"EPSON L120","code":"","serial":"TP3K150256","user":""}]

    var arrangeData = [], keys = [], temp;


    

    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);

        // ARRANGE DATE ACQUIRED
        var d = "";
        if (data[x].pm_dt_acq != "" && data[x].pm_dt_acq != undefined && data[x].hasOwnProperty("pm_dt_acq")) {
            d = (data[x].pm_dt_acq + " ").trim();
            if (d.length == 4) {
                d = "JAN " + d;
            }
            d = (d != "")?new Date(d):"";
        }

        temp = {
            // temp: data[x].pm_end_user,
            number: data[x].no || "",
            propertyCode: data[x].pm_prop_code || "",
            dateAcquired: (d == "Invalid Date")?"":d,
            userPAR:      data[x].pm_par || "",
            userCO:       data[x].pm_enduser || "",
            division:     data[x].pm_div || "",
            section:      data[x].pm_sec || "",
            unitType:     data[x].pm_unit_type || "",
            serial:       data[x].pm_sn || "",
            brand:        data[x].pm_brand || "",
            mac:         data[x].pm_mac_add || "",
            
            specs: {
                hWare: {
                    cpu:         data[x].pm_unit_specs || "",
                    motherBoord: data[x].pm_m_board || "",
                    processor:   data[x].pm_processor || "",
                    memoryCard:  data[x].pm_m_card || "",
                    hdd:         data[x].pm_hdd || "",    
                    monitor: {
                        brand:        data[x].pm_mon_brand || "",
                        size:         data[x].pm_mon_inch || "",
                        serial:       data[x].pm_mon_sn || "",
                        propertyCode: data[x].pm_mon_prop || "",
                        userPAR:      data[x].pm_mon_par || "",
                    },
                    avr: ((data[x].pm_avr)?avr.filter((avrX, i) => (avrX.number*1) == (data[x].pm_avr*1)):"")[0] || {},
                    ups: ((data[x].pm_ups)?ups.filter((upsX, i) => (upsX.number*1) == (data[x].pm_ups*1)):"")[0] || {},
                    scanner: ((data[x].pm_scanner)?scanner.filter((scannerX, i) => (scannerX.number*1) == (data[x].pm_scanner*1)):"")[0] || {},
                    printer: ((true)?printer.filter((printerX, i) => (printerX.built*1) == (data[x].no*1)):"")[0] || {},
                },
                sWare: {
                    os: {
                        name: data[x].pm_os || "",
                        isLicensed: (data[x].pm_os_lic == "YES")?1:0
                    },
                    msOffice: {
                        name: data[x].pm_ms_office || "",
                        isLicensed: (data[x].pm_ms_lic == "YES")?1:0
                    },
                    antiVirus: {
                        name: data[x].pm_av || "",
                        isLicensed: (data[x].pm_av_lic == "YES")?1:0
                    },
                },
            },
        };

        arrangeData.push(temp);

    }
    
    console.log(arrangeData);
    console.log(JSON.stringify(arrangeData));
    localStorage.setItem('doh-km-ict-records', JSON.stringify(arrangeData));
    // dispatch({
    //     type: SET_SHEET_DATA2,
    //     data: arrangeData,
    //     sheetName: sheetName,
    //     ind: i
    // });

 }

 //// FILE UPLOAD TYPE 2 
export const arrangeSheetDataAVR = (data, sheetName) => (dispatch, getState) => {
    var arrangeData = [], keys = [], temp;

    // dispatch({
    //     type: UPLOAD_STATUS_UPDATE2,
    //     msg: "Preparing Sheet #" + (i+1) + " (" + sheetName + ")"
    // });

    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);
        
        temp = {
            number:       data[x].no || "",
            brand:        data[x].avr_brand || "",
            serial:       data[x].avr_sn || "",
            propertyCode: data[x].avr_prop || "",
        };

        arrangeData.push(temp);

    }
    
    console.log(arrangeData);
    console.log(JSON.stringify(arrangeData));
    
 }
 
  //// FILE UPLOAD TYPE 2 
export const arrangeSheetDataUPS = (data, sheetName) => (dispatch, getState) => {
    var arrangeData = [], keys = [], temp;

    // dispatch({
    //     type: UPLOAD_STATUS_UPDATE2,
    //     msg: "Preparing Sheet #" + (i+1) + " (" + sheetName + ")"
    // });

    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);
        
        temp = {
            number:       data[x].no || "",
            brand:        data[x].ups_brand || "",
            serial:       data[x].ups_sn || "",
            propertyCode: data[x].ups_prop || "",
        };

        arrangeData.push(temp);

    }
    
    console.log(arrangeData);
    console.log(JSON.stringify(arrangeData));
    
 }

 export const arrangeSheetDataPrinter = (data, sheetName) => (dispatch, getState) => {
    var arrangeData = [], keys = [], temp;

    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);
        
        temp = {
            number: data[x].no || "",
            built:  data[x].built || "",
            name:   data[x].pri_name || "",
            code:   data[x].pro_code || "",
            serial: data[x].sn_no || "",
            user:   data[x].par_name || "",
        };

        arrangeData.push(temp);

    }
    
    console.log(arrangeData);
    console.log(JSON.stringify(arrangeData));
    
 }

 
 //// FILE UPLOAD TYPE 2 
export const arrangeSheetDataScanner = (data, sheetName) => (dispatch, getState) => {
    var arrangeData = [], keys = [], temp;

    // dispatch({
    //     type: UPLOAD_STATUS_UPDATE2,
    //     msg: "Preparing Sheet #" + (i+1) + " (" + sheetName + ")"
    // });

    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);
        
        temp = {
            number:       data[x].no || "",
            brand:        data[x].scan_brand || "",
            serial:       data[x].scan_sn || "",
            propertyCode: data[x].scan_prop || "",
        };

        arrangeData.push(temp);

    }
    
    console.log(arrangeData);
    console.log(JSON.stringify(arrangeData));
    
 }

 
 //// FILE UPLOAD TYPE 2 
export const arrangeSheetDataOffices = (data, sheetName) => (dispatch, getState) => {
    var arrangeData = [], keys = [], temp;
    
    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);
        
        temp = {
            division: data[x].division || "",
            designation:  data[x].designation || "",
            section:  data[x].section || "",
        };

        arrangeData.push(temp);

    }

    var filtered = [];

    for (let x = 0; x < arrangeData.length; x++) {
        
        let isExist = false;
        for (let y = 0; y < filtered.length; y++) {
            if (arrangeData[x].division.trim() == filtered[y].division.trim() && arrangeData[x].section.trim() == filtered[y].section.trim()) {
                isExist = true;
            }
        }
        if (!isExist) {
            filtered.push(arrangeData[x]);
        }

    }

    console.log(filtered);

    
    // var offices  = JSON.parse(localStorage.getItem('doh-offices'));
    // var offices2 = JSON.parse(localStorage.getItem('doh-offices2'));
    // console.log(offices);
    // console.log(offices2);
    localStorage.setItem('doh-offices2', JSON.stringify(filtered));
}

 //// FILE UPLOAD TYPE 2 
 export const arrangeSheetDataEmployees = (data, sheetName) => (dispatch, getState) => {
    var arrangeData = [], keys = [], temp;
    
    for (let x = 0, len = data.length; x < len; x ++) {
        keys = Object.keys(data[x]);
        
        temp = {
            no: data[x].no || "",
            name: {
                first: data[x].fname || "",
                mid: data[x].mname || "",
                last: data[x].lname || "",
            },
            designation: data[x].designation || "",
            division: data[x].division || "",
            section: data[x].section || "",
            status:  data[x].status || "",
        };

        arrangeData.push(temp);

    }

    var offices = [{"_id":{"$oid":"5ec23aafe783e810cc209a98"},"division":"MSD","section":"ACCOUNTING","code":"FINANCE","officeID":"DOH13O-2005-000"},{"_id":{"$oid":"5ec23aafe783e810cc209a99"},"division":"PDOHO","section":"AGUSAN DEL NORTE","code":"ADN","officeID":"DOH13O-2005-001"},{"_id":{"$oid":"5ec23aafe783e810cc209a9a"},"division":"PDOHO","section":"AGUSAN DEL SUR","code":"ADS","officeID":"DOH13O-2005-002"},{"_id":{"$oid":"5ec23aafe783e810cc209a9b"},"division":"RD/ARD","section":"ARD","code":"ARD","officeID":"DOH13O-2005-003"},{"_id":{"$oid":"5ec23aafe783e810cc209a9c"},"division":"MSD","section":"BAC","code":"BAC","officeID":"DOH13O-2005-004"},{"_id":{"$oid":"5ec23aafe783e810cc209a9d"},"division":"MSD","section":"BUDGET","code":"FINANCE","officeID":"DOH13O-2005-005"},{"_id":{"$oid":"5ec23aafe783e810cc209a9e"},"division":"MSD","section":"CASHIER","code":"CASHIER","officeID":"DOH13O-2005-006"},{"_id":{"$oid":"5ec23aafe783e810cc209a9f"},"division":"COA","section":"COA","code":"COA","officeID":"DOH13O-2005-007"},{"_id":{"$oid":"5ec23aafe783e810cc209aa0"},"division":"LHS","section":"FHC/MNCHN","code":"FHC","officeID":"DOH13O-2005-008"},{"_id":{"$oid":"5ec23aafe783e810cc209aa1"},"division":"MSD","section":"FINANCE","code":"FINANCE","officeID":"DOH13O-2005-009"},{"_id":{"$oid":"5ec23aafe783e810cc209aa2"},"division":"MSD","section":"GENERAL SERVICES","code":"SUPPLY","officeID":"DOH13O-2005-010"},{"_id":{"$oid":"5ec23aafe783e810cc209aa3"},"division":"MSD","section":"GENERAL SERVICES (PDOHO AGDS)","code":"SUPPLY","officeID":"DOH13O-2005-011"},{"_id":{"$oid":"5ec23aafe783e810cc209aa4"},"division":"MSD","section":"GENERAL SERVICES (PDOHO SGDS)","code":"SUPPLY","officeID":"DOH13O-2005-012"},{"_id":{"$oid":"5ec23aafe783e810cc209aa5"},"division":"LHS","section":"GOVERNANCE","code":"GOVERNANCE","officeID":"DOH13O-2005-013"},{"_id":{"$oid":"5ec23aafe783e810cc209aa6"},"division":"ARD","section":"HEMS","code":"HEMS","officeID":"DOH13O-2005-014"},{"_id":{"$oid":"5ec23aafe783e810cc209aa7"},"division":"RD/ARD","section":"HEMS","code":"HEMS","officeID":"DOH13O-2005-015"},{"_id":{"$oid":"5ec23aafe783e810cc209aa8"},"division":"ARD","section":"HEMS/RESU","code":"RESU","officeID":"DOH13O-2005-016"},{"_id":{"$oid":"5ec23aafe783e810cc209aa9"},"division":"MSD","section":"HEPO","code":"KM-HEPO","officeID":"DOH13O-2005-017"},{"_id":{"$oid":"5ec23aafe783e810cc209aaa"},"division":"RD/ARD","section":"HFEP","code":"HFEP","officeID":"DOH13O-2005-018"},{"_id":{"$oid":"5ec23aafe783e810cc209aab"},"division":"LHS","section":"HFEP","code":"HFEP","officeID":"DOH13O-2005-019"},{"_id":{"$oid":"5ec23aafe783e810cc209aac"},"division":"MSD","section":"HRDMU","code":"HRDU","officeID":"DOH13O-2005-020"},{"_id":{"$oid":"5ec23aafe783e810cc209aad"},"division":"MSD","section":"HRDMU/GAD","code":"HRDU","officeID":"DOH13O-2005-021"},{"_id":{"$oid":"5ec23aafe783e810cc209aae"},"division":"LHS","section":"INFECTIOUS","code":"INFECTIOUS","officeID":"DOH13O-2005-022"},{"_id":{"$oid":"5ec23aafe783e810cc209aaf"},"division":"LHS","section":"TB","code":"TB","officeID":"DOH13O-2005-023"},{"_id":{"$oid":"5ec23aafe783e810cc209ab0"},"division":"LHS","section":"INFECTIOUS/HIV","code":"HIV","officeID":"DOH13O-2005-024"},{"_id":{"$oid":"5ec23aafe783e810cc209ab1"},"division":"MSD","section":"KMICT","code":"KM-ICT","officeID":"DOH13O-2005-025"},{"_id":{"$oid":"5ec23aafe783e810cc209ab2"},"division":"LHS","section":"LHS CHIEF","code":"CHIEF","officeID":"DOH13O-2005-026"},{"_id":{"$oid":"5ec23aafe783e810cc209ab3"},"division":"MSD","section":"MSD CHIEF","code":"CAO","officeID":"DOH13O-2005-027"},{"_id":{"$oid":"5ec23aafe783e810cc209ab4"},"division":"LHS","section":"NON COM","code":"NON COMM","officeID":"DOH13O-2005-028"},{"_id":{"$oid":"5ec23aafe783e810cc209ab5"},"division":"LHS","section":"NUTRITION","code":"PHARMA","officeID":"DOH13O-2005-029"},{"_id":{"$oid":"5ec23aafe783e810cc209ab6"},"division":"LHS","section":"PHARMACEUTICAL","code":"PHARMA","officeID":"DOH13O-2005-030"},{"_id":{"$oid":"5ec23aafe783e810cc209ab7"},"division":"LHS","section":"PHARMACEUTICAL (SURIGAO DEL NORTE)","code":"PHARMA","officeID":"DOH13O-2005-031"},{"_id":{"$oid":"5ec23aafe783e810cc209ab8"},"division":"LHS","section":"PHARMACEUTICAL (SURIGAO DEL SUR)","code":"PHARMA","officeID":"DOH13O-2005-032"},{"_id":{"$oid":"5ec23aafe783e810cc209ab9"},"division":"ARD","section":"PLANNING","code":"PLANNING","officeID":"DOH13O-2005-033"},{"_id":{"$oid":"5ec23aafe783e810cc209aba"},"division":"MSD","section":"PROCUREMENT","code":"PROCUREMENT","officeID":"DOH13O-2005-034"},{"_id":{"$oid":"5ec23aafe783e810cc209abb"},"division":"PDOHO","section":"PROVINCE OF DINAGAT ISLAND","code":"PDI","officeID":"DOH13O-2005-035"},{"_id":{"$oid":"5ec23aafe783e810cc209abc"},"division":"RD/ARD","section":"RD","code":"RD","officeID":"DOH13O-2005-036"},{"_id":{"$oid":"5ec23aafe783e810cc209abd"},"division":"MSD","section":"RECORDS","code":"KM-RECORDS","officeID":"DOH13O-2005-037"},{"_id":{"$oid":"5ec23aafe783e810cc209abe"},"division":"ARD","section":"RESU","code":"RESU","officeID":"DOH13O-2005-038"},{"_id":{"$oid":"5ec23aafe783e810cc209abf"},"division":"RD/ARD","section":"RESU","code":"RESU","officeID":"DOH13O-2005-039"},{"_id":{"$oid":"5ec23aafe783e810cc209ac0"},"division":"ARD","section":"RESU/HEMS","code":"HEMS","officeID":"DOH13O-2005-040"},{"_id":{"$oid":"5ec23aafe783e810cc209ac1"},"division":"RLED","section":"RLED","code":"RLED","officeID":"DOH13O-2005-041"},{"_id":{"$oid":"5ec23aafe783e810cc209ac2"},"division":"LHS","section":"SDN","code":"SDN","officeID":"DOH13O-2005-042"},{"_id":{"$oid":"5ec23aafe783e810cc209ac3"},"division":"LHS","section":"SDN (HELP LINE)","code":"SDN","officeID":"DOH13O-2005-043"},{"_id":{"$oid":"5ec23aafe783e810cc209ac4"},"division":"LHS","section":"SECRETARIAT","code":"SECRETARIAT","officeID":"DOH13O-2005-044"},{"_id":{"$oid":"5ec23aafe783e810cc209ac5"},"division":"MSD","section":"SECRETARY CHIEF AO","code":"CAO","officeID":"DOH13O-2005-045"},{"_id":{"$oid":"5ec23aafe783e810cc209ac6"},"division":"ARD","section":"STATISTICS","code":"STATISTICS","officeID":"DOH13O-2005-046"},{"_id":{"$oid":"5ec23aafe783e810cc209ac7"},"division":"LHS","section":"STATISTICS","code":"STATISTICS","officeID":"DOH13O-2005-047"},{"_id":{"$oid":"5ec23aafe783e810cc209ac8"},"division":"MSD","section":"SUPPLY","code":"SUPPLY","officeID":"DOH13O-2005-048"},{"_id":{"$oid":"5ec23aafe783e810cc209ac9"},"division":"MSD","section":"SUPPLY (PDOHO AGDS)","code":"SUPPLY","officeID":"DOH13O-2005-049"},{"_id":{"$oid":"5ec23aafe783e810cc209aca"},"division":"MSD","section":"SUPPLY/WAREHOUSE","code":"SUPPLY","officeID":"DOH13O-2005-050"},{"_id":{"$oid":"5ec23aafe783e810cc209acb"},"division":"PDOHO","section":"SURIGAO DEL NORTE","code":"SDN","officeID":"DOH13O-2005-051"},{"_id":{"$oid":"5ec23aafe783e810cc209acc"},"division":"PDOHO","section":"SURIGAO DEL SUR","code":"SDS","officeID":"DOH13O-2005-052"},{"_id":{"$oid":"5ec23aafe783e810cc209acd"},"division":"MSD","section":"TRANSPORT","code":"SUPPLY","officeID":"DOH13O-2005-053"},{"_id":{"$oid":"5ec23aafe783e810cc209ace"},"division":"MSD","section":"TRANSPORT (PDOHO AGDN)","code":"SUPPLY","officeID":"DOH13O-2005-054"},{"_id":{"$oid":"5ec23aafe783e810cc209acf"},"division":"ACP","section":"TRC","code":"TRC","officeID":"DOH13O-2005-055"},{"_id":{"$oid":"5ec23aafe783e810cc209ad0"},"division":"LHS","section":"WAREHOUSE","code":"WAREHOUSE","officeID":"DOH13O-2005-056"},{"_id":{"$oid":"5ec23aafe783e810cc209ad1"},"division":"MSD","section":"WAREHOUSE","code":"WAREHOUSE","officeID":"DOH13O-2005-057"},{"_id":{"$oid":"5ec23aafe783e810cc209ad2"},"division":"RLED","section":"FDA","code":"FDA","officeID":"DOH13O-2005-058"},{"_id":{"$oid":"5ec23aafe783e810cc209ad3"},"division":"RD/ARD","section":"SDN","code":"ARD SDN","officeID":"DOH13O-2005-059"},{"_id":{"$oid":"5ec23aafe783e810cc209ad4"},"division":"RD/ARD","section":"HPR","code":"HPR","officeID":"DOH13O-2005-060"},{"_id":{"$oid":"5ec23aafe783e810cc209ad5"},"division":"MSD","section":"KM-LIBRARY","code":"KM-LIBRARY","officeID":"DOH13O-2005-061"}]

    console.log(offices);

    // for (let x = 0; x < arrangeData.length; x++) {

    //     for (let y = 0; y < offices.length; y++) {
    //         if (arrangeData[x].division == offices[y].division && (arrangeData[x].section == offices[y].section || arrangeData[x].section == offices[y].code)) {
    //             arrangeData[x] = {
    //                 ...arrangeData[x],
    //                 office: offices[y]._id.$oid
    //                 // office: {
    //                 //     ...offices[y]
    //                 // }
    //             }
    //             break;
    //         }
    //     }    

    // }

    console.log(JSON.stringify(arrangeData));
}



export const saveSheetToDB2 = (sheet, name, ind) => (dispatch, getState) => {
    axios({
        url: `${SERVER_API}/inventory/uploaddata2`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem(JWT)
        },
        data: {
            sheet: {...sheet},
            name: name,
        }
    })
        .then(result => {
            dispatch(
                updateSheetStatus2(ind, 3)
            );
        })
        .catch(err => {
            dispatch(
                updateSheetStatus2(ind, 4)
            );
        });
    
}

export const updateSheetStatus2 = (ind, status) => (dispatch, getState) => {
    var sheetStatus = [...getState().fileUpload.sheetStatus2]; 
    sheetStatus[ind] = status;

    dispatch({
        type: UPDATE_SHEET_STATUS2,
        sheetStatus: sheetStatus
    })
}

