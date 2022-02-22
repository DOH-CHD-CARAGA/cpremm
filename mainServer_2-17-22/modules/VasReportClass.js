const HfPersonnel = require('../models/HfPersonnel');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class VasReportClass {

	constructor(data) {
		this.province = (data.province) ? data.province : '';
		this.facility = (data.facility) ? data.facility : '';
		this.hfPersonnelID = (data.hfPersonnelID) ? data.hfPersonnelID : '';
		this.category = (data.category) ? data.category : '';
		this.categoryID = (data.categoryID) ? data.categoryID : '';
		this.categoryIDNumber = (data.categoryIDNumber) ? data.categoryIDNumber : '';
		this.philHealthID = (data.philHealthID) ? data.philHealthID : '';
		this.pwdID = (data.pwdID) ? data.pwdID : '';
		this.name = (data.name) ? data.name : {
			first: "",
			mid: "",
			last: "",
			suffix: "",
		};
		this.contactNo = (data.contactNo) ? data.contactNo : '';
		this.address = (data.address) ? data.address : {
			fullAddress: "",
			region: "",
			province: "",
			munCity: "",
			barangay: "",
		};
		this.sex = (data.sex) ? data.sex : '';
		this.birthdate = (data.birthdate) ? data.birthdate : null;
		this.status = (data.status) ? data.status : '';
		this.employment = (data.employment) ? data.employment : {
			employed: "",
			profession: "",
			employerName: "",
			employerLGU: "",
			employerAddress: "",
			contactNo: "",
		};
		this.covidDetails = (data.covidDetails) ? data.covidDetails : {
			directCovid: "",
			covidHistory: "",
			covidDate: null,
			classification: "",
		};
		this.allergy = (data.allergy) ? data.allergy : {
			drug: "",
			food: "",
			insect: "",
			latex: "",
			mold: "",
			pet: "",
			pollen: "",
		};
		this.comorbidities = (data.comorbidities) ? data.comorbidities : {
			with: "",
			hypertension: "",
			heartDisease: "",
			kidneyDisease: "",
			diabetesMellitus: "",
			bronchialAsthma: "",
			immunodeficiencyStatus: "",
			cancer: "",
			others: "",
		};
		this.pregStatus = (data.pregStatus) ? data.pregStatus : '';
		this.consent = (data.consent) ? data.consent : '';

		this._id = (data._id) ? data._id : '';
	}

	update() {
		return new Promise((resolve, reject) => {
			HfPersonnel.findById(this._id, (err, hfPersonnel) => {
				hfPersonnel.province = this.province;
				hfPersonnel.facility = this.facility;
				hfPersonnel.hfPersonnelID = this.hfPersonnelID;
				hfPersonnel.category = this.category;
				hfPersonnel.categoryID = this.categoryID;
				hfPersonnel.categoryIDNumber = this.categoryIDNumber;
				hfPersonnel.philHealthID = this.philHealthID;
				hfPersonnel.pwdID = this.pwdID;
				hfPersonnel.name = this.name;
				hfPersonnel.contactNo = this.contactNo;
				hfPersonnel.address = this.address;
				hfPersonnel.sex = this.sex;
				hfPersonnel.birthdate = this.birthdate;
				hfPersonnel.status = this.status;
				hfPersonnel.employment = this.employment;
				hfPersonnel.covidDetails = this.covidDetails;
				hfPersonnel.allergy = this.allergy;
				hfPersonnel.comorbidities = this.comorbidities;
				hfPersonnel.pregStatus = this.pregStatus;
				hfPersonnel.consent = this.consent;

				hfPersonnel.save();
			})
				.then((data) => resolve({ status: true, data: data}))
				.catch(err => {
					reject({ status: false });
				});
		}); // end promise
	}

	static count(filter = {}) {
		return new Promise(resolve => {
			HfPersonnel
				.aggregate([
					{
						$match: {
							...filter
						}
					},
					{
						$count: "count"
					}
				])
				.then(count => {
					resolve((count.length > 0)?count[0].count:0)
				})
				.catch(err => {
					console.log(err);
				})
		})
	}

	static delete(id) {
		return new Promise(resolve => {
			HfPersonnel
				.deleteOne({_id: mongoose.Types.ObjectId(id)})
				.then(result => {
					resolve(result)
				})
		})
	}

	static get(page = 1, count = 10, filter = {}, sort = { 'hfPersonnelID': 1 }, select = []) {
		return new Promise((resolve, reject) => {
			HfPersonnel
				.find(filter)
				.sort(sort)
				.select(select)
				.skip((page * count) - count)
				.limit(count)
				.then(data => {
					resolve(data)
				}).
				catch(err => {
					reject({
						status: false,
						error: err
					})
				})
		})
	}

	static getHfPersonnelDetail(cond) {
		return new Promise(resolve => {
			HfPersonnel
				.find(cond)
				.then(data => {
					resolve(data)
				})
		})
	}

	static getDashboardNumbers(cond) {
		return new Promise(resolve => {
			HfPersonnel
				.aggregate([
					{
						$group: {
							_id: {
								province: "$province",
								facility: "$facility",
							},
							countAll: {
								$sum: 1
							},
						},
					}
				])
				.then(data => {
					resolve(data)
				})
		})
	}

	static getDashboardClassificationNumbers(cond, field, name) {
		return new Promise(resolve => {
			HfPersonnel
				.aggregate([
					{
						$match: {
							...cond
						}
					},
					{
						$group: {
							_id: {
								[(name) ? name : field]: "$" + field,
							},
							categories: {$addToSet: "$category"},
							countAll: {
								$sum: 1
							},
						},
					}
				])
				.then(data => {
					resolve(data)
				})
		})
	}

	static checkDuplicate(data) {
		return new Promise(resolve => {
			HfPersonnel
				.find({
					'name.first': data.name.first,
					'name.last': data.name.last,
					'name.mid': data.name.mid,
					'province': data.province,
					'facility': data.facility,
				})
				.then(data => {
					resolve(data)
				})
		})
	}

	static getDuplicates(page = 1, count = 10, filter = {}, sort = { 'name.last': 1 }, select = []) {
		return new Promise((resolve, reject) => {
			HfPersonnel
				.aggregate([
					{
						$match: {
							...filter,
						}
					},
					{
						$group : {
							_id: {
								first: "$name.first",
								mid: "$name.mid",
								last: "$name.last",
							},
							uniqueIds: {$addToSet: "$_id"},
							provinces: {$addToSet: "$province"},
							facilities: {$addToSet: "$facility"},
							contact: {$addToSet: "$contactNo"},
							count: {
								$sum: 1
							},
						}
					},
					{
						$match: {
							_id :{ "$ne" : null } , "count" : {"$gt": 1} 
						} 
					},
				])
				.sort(sort)
				.skip((page * count) - count)
				.limit(10000)
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					console.log(err);
					reject({
						status: false,
						error: err
					})
				})
		})
	}

	static getAnnexA(page = 1, count = 10, filter = {}, sort = { 'province': 1 }, select = []) {
		return new Promise((resolve, reject) => {
			HfPersonnel
				.aggregate([
					{
						$group : {
							_id: {
								province: "$province",
								facility: "$facility",
							},
							count: {
								$sum: 1
							},
						}
					},
					{
						$project: {
							_id: 1,
							count: 1,
							province: "$_id.province",
							facility: "$_id.facility",
						}
					}
				])
				.sort(sort)
				.skip((page * count) - count)
				.limit(10000)
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					console.log(err);
					reject({
						status: false,
						error: err
					})
				})
		})
	}

}

module.exports = VasReportClass;