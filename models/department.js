const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

const Department = mongoose.model("Department", departmentSchema);
Department.syncIndexes();

module.exports = Department;
