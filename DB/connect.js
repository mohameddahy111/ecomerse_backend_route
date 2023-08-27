import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("connect");
    })
    .catch((err) => console.log(err.message));
};

export default connect;
