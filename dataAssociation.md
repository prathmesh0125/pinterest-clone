router.get("/createUser", async function (req, res) {
  const userdata = await userModel.create({
    username: "prathmesh ",
    password: "prathmesh",
    posts: [],
    email: "prat@gmail.com",
    fullname: "Prathmesh Bidve",
  });
  res.send(userdata);
});
router.get("/createPost", async function (req, res) {
  const created = await postModel.create({
    postText:"hello kaise ho",
    user:"6551d55fc9d21acbbdff16dd"
  });

  let user=await userModel.findOne({_id:"6551d55fc9d21acbbdff16dd"});
  user.posts.push(created._id);
  await user.save();
  res.send("done")
});

router.get("/alluser",async function(req,res){
  let alluserpost= await userModel.findOne
  ({_id:"6551d55fc9d21acbbdff16dd"}).populate('posts')
  res.send(alluserpost);
})
// router.get("/find", async function (req, res) {
//   let user = await userModel.find();
//   res.send(user);

// });