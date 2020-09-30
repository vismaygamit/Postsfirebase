const jwt=require("jsonwebtoken");
console.log("inside met");
module.exports=(req,res,next)=>{

  try{
 const token=req.headers.authorization.split(" ")[1];

  console.log(`token${token}`);
  // jwt.verify(token,"secret_this_should_be_longer");
  const decodedToken=jwt.verify(token,"secret_this_should_be_longer");
  req.userData={email:decodedToken.email, userId:decodedToken.userId};
  next();
  console.log("email"+decodedToken.email+ "userid"+decodedToken.userId);
  }
  catch(error){
    res.status(401).json({
      message:"You are not authenticated!"

    });
    // console.log(error);
  }
// "Bearer fadkljfklas"
};
