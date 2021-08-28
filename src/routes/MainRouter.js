import { Route, Switch } from "react-router-dom";
import Home from "../../src/core/Home";
import SignUp from "../../src/user/SignUp";
import SignIn from "../../src/user/SignIn";
import Manu from "../core/Manu";
import ProfileScreen from "../user/ProfileScreen";
import UsersScreen from "../user/UsersScreen";
import EditScreen from "../user/EditScreen";
const MainRouter = () => (
  <div>
    <Manu></Manu>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/user/:userId" component={ProfileScreen}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/users" component={UsersScreen}></Route>
      <Route exact path="/user/edit/:userId" component={EditScreen}></Route>
    </Switch>
  </div>
);
export default MainRouter;
