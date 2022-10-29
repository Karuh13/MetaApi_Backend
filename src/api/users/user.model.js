const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        email: {type: String, required:true, trim:true, unique: true},
        password:{type: String, trim: true},
        photo: {type: String, defaul:"https://pbs.twimg.com/profile_images/1473729155506319360/TjcpeV6k_400x400.jpg", trim:true},
        nickname: {type: String, required:true, trim:true},
        rol: {type: String, enum: ["admin", "user"], default: "user"},
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next){
    this.password =bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model("users", userSchema);

module.exports = User;