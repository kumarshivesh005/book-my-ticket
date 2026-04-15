import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const registerUser=async(req,res)=>{
   try{
     const {name,email,password}=req.body;

    const hashPassword= await bcrypt.hash(password,10);

    // save in db
    const result=await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING * ",
        [name,email,hashPassword]
    );
    res.send({
        message:"user created successfully",
        user: result.rows[0],
    });
} 
catch(err){
  console.log(err)
if (err.code === "23505") {
      return res.send({ error: "Email already exists" });
    }
    res.send({ error: "Something went wrong" });
  }
};




export const loginUser=async(req,res)=>{
   try{
     const {email,password}=req.body;

    // save in db
    const result=await pool.query(
        "select * from users where email=$1 ",
        [email]
    );
    if(result.rowCount==0){
        return res.send({error:"user not found"});
    }


    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.send({ token });
  } catch (err) {
    res.send({ error: "Login failed" });
  }
};



