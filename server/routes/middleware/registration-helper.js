// const PersonalInfo = require('../../models/PersonalInfo');
// const User = require('../../models/User');
// const CreditTransaction = require('../../models/CreditTransaction');
// const Branch = require('../../models/Branch');

function arrangeNumber (value, places) {
  var valLen = (value+"").length;
  if (valLen >= places)
    return value

  var zeros = "";

  while (valLen++ < places)
    zeros = zeros + "0";
  return zeros + (value + "");
}

// async function GetNewCustomerID (count = 1) { // JVVC-1901-0001
//   var ids = [];
//   await PersonalInfo
//     .find()
//     .select(["customerId"])
//     .limit(1)
//     .sort({customerId: -1})
//     .then(data => {
      
//       if (data.length > 0){
//         var prevID = data[0].customerId.split("-");
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1, num = 0;
//         date = (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]);

//         if (prevID[1] == date){
//           num = (prevID[2]*1)+1;
//         }
//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVC-" + date + "-" + (arrangeNumber(num + x, 5))
//           );
//         }
//       }else {
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1;

//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVC-" + (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]) + "-" + (arrangeNumber(x, 5))
//           );
//         }
//       }

//     })
//     .catch(err => {
//       return err;
//     })    
//   return ids;  
// }

// async function GetNewTransactionID (count = 1) { //JVVCA-0919-00000
//   var ids = [];
//   var temp;
//   await CreditTransaction
//     .find()
//     .select(["applicantNo"])
//     .limit(1)
//     .sort({applicantNo: -1})
//     .then(data => {
      
      
//       if (data.length > 0){
//         var prevID = data[0].applicantNo.split("-");
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1, num = 0;
//         date = (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]);

//         if (prevID[1] == date){
//           num = (prevID[2]*1)+1;
//         }
//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVCA-" + date + "-" + (arrangeNumber(num + x, 5))
//           );
//         }
//       }else {
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1;

//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVCA-" + (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]) + "-" + (arrangeNumber(x, 5))
//           );
//         }
//       }
//     })
//     .catch(err => {
//       return err;
//     });
    
//     return ids;
// }

// async function GetNewUserID (count = 1) { //JVVU-0919-00000
//   var ids = [];
//   var temp;
//   await User
//     .find()
//     .select(["userId"])
//     .limit(1)
//     .sort({userId: -1})
//     .then(data => {
      
//       if (data.length > 0){
//         var prevID = data[0].userId.split("-");
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1, num = 0;
//         date = (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]);

//         if (prevID[1] == date){
//           num = (prevID[2]*1)+1;
//         }
//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVU-" + date + "-" + (arrangeNumber(num + x, 5))
//           );
//         }
//       }else {
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1;

//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVU-" + (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]) + "-" + (arrangeNumber(x, 5))
//           );
//         }
//       }
//     })
//     .catch(err => {
//       return err;
//     });
    
//     return ids;
// }


// async function GetNewBranchID (count = 1) { //JVVB-0919-00000
//   var ids = [];
//   var temp;
//   await Branch
//     .find()
//     .select(["branchId"])
//     .limit(1)
//     .sort({branchId: -1})
//     .then(data => {
      
      
//       if (data.length > 0){
//         var prevID = data[0].branchId.split("-");
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1, num = 0;
//         date = (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]);

//         if (prevID[1] == date){
//           num = (prevID[2]*1)+1;
//         }
//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVB-" + date + "-" + (arrangeNumber(num + x, 5))
//           );
//         }
//       }else {
//         var date = new Date();
//         var y = date.getFullYear() + "", m = date.getMonth()+1;

//         for (var x = 0; x < count; x++) {
//           ids.push(
//             "JVVB-" + (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]) + "-" + (arrangeNumber(x, 5))
//           );
//         }
//       }
//     })
//     .catch(err => {
//       return err;
//     });
    
//     return ids;
// }

async function GetNewID (Collection, field, count = 1, digit, prefix, postfix = "", del = "-") {
  var ids = [];
  var temp;
  await Collection
    .find()
    .select([field])
    .limit(1)
    .sort({[field]: -1})
    .then(data => {
      
      if (data.length > 0 && data[0][field]){
        var prevID = data[0][field].split("-");
        var date = new Date();
        var y = date.getFullYear() + "", m = date.getMonth()+1, num = 0;
        date = (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]);

        if (prevID[1] == date){
          num = (prevID[2]*1)+1;
        }
        for (var x = 0; x < count; x++) {
          ids.push(
            prefix + del + date + del + (arrangeNumber(num + x, digit)) + ((postfix!= "")?del:"") + postfix
          );
        }
      }else {
        var date = new Date();
        var y = date.getFullYear() + "", m = date.getMonth()+1;

        for (var x = 0; x < count; x++) {
          ids.push(
            prefix + del + (arrangeNumber(m*1, 2)) + (y[2] + "" + y[3]) + del + (arrangeNumber(x, digit)) + ((postfix!= "")?del:"") + postfix
          );
        }
      }
    })
    .catch(err => {
      return err;
    });
    
    return ids;
}

module.exports = {
  // GetNewCustomerID,
  // GetNewTransactionID,
  // GetNewBranchID,
  // GetNewUserID,
  GetNewID,
}
